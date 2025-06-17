import React, { useState } from "react";
import axios from "axios";
import "./ChangePassword.css";

const ChangePassword = () => {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [status, setStatus] = useState({ message: "", type: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ message: "", type: "" });

    if (form.newPassword !== form.confirmPassword) {
      setStatus({ message: "New passwords do not match.", type: "error" });
      return;
    }

    try {
      const response = await axios.post(
        `${window.apiHost}/user/change-password`,
        form
      );
      setStatus({
        message: response.data.message || "Password changed!",
        type: "success",
      });
      setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      setStatus({
        message: err.response?.data?.message || "Password update failed.",
        type: "error",
      });
    }
  };

  return (
    <div className="change-password-section">
      <h4>Change Password</h4>
      {status.message && (
        <div className={`status-message ${status.type}`}>{status.message}</div>
      )}
      <form onSubmit={handleSubmit} className="change-password-form">
        <input
          type="password"
          name="currentPassword"
          placeholder="Current Password"
          value={form.currentPassword}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={form.newPassword}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm New Password"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn red">
          Update Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
