import React, { useState } from "react";
import { supabase } from "../../utils/supabase.js";
import { useNavigate } from "react-router";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const Navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault;

    try {
      setLoading(true);
      const { data } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          emailRedirectTo: "https://localhost:5173/",
        },
      });
      Navigate("/dashboard");
    } catch (error) {
      console.log("Error registering new user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">Register</h2>
        </div>
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="text"
              placeholder="johndoe@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input w-full"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input w-full"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="confirm-password">Confirm Passwod</label>
            <input
              id="confirm-password"
              type="password"
              placeholder="********"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input w-full"
            />
          </div>
        </div>
        <div>
          <button
            className="btn btn-primary w-full"
            disabled={loading}
            onClick={handleSignUp}
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Register;
