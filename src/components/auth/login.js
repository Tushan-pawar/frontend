import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const [param] = useSearchParams();

  const doLogin = () => {
    let token = window.btoa(username + ":" + password);
    axios
      .post(
        "http://localhost:8086/user/login",
        {},
        {
          headers: {
            Authorization: "Basic " + token,
          },
        }
      )
      .then(function (response) {
        localStorage.setItem("username", username);
        localStorage.setItem("token", token);
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("isLoggedIn", true);
        let role = response.data.role;

        switch (role) {
          case "ADMINISTRATOR":
            navigate("/Administrator/dashboard?page=notices");
            break;
          case "RESIDENT":
            navigate("/Resident/dashboard?page=notices");
            break;
          case "GATEKEEPER":
            navigate("/Gatekeeper/dashboard?page=notices");
            break;
          default:
        }
        console.log(response.data);
      })
      .catch(function()  {
        setMsg("Invalid Credentials");
      });
  };

  return (
    <div>
      <section className="vh-100">
        <h1
          style={{
            textAlign: "left",
            fontWeight: "bold",
            color: "blue",
            fontFamily: "cursive",
          }}
        >
          Society Management System
        </h1>

        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="img-fluid"
                alt="Sample image"
              />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form>
                <div className="divider d-flex align-items-center my-4"></div>
                <h1
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    color: "blue",
                    fontFamily: "cursive",
                  }}
                >
                  Login
                </h1>
                {msg && (
                  <div className="text-center text-danger mt-2">
                    <p>{msg}</p>
                  </div>
                )}
                <div className="form-outline mb-4">
                  <input
                    type="email"
                    id="form3Example3"
                    className="form-control form-control-lg"
                    placeholder="Enter Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <label className="form-label" htmlFor="form3Example3">
                    Username
                  </label>
                </div>

                <div className="form-outline mb-3">
                  <input
                    type="password"
                    id="form3Example4"
                    className="form-control form-control-lg"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label className="form-label" htmlFor="form3Example4">
                    Password
                  </label>
                </div>

                <div className="text-center text-lg-start mt-4 pt-2">
                  <button
                    type="button"
                    className="btn btn-primary btn-lg"
                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                    onClick={doLogin}
                  >
                    Login
                  </button>
                </div>
              </form>
              <div style={{ textAlign: "left" }} className="mt-4">
                <span>
                  Don't have an Account?
                  <button
                    className="button_link"
                    onClick={() => navigate("/auth/signup")}
                  >
                    Sign Up
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
