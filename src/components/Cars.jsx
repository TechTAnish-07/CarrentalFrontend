import React, { useEffect, useState } from 'react';
import './Cars.css';
import Reviews from './Reviews';
import { useNavigate } from 'react-router-dom';

function Cars() {
  const [searchTerm, setSearchTerm] = useState('');
  const [flips, setFlips] = useState({});
  const [carData, setCarData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8080/api/cars/display')
      .then(response => response.json())
      .then(data => {
        console.log("API Response:", data);
        setCarData(data);
      })
      .catch(error => console.error('Error fetching car data:', error));
  }, []);

  const handleSearchBar = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const toggleFlip = (id) => {
    setFlips(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredCars = carData.filter(car =>
    (car.brand + " " + car.model).toLowerCase().includes(searchTerm)
  );

  const handleCardClick = (id) => {
    navigate(`/cars/${id}`);
  };

  return (
    <>
      <div className="search-container">
        <input
          className="search-input"
          type="text"
          placeholder="Search for cars..."
          onChange={handleSearchBar}
          value={searchTerm}
        />
      </div>

      <h1 id="title">Ready. Set. Rent. 🚘</h1>

      <div className="container">
        {filteredCars.length > 0 ? (
          filteredCars.map((car) => (
            <div className="flip-card" key={car.carId}>
              <div className={`flip-card-inner ${flips[car.carId] ? 'flipped' : ''}`}>

                {/* FRONT SIDE */}
                <div className="flip-card-front">
                  <div className="card-image" onClick={() => handleCardClick(car.carId)}>
                    <img src={car.imageUrl} alt={car.model} />
                    <div className="image-overlay">
                      <span>Click to view details</span>
                    </div>
                  </div>

                  <div className="card-body">
                    <h2 className="card-title">
                      {car.brand} {car.model}
                    </h2>

                    <div className="card-description">
                      <strong>Model Year:</strong> {car.modelYear} <br />
                      <strong>Fuel Type:</strong> {car.fuelType || "N/A"} <br />
                      <strong>Seats:</strong> {car.seats} <br />
                      <strong>Price/Day:</strong> ₹{car.pricePerDay} <br />
                      <strong>Status:</strong> {car.status} <br />
                      <button onClick={() => toggleFlip(car.carId)}>Show Reviews</button>
                    </div>
                  </div>
                </div>

                {/* BACK SIDE */}
                <div className="flip-card-back">
                  <div className="card-body">
                    <h2>{car.brand} {car.model} - Reviews</h2>

                    <Reviews reviews={car.reviews || []} />

                    <button onClick={() => toggleFlip(car.carId)}>Back to Details</button>
                  </div>
                </div>

              </div>
            </div>
          ))
        ) : (
          <p className="no-results">No cars found.</p>
        )}
      </div>
    </>
  );
}

export default Cars;
