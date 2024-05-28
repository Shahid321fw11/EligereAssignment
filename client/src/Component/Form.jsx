import React, { useState } from "react";
import axios from "axios";
import "./Form.css";

const Form = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    eventSession: "",
  });

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // URL
  const URL = "http://localhost:8000/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Perform client-side validation
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.eventSession
    ) {
      alert("Please fill in all fields");
      setLoading(false);
      return;
    }
    // Perform email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address");
      setLoading(false);
      return;
    }

    // Perform phone number validation
    const phoneRegex = /^[0-9]+$/;
    if (!phoneRegex.test(formData.phone)) {
      alert("Phone number should contain only numbers");
      setLoading(false);
      return;
    }

    // Check phone number length
    if (formData.phone.length < 10 || formData.phone.length > 12) {
      alert("Phone number should be between 10 and 12 digits");
      setLoading(false);
      return;
    }

    // If all validations pass, show confirmation popup
    try {
      const response = await axios.post(`${URL}api/users`, formData);
      console.log("Backend Response:", response.data);

      setModalData(formData);
      setShowConfirmation(true);

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        eventSession: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      if (error.response && error.response.data && error.response.data.error) {
        alert(`Error: ${error.response.data.error}`);
      } else {
        alert("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="container shadow-lg p-3 mb-5 bg-body rounded d-flex justify flex-column justify-content-center align-items-center pb-5">
      <h1 className="my-5 fs-1 text-white">Event Registration Form</h1>
      <form onSubmit={handleSubmit} className="border border-3">
        <div className="px-3 py-2 m-4 gap-3 d-flex flex-row border border-2 justify-content-center align-items-center">
          <label htmlFor="fullName" className="form-label fs-5 m-0">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            minLength="4"
            maxLength="20"
            required
          />
        </div>
        <div className="px-3 py-2 m-4 gap-3 d-flex flex-row border border-2 justify-content-center align-items-center">
          <label htmlFor="email" className="form-label fs-5 m-0">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            minLength="7"
            maxLength="30"
          />
        </div>
        <div className="px-3 py-2 m-4 gap-3 d-flex flex-row border border-2 justify-content-center align-items-center">
          <label htmlFor="phone" className="form-label fs-5 m-0">
            Number
          </label>
          <input
            type="text"
            className="form-control"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            minLength="10"
            maxLength="12"
          />
        </div>
        <div className="px-3 py-2 m-4 gap-3 d-flex flex-row border border-2 justify-content-center align-items-center">
          <label htmlFor="eventSession" className="form-label fs-5 m-0">
            Event
          </label>
          <select
            className="form-select"
            id="eventSession"
            name="eventSession"
            value={formData.eventSession}
            onChange={handleChange}
            required
          >
            <option value="">Select Event</option>
            <option value="Event 1">Event 1</option>
            <option value="Event 2">Event 2</option>
            <option value="Event 3">Event 3</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary p-2 px-4 m-3">
          Register
        </button>
      </form>
      {loading && (
        <div className="loading-overlay">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {showConfirmation && (
        <div
          className="modal show fade"
          role="dialog"
          style={{ display: "block" }}
        >
          <div className="modal-dialog  modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Registration Confirmation</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => setShowConfirmation(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Thank you for registering!</p>
                <p>
                  <strong>Full Name:</strong> {modalData.fullName}
                </p>
                <p>
                  <strong>Email Address:</strong> {modalData.email}
                </p>
                <p>
                  <strong>Phone Number:</strong> {modalData.phone}
                </p>
                <p>
                  <strong>Event Session:</strong> {modalData.eventSession}
                </p>
                {/* You can include the registration ID here if needed */}
              </div>
            </div>
          </div>
        </div>
      )}
      {showConfirmation && <div className="modal-backdrop show"></div>}
    </div>
  );
};

export default Form;
