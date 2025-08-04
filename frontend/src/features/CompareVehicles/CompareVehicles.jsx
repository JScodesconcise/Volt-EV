import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import "./CompareVehicles.css";
import Navbar from "../Layout/Navbar";
import rangeLogo from "../../Media/zap.svg";
import accelerationLogo from "../../Media/car-front.svg";
import drivetrainLogo from "../../Media/gauge.svg";
import cartLogo from "../../Media/cart-vehicle-card.svg";
import evBlackImage from "../../Media/EV black view.png";
import evOliveImage from "../../Media/EV Olive View.png";
import { useShoppingCart } from "../../hooks/useShoppingCart";

function CompareVehicles() {
  const [vehiclesToCompare, setVehiclesToCompare] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const { cartItems, setCartItems } = useShoppingCart();

  useEffect(() => {
    console.log("Loading vehicles for comparison...");
    
    if (location.state && location.state.VehicleArr && location.state.VehicleArr.length > 0) {
      const passedVehicles = location.state.VehicleArr;
      console.log("Vehicle data received from ViewVehicles:", passedVehicles);
      
      const validVehicles = passedVehicles.filter(vehicle => vehicle && vehicle.id);
      console.log("Valid vehicles from passed data:", validVehicles);
      
      if (validVehicles.length > 0) {
        const transformedVehicles = validVehicles.map((vehicle, index) => {
          console.log(`Processing vehicle ${index}:`, vehicle);
          
          let imageUrl = vehicle.imageUrl || vehicle.image;
          
          if (!imageUrl) {
            if (vehicle.colour && vehicle.colour.toLowerCase().includes('black')) {
              imageUrl = evBlackImage;
            } else if (vehicle.colour && vehicle.colour.toLowerCase().includes('olive')) {
              imageUrl = evOliveImage;
            } else {
              imageUrl = evBlackImage;
            }
          }
          
          return {
            id: vehicle.id || `vehicle-${index}`,
            model: 'Model R',
            year: vehicle.year || 2023,
            price: vehicle.price || 0,
            imageUrl: imageUrl,
            maxRange: vehicle.range || 0,
            horsepower: vehicle.horsepower || 0,
            acceleration: vehicle.acceleration || 0,
            batteryCapacity: vehicle.battery || 0,
            chargingPower: vehicle.charging || 0,
            efficiency: vehicle.efficiency || 0,
            driveType: vehicle.drivetrain || 'AWD'
          };
        });
        
        console.log("Transformed vehicles:", transformedVehicles);
        setVehiclesToCompare(transformedVehicles);
        setLoading(false);
      } else {
        console.log("No valid vehicles found");
        setError('No vehicles selected for comparison. Please go back to inventory and select vehicles to compare.');
        setLoading(false);
      }
    } else {
      console.log("No vehicle data received");
      setError('No vehicles selected for comparison. Please go back to inventory and select vehicles to compare.');
      setLoading(false);
    }
  }, [location.state]);

  const removeVehicleFromComparison = (vehicleId) => {
    const updatedVehicles = vehiclesToCompare.filter(v => v.id !== vehicleId);
    setVehiclesToCompare(updatedVehicles);
  };

  function filterVehicle(o1, exclude) {
    if (o1 === null || typeof o1 !== "object") return o1;

    return Object.fromEntries(
      Object.entries(o1)
        .filter(([k]) => !exclude.includes(k))
        .map(([k, v]) => [k, filterVehicle(v, exclude)])
        .sort(([a], [b]) => a.localeCompare(b))
    );
  }

  function checkIfEqual(o1, o2, exclude = []) {
    return (
      JSON.stringify(filterVehicle(o1, exclude)) ===
      JSON.stringify(filterVehicle(o2, exclude))
    );
  }

  const addToCart = (vehicle) => {
    const newItem = {
      image: vehicle.imageUrl,
      title: vehicle.model,
      year: vehicle.year,
      drivetrain: vehicle.driveType,
      range: vehicle.maxRange,
      acceleration: vehicle.acceleration,
      efficiency: vehicle.efficiency,
      price: vehicle.price,
      charging: vehicle.chargingPower,
      horsepower: vehicle.horsepower,
      colour: vehicle.model.replace('Model ', ''),
      quantity: 1,
      id: vehicle.id,
    };
    
    if (cartItems.length === 0) {
      setCartItems([...cartItems, newItem]);
    } else {
      let flag = false;
      cartItems.forEach((element) => {
        if (checkIfEqual(element, newItem, ["image", "quantity"])) {
          flag = true;
          setCartItems(
            cartItems.map((vehicle) =>
              vehicle === element
                ? { ...vehicle, quantity: vehicle.quantity + 1 }
                : vehicle
            )
          );
        }
      });
      if (flag === false) {
        setCartItems([...cartItems, newItem]);
      }
    }
  };

  if (loading) {
    return (
      <div className="compare-vehicles-container">
        <Navbar />
        <Link to="/" className="compare-vehicles-home-link">Home</Link>
        <div className="compare-content">
          <h1>Compare Vehicles</h1>
          <div className="loading-message">Loading vehicles for comparison...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="compare-vehicles-container">
        <Navbar />
        <Link to="/" className="compare-vehicles-home-link">Home</Link>
        <div className="compare-content">
          <h1>Compare Vehicles</h1>
          <div className="error-message">{error}</div>
          <button onClick={() => window.history.back()} className="retry-button">
            Go Back to Inventory
          </button>
        </div>
      </div>
    );
  }

  if (vehiclesToCompare.length === 0) {
    return (
      <div className="compare-vehicles-container">
        <Navbar />
        <Link to="/" className="compare-vehicles-home-link">Home</Link>
        <div className="compare-content">
          <h1>Compare Vehicles</h1>
          <div className="no-vehicles-message">No vehicles available for comparison.</div>
          <button onClick={() => window.history.back()} className="retry-button">
            Go Back to Inventory
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="compare-vehicles-container">
      <Navbar />
      <Link to="/" className="compare-vehicles-home-link">Home</Link>
      <h1>Compare Vehicles</h1>
      
      <div className="compare-content">
        
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
                  if (vehicle.colour && vehicle.colour.toLowerCase().includes('olive')) {
                    e.target.src = evOliveImage;
                  } else {
                    e.target.src = evBlackImage;
                  }
                }}
              />
              
              <div className="vehicle-card-info-container">
                <div className="vehicle-card-title-and-year-container">
                  <h1 className="vehicle-card-title">{vehicle.model}</h1>
                  <div className="vehicle-card-year-container">
                    <span className="vehicle-card-year">{vehicle.year}</span>
                  </div>
                </div>
                
                <div className="vehicle-card-car-details">
                  <div className="car-detail-wrapper">
                    <img src={rangeLogo} alt="Range" />
                    <h3>{vehicle.maxRange}km</h3>
                  </div>
                  <div className="car-detail-wrapper">
                    <img src={accelerationLogo} alt="Acceleration" />
                    <h3>{vehicle.acceleration}s</h3>
                  </div>
                  <div className="car-detail-wrapper">
                    <img src={drivetrainLogo} alt="Drivetrain" />
                    <h3>{vehicle.driveType}</h3>
                  </div>
                </div>
                
                <div className="vehicle-card-button-and-price">
                  <h2>${vehicle.price.toLocaleString()}</h2>
                  <button 
                    className="vehicle-card-button"
                    onClick={() => addToCart(vehicle)}
                  >
                    <img src={cartLogo} alt="Cart" />
                    Add to Cart
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