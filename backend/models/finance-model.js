const Joi = require("joi");
const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const financeSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: ["expense", "income"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const validateFinance = (finance) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    amount: Joi.number().required(),
    type: Joi.string().required(),
  });

  return schema.validate(finance);
};

module.exports = {
  Finance: model("Finance", financeSchema),
  validateFinance,
};
