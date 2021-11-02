exports.checkAccountPayload = (req, res, next) => {
  const { name, budget } = req.body;
  if (!name || !budget) {
    res.status(400).json({ message: "name and budget are required" });
  } else if (name.trim().length > 3 && name.length < 100) {
    res.status().json({ message: "name of account must be between 3 and 100" });
  } else if (typeof name !== "number") {
    res.status().json({ message: "budget of account must be a number" });
  } else if (budget > 1000000 || budget < 0) {
    res
      .status()
      .json({ message: "budget of account is too large or too small" });
  } else {
    next();
  }
};

exports.checkAccountNameUnique = (req, res, next) => {
  const name = req.params.name;
  if (name) {
    res.status(400).json({ message: "that name is taken" });
  } else {
    next();
  }
};

exports.checkAccountId = (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).json({ message: "account not found" });
  } else {
    next();
  }
};
