const { Finance } = require("../models/finance-model");

const getAllFinances = (userId) => {
  // get all finance of a user
  const filter = { user: userId };
  const finances = Finance.find(filter);
  return finances;
};

const deleteFinance = (financeId,userId) => {
  // delete a finance
  const filter = { _id: financeId, user: userId };

  const deletedFinance = Finance.findOneAndDelete(filter);
  return deletedFinance;
};

const createNewFinance = (payload) => {
  // create a new finance
  const finance = new Finance(payload);
  return finance.save();
};

module.exports = {
  getAllFinances,
  deleteFinance,
  createNewFinance,
};
