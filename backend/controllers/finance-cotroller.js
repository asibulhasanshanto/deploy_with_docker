const _ = require("lodash");
const catchAsync = require("../utils/catch-async");
const AppError = require("../utils/app-error");
const financeService = require("../services/finance-service");
const { validateFinance } = require("../models/finance-model");

const getAllFinances = catchAsync(async (req, res, next) => {
  const finances = await financeService.getAllFinances(req.user._id);
  res.status(200).json(finances);
});

const deleteFinance = catchAsync(async (req, res, next) => {
  const deletedFinance = await financeService.deleteFinance(
    req.params.id,
    req.user._id
  );
  if (!deletedFinance)
    return next(new AppError("No finance found with this id.", 404));
  res.status(200).json(deletedFinance);
});

const createNewFinance = catchAsync(async (req, res, next) => {
  const { error } = validateFinance(req.body);
  if (error) return next(new AppError(error.details[0].message, 400));
  const payload = _.pick(req.body, ["title", "amount", "type"]);
  payload.user = req.user._id;
  console.log(payload);
  const newFinance = await financeService.createNewFinance(payload);
  res.status(201).json(newFinance);
});

module.exports = {
  getAllFinances,
  deleteFinance,
  createNewFinance,
};
