import { createContext, useState } from "react";

export const AppContext = createContext();

export default function AppProvider({ children }) {
  const [showModal, setShowModal] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);

  const changeModalState = (state) => {
    setShowModal(state);
  };

  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  const addIncome = (income) => {
    setIncomes([...incomes, income]);
  };

  return (
    <AppContext.Provider
      value={{
        showModal,
        changeModalState,
        expenses,
        addExpense,
        incomes,
        addIncome,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
