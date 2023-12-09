import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import axios from "axios";

const Register = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = data;

  const changeText = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.post("http://localhost:5000/api/register", data);

    if (res.data.success) {
      navigate("/login");
    } else {
    }
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <div className="container-fluid ">
        <div className="row regitserrow align-items-center justify-content-center rounded-2  ">
          <div className="col-lg-4 col-sm-12  p-5 rounded-1 shadow-lg logincontainer ">
            <h4 clasName="mb-5" style={{ textAlign: "center" }}>
              <small>Register Form</small>
            </h4>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Please Enter Your Name ......"
                  name="name"
                  value={name}
                  onChange={changeText}
                  required
                />
              </div>

              <div className="mb-4">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Please Enter Your Email ......"
                  name="email"
                  value={email}
                  autoComplete="off"
                  onChange={changeText}
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Please Enter Your Password ......."
                  name="password"
                  value={password}
                  onChange={changeText}
                  required
                />
              </div>
              <small>
                {" "}
                <Link to={"/login"}>
                  <small>Alredy a User! Go to Login</small>
                </Link>
              </small>
              <input
                type="submit"
                value="Register"
                className="btn btn-sm shadow-lg ms-3 "
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
