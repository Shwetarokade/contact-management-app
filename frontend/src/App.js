import React, { useState, useEffect } from 'react';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import axios from 'axios';
import API_URL from './config';

function App() {
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    const res = await axios.get(`${API_URL}/api/contacts`);
    setContacts(res.data);
  };

  useEffect(() => { fetchContacts(); }, []);

  const handleAdd = (contact) => setContacts([contact, ...contacts]);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/api/contacts/${id}`);
      setContacts(contacts.filter(contact => contact._id !== id));
    } catch (error) {
      console.error('Error deleting contact:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to delete contact. Please try again.';
      alert(`Error: ${errorMessage}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-2">
            Contact Management
          </h1>
          <p className="text-gray-600 text-lg">Manage your contacts with ease</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
            <ContactForm onAdd={handleAdd} contacts={contacts} />
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
            <ContactList contacts={contacts} onDelete={handleDelete} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;