import React, { useState, useEffect } from "react";
import Layout from "../component/Layout/Layout";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import DataTables from "../component/Layout/DataTables";
const Home = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    amount: "",
    category: "",
    refrence: "",
    date: "",
    ftype: "",
  });
  const { amount, category, refrence, date, type } = data;

  const [transaction, settransaction] = useState([]);
  const [filter, setfilter] = useState("7");

  const changeText = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  // for get the transaction data
  const getalltrsnsaction = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const res = await axios.post("http://localhost:5000/api/gettransaction", {
      userid: user._id,
      filter,
      type,
    });

    settransaction(res.data.transactions);
    // window.location.reload();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    await axios.post("http://localhost:5000/api/addtransaction", {
      ...data,
      userid: user._id,
    });
    window.location.reload();
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    getalltrsnsaction();
  }, [filter]);

  return (
    <>
      <Layout>
        <div className="container">
          <div className="row pt-4">
            <div className="d-flex gap-5">
              <div>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  value={filter}
                  onChange={(e) => setfilter(e.target.value)}
                >
                  <option value="7">
                    <small>Last 1 Week</small>
                  </option>
                  <option value="30">
                    <small>Last 1 Month</small>
                  </option>
                  <option value="365">
                    <small>Last 1 year</small>
                  </option>
                  <option value="36525">
                    <small>Above 1 year</small>
                  </option>
                </select>
              </div>

              <div>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-dark"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Add New
                </button>
              </div>
            </div>
          </div>
        </div>

        <DataTables transaction={transaction} />

        <div>
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex={-1}
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            {/* for modal */}
            <div className="modal-dialog ">
              <div className="modal-content ">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    Add Your New Task
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  />
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <input
                        type="number"
                        className="form-control"
                        placeholder=" Enter your amount ......"
                        name="amount"
                        value={amount}
                        onChange={changeText}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder=" Enter your category ......"
                        name="category"
                        value={category}
                        autoComplete="off"
                        onChange={changeText}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder=" Enter your refrence ......."
                        name="refrence"
                        value={refrence}
                        onChange={changeText}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="date"
                        className="form-control"
                        placeholder=" Enter the date ......."
                        name="date"
                        value={date}
                        onChange={changeText}
                        required
                      />
                    </div>
                    <input
                      type="submit"
                      value="Save"
                      className="btn btn-sm btn-outline-dark ms-3 "
                    />
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Home;
