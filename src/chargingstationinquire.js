import React, { useState } from "react";
import axios from 'axios';
import "./chargingstationinquire.css";

const ChargingStationInquiryForm = () => {
  const [formData, setFormData] = useState({
    stationName: "",
    address: "",
    contactPerson: "",
    contactEmail: "",
    contactPhone: "",
    additionalNotes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/inquiries', formData);
      window.alert('Inquiry submitted successfully!');
      console.log('Form submitted:', response.data);
    } catch (error) {
      if (error.response) {
        window.alert(`Error submitting inquiry: ${error.response.data.message}`);
      } else {
        window.alert(`Error submitting inquiry: ${error.message}`);
      }
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="main-container">
      <div className="text-container">
        <h1 className="animated-text">Owner of a charging station?</h1>
        <h3>Let us know!</h3>
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <p className="form-text">Station Name</p>
            <input
              type="text"
              id="stationName"
              name="stationName"
              value={formData.stationName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <p className="form-text">Location</p>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <p className="form-text">Contact Person</p>
            <input
              type="text"
              id="contactPerson"
              name="contactPerson"
              value={formData.contactPerson}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <p className="form-text">Contact Email</p>
            <input
              type="email"
              id="contactEmail"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <p className="form-text">Contact Phone</p>
            <input
              type="tel"
              id="contactPhone"
              name="contactPhone"
              value={formData.contactPhone}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <p className="form-text">Additional Notes</p>
            <textarea
              id="additionalNotes"
              name="additionalNotes"
              value={formData.additionalNotes}
              onChange={handleChange}
            ></textarea>
          </div>
          <button type="submit" className="submit-button">
            Submit Inquiry
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChargingStationInquiryForm;