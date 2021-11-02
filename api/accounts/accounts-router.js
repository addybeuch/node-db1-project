const {
  checkAccountPayload,
  // checkAccountNameUnique,
  checkAccountId,
} = require("./accounts-middleware");

const router = require("express").Router();
const Account = require("./accounts-model");

router.get("/", async (req, res, next) => {
  try {
    const data = await Account.getAll();
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", checkAccountId, (req, res, next) => {
  try {
    const data = Account.getById(req.params.id);
    res.json(data);
  } catch (err) {
    next();
  }
});

router.post("/", checkAccountPayload, (req, res, next) => {
  // try {
  //   const newAccount = Account.create(req.body);
  //   res.status(201).json(newAccount);
  // } catch (err) {
  //   next();
  // }
  Account.create(req.body)
    .then((account) => {
      res.status(200).json(account);
    })
    .catch(next);
});

router.put("/:id", checkAccountPayload, (req, res, next) => {
  try {
    const data = Account.updateById(req.params.id, req.body);
    res.json(data);
  } catch (err) {
    next();
  }
});

router.delete("/:id", checkAccountId, (req, res, next) => {
  try {
    const data = Account.deleteById(req.params.id);
    res.json(data);
  } catch (err) {
    next();
  }
});

router.use((err, req, res) => {
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;
