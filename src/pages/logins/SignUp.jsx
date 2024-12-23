import React, { useState } from "react";
import "./Login.css";
import { supabase } from "../../config/supabaseClient";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function signUpUser() {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      // Handle the result here
      if (error) {
        console.error("Sign up error:", error.message);
        toast.error("Sign up error:", error.message);
      } else {
        toast.success("Sign up successful");
        navigate("/");
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      toast.error("An unexpected error occurred:");
    } finally {
      setLoading(false);
      setEmail("");
      setPassword("");
    }
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    signUpUser();
  };

  return (
    <div className=" d-flex justify-content-center align-items-center vh-100 container-fluid bg-gray bg ">
      <div className="col-md-7 text-center shadow-lg rounded-top border-4 p-3 bg-white border-top border-bottom border-secondary  m-1">
        <form className="p-5">
          <div className="mb-3 ">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={email}
              onChange={handleEmailChange}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>

          <a
            href="/home"
            type="submit"
            className="btn btn-success ps-5 pe-5 me-3 d-inline "
            onClick={handleRegister}
          >
            {loading ? "Loading..." : "Sign Up"}
          </a>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
