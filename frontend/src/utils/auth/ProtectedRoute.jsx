import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { supabase } from "../supabase.js";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  const Navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error || !data.session) {
        Navigate("/auth");
      } else {
        setSession(data.session);
      }
    };

    try {
      setLoading(true);
      checkSession();
    } catch (error) {
      console.alert("Unable to authenticate user.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [Navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-7xl font-bold text-center">
        Loading...
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
