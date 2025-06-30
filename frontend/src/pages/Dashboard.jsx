import React, { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import { useNavigate } from "react-router";
import Form from "../components/dashboard/Form";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();

  const handleLogout = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.alert("Unable to logout.");
        console.log(error);
      }
      Navigate("/");
    } catch (error) {
      console.alert("Unable to logout.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div>
          <Form />
        </div>
        <button
          className="absolute right-24 top-3 btn btn-error"
          onClick={handleLogout}
          disabled={loading}
        >
          {loading ? "Logging out..." : "Logout"}
        </button>
      </div>
    </>
  );
};

export default Dashboard;
