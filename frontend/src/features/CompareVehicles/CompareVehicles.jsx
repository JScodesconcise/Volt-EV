import React, { useState, useEffect } from "react";
import "./CompareVehicles.css";
import Navbar from "../Layout/Navbar";
import rangeLogo from "../../Media/zap.svg";
import accelerationLogo from "../../Media/car-front.svg";
import drivetrainLogo from "../../Media/gauge.svg";
import cartLogo from "../../Media/cart-vehicle-card.svg";
import evBlackImage from "../../Media/EV black view.png";
import evOliveImage from "../../Media/EV Olive View.png";

// Default fallback images
const defaultImages = {
  black: evBlackImage,
  olive: evOliveImage
};

function CompareVehicles() {
  const [vehiclesToCompare, setVehiclesToCompare] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchVehiclesForComparison();
  }, []);

  const fetchVehiclesForComparison = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Get URL parameters for specific vehicle comparison
      const urlParams = new URLSearchParams(window.location.search);
      const vehicle1Id = urlParams.get('vehicle1Id');
      const vehicle2Id = urlParams.get('vehicle2Id');
      
      let url = 'http://localhost:8080/vehicle/compare';
      
      if (vehicle1Id && vehicle2Id) {
        url += `?vehicle1Id=${vehicle1Id}&vehicle2Id=${vehicle2Id}`;
      }
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const vehicles = await response.json();
      
      // Transform the data to match frontend expectations
      const transformedVehicles = vehicles.map(vehicle => ({
        id: vehicle.id,
        model: vehicle.colour ? `Model ${vehicle.colour.charAt(0).toUpperCase() + vehicle.colour.slice(1)}` : 'Model R',
        year: vehicle.year,
        price: vehicle.price,
        imageUrl: vehicle.image || defaultImages.black,
        maxRange: vehicle.range,
        horsepower: vehicle.horsepower,
        acceleration: vehicle.acceleration,
        batteryCapacity: vehicle.battery,
        chargingPower: vehicle.charging,
        efficiency: vehicle.efficiency,
        driveType: vehicle.drivetrain || 'AWD'
      }));
      
      setVehiclesToCompare(transformedVehicles);
    } catch (err) {
      console.error('Error fetching vehicles for comparison:', err);
      setError('Failed to load vehicles for comparison. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const removeVehicleFromComparison = (vehicleId) => {
    const updatedVehicles = vehiclesToCompare.filter(v => v.id !== vehicleId);
    setVehiclesToCompare(updatedVehicles);
  };

  const addToCart = (vehicle) => {
    // Replace with your actual cart functionality
    alert(`${vehicle.model} would be added to cart! (Demo)`);
    console.log('Adding to cart:', vehicle);
  };

  const viewDetails = (vehicle) => {
    // Replace with navigation to vehicle details page
    alert(`Would navigate to ${vehicle.model} details page! (Demo)`);
    console.log('View details:', vehicle);
  };

  if (loading) {
    return (
      <div className="compare-vehicles-container">
        <Navbar />
        <div className="compare-content">
          <h1 className="compare-title">Compare Vehicles</h1>
          <div className="loading-message">Loading vehicles for comparison...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="compare-vehicles-container">
        <Navbar />
        <div className="compare-content">
          <h1 className="compare-title">Compare Vehicles</h1>
          <div className="error-message">{error}</div>
          <button onClick={fetchVehiclesForComparison} className="retry-button">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (vehiclesToCompare.length === 0) {
    return (
      <div className="compare-vehicles-container">
        <Navbar />
        <div className="compare-content">
          <h1 className="compare-title">Compare Vehicles</h1>
          <div className="no-vehicles-message">No vehicles available for comparison.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="compare-vehicles-container">
      <Navbar />
      
      <div className="compare-content">
        <h1 className="compare-title">Compare Vehicles</h1>
        
        {/* Vehicle Cards Section */}
        <div className="vehicle-cards-grid">
          {vehiclesToCompare.map((vehicle) => (
            <div key={vehicle.id} className="vehicle-card">
              <button 
                className="remove-vehicle-btn"
                onClick={() => removeVehicleFromComparison(vehicle.id)}
                title="Remove from comparison"
              >
                ×
              </button>
              
              <img 
                src={vehicle.imageUrl}
                alt={vehicle.model}
                className="vehicle-card-display-image"
                onError={(e) => {
                  e.target.src = defaultImages.black;
                }}
              />
              
              <div className="vehicle-card-info-container">
                <div className="vehicle-card-title-and-year-container">
                  <h1 className="vehicle-card-title">{vehicle.model}</h1>
                  <div className="vehicle-card-year-badge">{vehicle.year}</div>
                </div>
                
                <div className="vehicle-card-car-details">
                  <img src={rangeLogo} alt="Range" />
                  <h3>{vehicle.maxRange} km</h3>
                  <img src={accelerationLogo} alt="Acceleration" />
                  <h3>{vehicle.acceleration}s</h3>
                  <img src={drivetrainLogo} alt="Drivetrain" />
                  <h3>{vehicle.driveType}</h3>
                </div>
                
                <div className="vehicle-card-button-and-price">
                  <h2>${vehicle.price.toLocaleString()}</h2>
                  <button 
                    className="add-to-cart-btn"
                    onClick={() => addToCart(vehicle)}
                  >
                    <img src={cartLogo} alt="Cart" />
                    Add to Cart
                  </button>
                </div>
                
                <div className="view-details-section">
                  <button 
                    className="view-details-btn"
                    onClick={() => viewDetails(vehicle)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="comparison-table-container">
          <table className="comparison-table">
            <thead>
              <tr>
                <th className="spec-label-header">Specification</th>
                {vehiclesToCompare.map((vehicle) => (
                  <th key={vehicle.id} className="vehicle-column-header">
                    {vehicle.model}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="spec-label">Price</td>
                {vehiclesToCompare.map((vehicle) => (
                  <td key={vehicle.id} className="spec-value">
                    ${vehicle.price.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="spec-label">Max Range</td>
                {vehiclesToCompare.map((vehicle) => (
                  <td key={vehicle.id} className="spec-value">
                    {vehicle.maxRange} km
                  </td>
                ))}
              </tr>
              <tr>
                <td className="spec-label">Horsepower</td>
                {vehiclesToCompare.map((vehicle) => (
                  <td key={vehicle.id} className="spec-value">
                    {vehicle.horsepower} hp
                  </td>
                ))}
              </tr>
              <tr>
                <td className="spec-label">0-100 km/h</td>
                {vehiclesToCompare.map((vehicle) => (
                  <td key={vehicle.id} className="spec-value">
                    {vehicle.acceleration} sec
                  </td>
                ))}
              </tr>
              <tr>
                <td className="spec-label">Battery</td>
                {vehiclesToCompare.map((vehicle) => (
                  <td key={vehicle.id} className="spec-value">
                    {vehicle.batteryCapacity} kWh
                  </td>
                ))}
              </tr>
              <tr>
                <td className="spec-label">Charging</td>
                {vehiclesToCompare.map((vehicle) => (
                  <td key={vehicle.id} className="spec-value">
                    {vehicle.chargingPower} kW
                  </td>
                ))}
              </tr>
              <tr>
                <td className="spec-label">Efficiency</td>
                {vehiclesToCompare.map((vehicle) => (
                  <td key={vehicle.id} className="spec-value">
                    {vehicle.efficiency} km/kWh
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CompareVehicles;