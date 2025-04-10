import React, { useState } from "react";
import { FaToggleOn } from "react-icons/fa";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    referralSource: "",
  });

  const [errors, setErrors] = useState({});
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        return value.trim() === "" ? "Name is required." : "";
      case "email":
        if (!value) return "Email is required.";
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return !emailPattern.test(value) ? "Please enter a valid email." : "";
      case "password":
        return value === "" ? "Password is required." : "";
      case "confirmPassword":
        return value !== formData.password ? "Passwords do not match." : "";
      case "referralSource":
        return value === "" ? "Please select how you found out about us." : "";
      default:
        return "";
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    const errorMsg = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: errorMsg,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    Object.entries(formData).forEach(([name, value]) => {
      const error = validateField(name, value);
      if (error) newErrors[name] = error;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
      setIsSubmitted(true);

      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        referralSource: "",
      });

      setErrors({});
    } else {
      console.log("Validation failed");
    }
  };

  const toggleTheme = () => setIsDarkTheme((prev) => !prev);

  return (
    <div
      className={`signup-wrapper ${isDarkTheme ? "dark-theme" : "light-theme"}`}
    >
      <div className="signup-card">
        <div className="signup-image" />
        <div className="signup-container">
          <div className="form-header">
            <div className="form-logo">
              <img src="/images/logo.png" alt="Logo" />
            </div>
            <div className="theme-toggle">
              <button className="toggle-btn" onClick={toggleTheme}>
                <FaToggleOn size={24} color={isDarkTheme ? "#fff" : "#333"} />
              </button>
            </div>
          </div>
          <h2>Signup Form</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
              {errors.name && <span>{errors.name}</span>}
            </div>
            <div>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              {errors.email && <span>{errors.email}</span>}
            </div>
            <div>
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
              {errors.password && <span>{errors.password}</span>}
            </div>
            <div>
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
              {errors.confirmPassword && <span>{errors.confirmPassword}</span>}
            </div>
            <div>
              <label>How did you find out about us?</label>
              <select
                name="referralSource"
                value={formData.referralSource}
                onChange={handleInputChange}
              >
                <option value="">Select an option</option>
                <option value="Google">Google</option>
                <option value="Social Media">Social Media</option>
                <option value="Friend">Friend</option>
                <option value="Job Board">Job Board</option>
              </select>
              {errors.referralSource && <span>{errors.referralSource}</span>}
            </div>
            <div>
              <button type="submit">Sign Up</button>
            </div>
            <div className="login-redirect">
              Already have an account?{" "}
              <a href="/signin" className="login-link">
                Login
              </a>
            </div>
          </form>
          {isSubmitted && (
            <div className="success-message">
              <p>Signup successful!</p>
              <button onClick={() => (window.location.href = "/signin")}>
                Back to Signin
              </button>
            </div>
          )}

          <footer className="signup-footer">
            <p>
              📞 Contact us at{" "}
              <a href="mailto:support@directlyApply.com">
                support@directlyApply.com
              </a>
            </p>
            <p>📍London</p>
            <p>
              &copy; {new Date().getFullYear()} Counter Group Limited. All
              rights reserved.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
