import React from 'react';
import { Link } from 'react-router-dom';
import CountUp from 'react-countup';
import "./header.css";

function Header() {
  return (
    <header className="App-header">
      <h1>Welcome!</h1>
      <h3 className="des">Know all the information about electric vehicles from one place!</h3>
      
      <div className="stats-container">
        <div className="stat-item">
          <h2>
            <CountUp end={50} duration={2} />+
          </h2>
          <p>Charging Stations</p>
        </div>
        <div className="stat-item">
          <h2>
            <CountUp end={200} duration={2} suffix="WH" />
          </h2>
          <p>Energy Capacity</p>
        </div>
        <div className="stat-item">
          <h2>
            <CountUp end={500} duration={2} />+
          </h2>
          <p>Members</p>
        </div>
      </div>
      
      <Link to="/map">
        <button className="user-btn">Find Stations</button>
      </Link>
    </header>
  );
}

export default Header;
