const middle = require("./accounts-middleware");

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

router.get("/:id", middle.checkAccountId, async (req, res, next) => {
  try {
    const data = await Account.getById(req.params.id);
    res.json(data);
  } catch (err) {
    next();
  }
});

router.post(
  "/",
  middle.checkAccountPayload,
  middle.checkAccountNameUnique,
  (req, res, next) => {
    Account.create({ name: req.body.name.trim(), budget: req.body.budget })
      .then((account) => {
        res.status(201).json(account);
      })
      .catch((err) => {
        next(err);
      });
  }
);

router.put(
  "/:id",
  middle.checkAccountPayload,
  middle.checkAccountId,
  async (req, res, next) => {
    try {
      const data = await Account.updateById(req.params.id, req.body);
      res.json(data);
    } catch (err) {
      next();
    }
  }
);

router.delete("/:id", middle.checkAccountId, (req, res, next) => {
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
