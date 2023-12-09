import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = data;

  const changeText = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:5000/api/login", data);
    if (res.data.success) {
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/");
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
          <div className="col-lg-4 col-sm-12  p-5 rounded-2 shadow-lg logincontainer   ">
            <h4 clasName="mb-5" style={{ textAlign: "center" }}>
              <small> Login Form</small>
            </h4>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter Your Email ......."
                  name="email"
                  value={email}
                  onChange={changeText}
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter Your Password ......."
                  name="password"
                  value={password}
                  onChange={changeText}
                />
              </div>
              <small>
                {" "}
                <Link to={"/register"}>
                  <small>Not a User!Register</small>
                </Link>
              </small>
              <input
                type="submit"
                value="Login"
                className="btn btn-sm  ms-5 shadow-lg"
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
