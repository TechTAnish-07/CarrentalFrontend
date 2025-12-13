import React from "react";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Booking Successful!</h1>
      <p>Your booking has been confirmed.</p>

      <button onClick={() => navigate("/")}>
        Go to Home
      </button>
    </div>
  );
};

export default Success;
