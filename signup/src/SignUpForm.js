import React, { useState } from "react";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    referralSource: "",
  });

  const [errors, setErrors] = useState({});
  const [isDarkTheme, setIsDarkTheme] = useState(true);
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
<div>

</div>
  );
};

export default SignupForm;
