const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// POST: Add contact
router.post('/', async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;
        if(!name || !email || !phone) {
            return res.status(400).json({ message: 'Name, email, and phone are required.' });
        }
        
        // Check for duplicate email or phone
        const existingContact = await Contact.findOne({ 
            $or: [
                { email: email.toLowerCase().trim() },
                { phone: phone.trim() }
            ]
        });
        
        if (existingContact) {
            if (existingContact.email.toLowerCase().trim() === email.toLowerCase().trim()) {
                return res.status(409).json({ message: 'A contact with this email already exists.' });
            }
            if (existingContact.phone.trim() === phone.trim()) {
                return res.status(409).json({ message: 'A contact with this phone number already exists.' });
            }
        }
        
        const contact = new Contact({ name, email: email.toLowerCase().trim(), phone: phone.trim(), message });
        await contact.save();
        res.status(201).json(contact);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET: Fetch all contacts
router.get('/', async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE: Delete contact
router.delete('/:id', async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found.' });
        }
        res.json({ message: 'Contact deleted successfully.', contact });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;