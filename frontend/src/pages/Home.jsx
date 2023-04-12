import React, { useState, useContext, useEffect } from "react";
import Layout from "../components/layouts/Layout";
import BudgetModal from "../components/modal/BudgetModal";
import { AppContext } from "../context/AppContext";
import { useAccount } from "../context/AccountContext";
import { CirclesWithBar } from "react-loader-spinner";
import { toast } from "react-toastify";

const Expense = ({ title, amount, deleteEvent }) => {
  return (
    <div className=" flex justify-between items-center ">
      <div className="flex justify-start items-center gap-4">
        <p className="text-2xl font-bold text-red-600">-</p>
        <p className="text-xl text-gray-300">{title}</p>
        <p className="text-xl text-gray-100 font-semibold">{`$ ${amount}`}</p>
      </div>
      <div
        onClick={deleteEvent}
        className="delete ml-1 text-red-600 transition-all duration-300 cursor-pointer rounded-md hover:bg-gray-950 p-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
      </div>
    </div>
  );
};

const Income = ({ title, amount, deleteEvent }) => {
  return (
    <div className=" flex  justify-between items-center ">
      <div className="flex justify-start items-center gap-4">
        <p className="text-2xl font-bold text-green-600">+</p>
        <p className="text-xl text-gray-300">{title}</p>
        <p className="text-xl text-gray-100 font-semibold">{`$ ${amount}`}</p>
      </div>
      <div
        onClick={deleteEvent}
        className="delete ml-1 text-red-600 transition-all duration-300 cursor-pointer rounded-md hover:bg-gray-950 p-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
      </div>
    </div>
  );
};

const Home = () => {
  const { showModal, changeModalState } = useContext(AppContext);
  const [type, setType] = useState("");
  const [balance, setBalance] = useState(0);
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const account = useAccount();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // get all finance from localhost:5000/api/v1/finances
    fetchFinances();
  }, [account.account]);

  const fetchFinances = async () => {
    // console.log();
    setIsLoading(true);
    try {
      const finances = await fetch(
        `${import.meta.env.VITE_BACKEND_ENDPOINT}/api/v1/finances`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${account.account}`,
          },
        }
      );
      const data = await finances.json();
      // console.log(account.account);
      console.log(data);
      if (data.status != "error") {
        const expenses = data.filter((finance) => finance.type === "expense");
        const incomes = data.filter((finance) => finance.type === "income");
        setExpenses(expenses);
        setIncomes(incomes);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }

    setIsLoading(false);
  };

  useEffect(() => {
    // calculate current balance based on expenses and incomes
    const totalExpenses = expenses.reduce(
      (acc, expense) => Number(acc) + Number(expense.amount),
      0
    );
    const totalIncomes = incomes.reduce(
      (acc, income) => Number(acc) + Number(income.amount),
      0
    );
    // console.log({ totalIncomes, totalExpenses });

    setBalance(totalIncomes - totalExpenses);
  }, [expenses, incomes]);

  const handleAddExpense = () => {
    changeModalState(true);
    setType("expense");
  };

  const handleAddIncome = () => {
    changeModalState(true);
    setType("income");
  };

  const handleSubmit = async (title, amount) => {
    try {
      setIsLoading(true);
      const responseIncome = await fetch(
        `${import.meta.env.VITE_BACKEND_ENDPOINT}/api/v1/finances`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${account.account}`,
          },
          body: JSON.stringify({ title, amount, type }),
        }
      );
      setIsLoading(false);
      const data = await responseIncome.json();

      if (data) {
        toast.success("Successfully added");
        await fetchFinances();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong, please try again");
      setIsLoading(false);
    }

    changeModalState(false);
  };

  const onItemDelete = async (id) => {
    try {
      setIsLoading(true);
      const responseIncome = await fetch(
        `${import.meta.env.VITE_BACKEND_ENDPOINT}/api/v1/finances/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${account.account}`,
          },
        }
      );
      setIsLoading(false);
      const data = await responseIncome.json();

      if (data) {
        toast.success("Successfully deleted");
        await fetchFinances();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong, please try again");
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="bg-white py-16 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {new Date().toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              This is a sample of a monthly budget. You can use this to track
              your expenses and income.
            </p>
          </div>
          <div className="mx-auto mt-8 md:w-1/2">
            {/* Map all expresess and income */}
            <div className="flex flex-col items-center">
              {isLoading && (
                <div className="loader mb-5">
                  <CirclesWithBar
                    height="100"
                    width="100"
                    color="#1f2937"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    outerCircleColor=""
                    innerCircleColor=""
                    barColor=""
                    ariaLabel="circles-with-bar-loading"
                  />
                </div>
              )}
              <div className="flex w-full  flex-col gap-8 md:flex-row md:gap-0 justify-between items-start bg-gray-800 p-4 rounded-lg">
                <div>
                  <p className="text-2xl text-gray-100 font-bold mb-4">
                    Expenses
                  </p>
                  <div className="max-h-48 md:max-h-96 overflow-y-scroll scrollbar-hide">
                    {expenses?.map((expense, i) => (
                      <Expense
                        key={i}
                        id={expense._id}
                        title={expense.title}
                        amount={expense.amount}
                        deleteEvent={() => onItemDelete(expense._id)}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-2xl text-gray-100 mb-4  font-bold">
                    Incomes
                  </p>
                  <div className=" max-h-48 md:max-h-96 overflow-y-scroll scrollbar-hide">
                    {incomes?.map((income, i) => (
                      <Income
                        key={i}
                        id={income._id}
                        title={income.title}
                        amount={income.amount}
                        deleteEvent={() => onItemDelete(income._id)}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-2 items-center mt-10">
                <button
                  className="w-7 h-7 bg-red-600 rounded-full text-white flex justify-center items-center"
                  onClick={handleAddExpense}
                >
                  -
                </button>
                <p className="text-2xl font-semibold text-gray-800">
                  Balance: $ {balance}
                </p>
                <button
                  className="w-7 h-7 bg-green-600 rounded-full text-white flex justify-center items-center"
                  onClick={handleAddIncome}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BudgetModal
        modalTitle={type === "expense" ? "Add Expense" : "Add Income"}
        show={showModal}
        handleOnCancel={() => changeModalState(false)}
        handleOnSubmit={handleSubmit}
      />
    </Layout>
  );
};

export default Home;
