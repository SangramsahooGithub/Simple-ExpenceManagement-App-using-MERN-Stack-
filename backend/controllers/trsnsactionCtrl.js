const transactionModel = require("../Models/transactionModel");
const moment = require("moment");

const addtrsnsaction = async (req, res) => {
  try {
    const newtransaction = new transactionModel(req.body);
    await newtransaction.save();
    res.status(201).send({
      success: true,
      message: "transaction added",
      newtransaction,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "error in transaction",
      success: false,
      error,
    });
  }
};

const getalltrsnsaction = async (req, res) => {
  try {
    const { filter } = req.body;
    const transactions = await transactionModel.find({
      date: {
        $gt: moment().subtract(Number(filter), "d").toDate(),
      },
      userid: req.body.userid,
    });

    res.status(200).send({
      success: true,
      message: "all trsnsaction get",
      transactions,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "error in transaction",
      success: false,
      error,
    });
  }
};

const deleteTransection = async (req, res) => {
  try {
    await transactionModel.findOneAndDelete({ _id: req.body.transacationId });
    res.status(200).send("Transaction Deleted!");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const editTransection = async (req, res) => {
  try {
    await transactionModel.findOneAndUpdate(
      { _id: req.body.transacationId },
      req.body.payload
    );
    res.status(200).send("Edit SUccessfully");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  getalltrsnsaction,
  addtrsnsaction,
  deleteTransection,
  editTransection,
};
