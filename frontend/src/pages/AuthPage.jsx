import React from "react";
import Login from "../components/auth-page/Login";
import Register from "../components/auth-page/Register";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router";

const AuthPage = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col gap-4 items-center justify-center">
        <div className="tabs tabs-lift w-1/3 ">
          <input
            type="radio"
            name="auth_tabs"
            className="tab"
            aria-label="Log in"
            defaultChecked
          />
          <div className="tab-content bg-base-100 border-base-300 p-6">
            <Login />
          </div>

          <input
            type="radio"
            name="auth_tabs"
            className="tab"
            aria-label="Register"
          />
          <div className="tab-content bg-base-100 border-base-300 p-6">
            <Register />
          </div>
        </div>
        <div>
          <Link to="/">
            <p className="text-sm font-medium hover:underline flex items-center">
              <span>
                <ChevronLeft />
              </span>
              <span>Go Back</span>
            </p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default AuthPage;
