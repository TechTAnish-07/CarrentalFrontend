import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Cars.css";

const AvailableCars = () => {
  const { search } = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(search);
  const location = params.get("location");
  const start = params.get("start");
  const end = params.get("end");

  const [carData, setCars] = useState([]);

  const handleBook = (carId) => {
    navigate(`/book/${carId}?location=${location}&start=${start}&end=${end}`);
  };

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await fetch(
          `http://localhost:8080/api/cars/display/available?location=${location}&startDateTime=${start}&endDateTime=${end}`
        );

        const data = await response.json();
        console.log("Available Cars API:", data);

        setCars(data);
      } catch (error) {
        console.error("Error fetching available cars:", error);
      }
    }

    fetchCars();
  }, [location, start, end]);

  return (
    <div className="container">
      <h1>Available Cars in {location}</h1>

      {carData.length === 0 ? (
        <p>No cars available for the selected date/time.</p>
      ) : (
        carData.map((car) => (
          <div className="flip-card" key={car.carId || car.id}>
            <div className="flip-card-front">
              <img src={car.imageUrl} alt={car.model} />
              <h3>{car.brand} {car.model}</h3>
              <p>{car.modelYear}</p>
              <p>{car.pricePerDay} / day</p>

              <button onClick={() => handleBook(car.carId || car.id)}>
                Book Now
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AvailableCars;
