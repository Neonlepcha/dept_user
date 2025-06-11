import React, { useState } from "react";
import axios from "../api/axios";
import { User, Mail, Package, Hash, MessageSquare } from "lucide-react";

const RequestPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    item: "",
    quantity: "",
    reason: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/requests", form);
      alert("✅ Request submitted successfully.");
      setForm({ name: "", email: "", item: "", quantity: "", reason: "" });
    } catch (err) {
      console.error("Error submitting request:", err);
      alert("❌ Failed to submit request.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
      <h2 className="text-3xl font-bold text-center mb-6 text-violet-700 drop-shadow">
        Equipment Request Form
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div className="relative">
          <User className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>

        {/* Email */}
        <div className="relative">
          <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>

        {/* Item */}
        <div className="relative">
          <Package className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            name="item"
            value={form.item}
            onChange={handleChange}
            placeholder="Item Name"
            required
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>

        {/* Quantity */}
        <div className="relative">
          <Hash className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            name="quantity"
            type="number"
            value={form.quantity}
            onChange={handleChange}
            placeholder="Quantity"
            required
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>

        {/* Reason */}
        <div className="relative">
          <MessageSquare className="absolute left-3 top-3 text-gray-400" size={20} />
          <textarea
            name="reason"
            value={form.reason}
            onChange={handleChange}
            placeholder="Reason for Request"
            required
            rows="4"
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-violet-700 to-purple-600 text-white font-semibold py-2 rounded-md shadow-md hover:from-violet-800 hover:to-purple-700 transition duration-200"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default RequestPage;
