import React, { useState } from "react";
import { useNavigate } from "react-router";
import { supabase } from "../../utils/supabase.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const Navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setLoading(true);
      const { data } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (data.error) {
        console.alert("Invalid username or password");
        console.log(data.error);
      }

      Navigate("/dashboard");
    } catch (error) {
      console.alert("Unable to login");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">Log In</h2>
        </div>
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="johndoe@example.com"
              className="input w-full"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className="input w-full"
            />
          </div>
        </div>
        <div>
          <button
            className="btn btn-primary w-full"
            disabled={loading}
            onClick={handleLogin}
          >
            {loading ? "Entering..." : "Enter"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
