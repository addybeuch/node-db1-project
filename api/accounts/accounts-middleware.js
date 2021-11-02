const Account = require("./accounts-model");
const db = require("../../data/db-config.js");

exports.checkAccountPayload = (req, res, next) => {
  const { name, budget } = req.body;
  if (name === undefined || budget === undefined) {
    res.status(400).json({ message: "name and budget are required" });
  } else if (typeof name !== "string") {
    res.status(400).json({ message: "name of account must be a string" });
  } else if (name.trim().length < 3 || name.trim().length > 100) {
    res
      .status(400)
      .json({ message: "name of account must be between 3 and 100" });
  } else if (typeof budget !== "number") {
    res.status(400).json({ message: "budget of account must be a number" });
  } else if (budget > 1000000 || budget < 0) {
    res
      .status(400)
      .json({ message: "budget of account is too large or too small" });
  } else {
    next();
  }
};

exports.checkAccountNameUnique = async (req, res, next) => {
  try {
    const name = req.body.name;
    const check = await db("accounts").where("name", name).first();
    if (check) {
      res.status(400).json({ message: "that name is taken" });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

exports.checkAccountId = async (req, res, next) => {
  const id = req.params.id;
  const check = await Account.getById(id);
  if (!check) {
    res.status(404).json({ message: "account not found" });
  } else {
    next();
  }
};
