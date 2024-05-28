import React, { useState } from "react";
import axios from "axios";

const Form = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    eventSession: "",
  });

  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform client-side validation
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.eventSession
    ) {
      alert("Please fill in all fields");
      return;
    }
    // Perform email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address");
      return;
    }

    // Perform phone number validation
    const phoneRegex = /^[0-9]+$/;
    if (!phoneRegex.test(formData.phone)) {
      alert("Phone number should contain only numbers");
      return;
    }
    // If all validations pass, show confirmation popup
    try {
      const response = await axios.post(
        "http://localhost:8000/api/users",
        formData
      );
      console.log("Backend Response:", response.data);
      setShowConfirmation(true);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  return (
    <div className="container shadow-lg p-3 mb-5 bg-body rounded d-flex justify flex-column justify-content-center align-items-center pb-5">
      <h1 className="my-5">Event Registration Form</h1>
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
          />
        </div>
        <div className="px-3 py-2 m-4 gap-3 d-flex flex-row border border-2 justify-content-center align-items-center">
          <label htmlFor="phone" className="form-label fs-5 m-0">
            Number
          </label>
          <input
            type="Number"
            className="form-control"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
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
            <option value="Session 1">Event 1</option>
            <option value="Session 2">Event 2</option>
            <option value="Session 3">Event 3</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary p-2 px-4 m-3">
          Register
        </button>
      </form>
      {showConfirmation && (
        <div
          className="modal"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Registration Confirmation</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setShowConfirmation(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Thank you for registering!</p>
                <p>
                  <strong>Full Name:</strong> {formData.fullName}
                </p>
                <p>
                  <strong>Email Address:</strong> {formData.email}
                </p>
                <p>
                  <strong>Phone Number:</strong> {formData.phone}
                </p>
                <p>
                  <strong>Event Session:</strong> {formData.eventSession}
                </p>
                {/* You can include the registration ID here if needed */}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* <div className="modal-backdrop fade show"></div> */}
    </div>
  );
};

export default Form;
