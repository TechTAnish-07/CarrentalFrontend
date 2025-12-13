import React, { useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";

const BookNow = () => {
  const { id } = useParams(); 
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const location = searchParams.get("location");
  const start = searchParams.get("start");
  const end = searchParams.get("end");

  const [loading, setLoading] = useState(false);

  const handleConfirmBooking = async () => {
    setLoading(true);

    const bookingRequest = {
      carId: id,
     
      startDateTime: start,
      endDateTime: end,
       userId:1, 
    //   customerPhone: "9999999999"
    };

    try {
      const response = await fetch("http://localhost:8080/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingRequest),
      });

      const data = await response.json();
      console.log("Booking Created:", data);

      alert("Booking successful!");

      navigate("/booking/success");
    } catch (error) {
      alert("Error creating booking");
    }

    setLoading(false);
  };

  return (
    <div>
      <h1>Complete Your Booking</h1>

      <p>Car ID: {id}</p>
      <p>Location: {location}</p>
      <p>Start: {start}</p>
      <p>End: {end}</p>

      <button onClick={handleConfirmBooking} disabled={loading}>
        {loading ? "Booking..." : "Confirm Booking"}
      </button>
    </div>
  );
};

export default BookNow;
