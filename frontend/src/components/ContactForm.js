import React, { useState } from 'react';
import axios from 'axios';
import API_URL from '../config';

const ContactForm = ({ onAdd, contacts = [] }) => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');

  const validate = () => {
    const errs = {};
    if (!form.name) errs.name = "Name is required";
    if (!form.phone) errs.phone = "Phone is required";
    if (!form.email) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Email is invalid";
    
    // Check for duplicate email
    if (form.email) {
      const duplicateEmail = contacts.find(c => c.email.toLowerCase().trim() === form.email.toLowerCase().trim());
      if (duplicateEmail) {
        errs.email = "A contact with this email already exists";
      }
    }
    
    // Check for duplicate phone
    if (form.phone) {
      const duplicatePhone = contacts.find(c => c.phone.trim() === form.phone.trim());
      if (duplicatePhone) {
        errs.phone = "A contact with this phone number already exists";
      }
    }
    
    return errs;
  };

  const handleChange = e => setForm({...form, [e.target.name]: e.target.value});

  const handleSubmit = async e => {
    e.preventDefault();
    setErrors({});
    setSuccess('');
    
    const errs = validate();
    if (Object.keys(errs).length) { 
      setErrors(errs); 
      return; 
    }
    
    try {
      const res = await axios.post(`${API_URL}/api/contacts`, form);
      setSuccess("Contact added successfully!");
      setForm({ name: '', email: '', phone: '', message: '' });
      setErrors({});
      onAdd(res.data);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      if (err.response && err.response.status === 409) {
        // Duplicate error from backend
        const errorMessage = err.response.data.message;
        if (errorMessage.includes('email')) {
          setErrors({ email: errorMessage });
        } else if (errorMessage.includes('phone')) {
          setErrors({ phone: errorMessage });
        }
      } else {
        setErrors({ submit: err.response?.data?.message || 'Failed to add contact. Please try again.' });
      }
    }
  };

  return (
    <div>
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mr-3">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Add New Contact</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input 
            type="text" 
            name="name" 
            value={form.name} 
            onChange={handleChange} 
            placeholder="John Doe"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 bg-gray-50 hover:bg-white text-gray-900 placeholder-gray-400" 
          />
          {errors.name && <p className="mt-1 text-sm text-red-600 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.name}
          </p>}
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input 
            type="email" 
            name="email" 
            value={form.email} 
            onChange={handleChange} 
            placeholder="john.doe@example.com"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 bg-gray-50 hover:bg-white text-gray-900 placeholder-gray-400" 
          />
          {errors.email && <p className="mt-1 text-sm text-red-600 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.email}
          </p>}
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input 
            type="text" 
            name="phone" 
            value={form.phone} 
            onChange={handleChange} 
            placeholder="+1 (555) 123-4567"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 bg-gray-50 hover:bg-white text-gray-900 placeholder-gray-400" 
          />
          {errors.phone && <p className="mt-1 text-sm text-red-600 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.phone}
          </p>}
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Message (Optional)
          </label>
          <textarea 
            name="message" 
            value={form.message} 
            onChange={handleChange} 
            placeholder="Add any additional notes..."
            rows="4"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 bg-gray-50 hover:bg-white resize-none text-gray-900 placeholder-gray-400" 
          />
        </div>
        
        {errors.submit && (
          <div className="bg-red-50 border-2 border-red-200 text-red-800 px-4 py-3 rounded-xl flex items-center">
            <svg className="w-5 h-5 mr-2 text-red-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.submit}
          </div>
        )}
        
        <button 
          type="submit" 
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          Add Contact
        </button>
        
        {success && (
          <div className="bg-green-50 border-2 border-green-200 text-green-800 px-4 py-3 rounded-xl flex items-center">
            <svg className="w-5 h-5 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            {success}
          </div>
        )}
      </form>
    </div>
  );
};

export default ContactForm;