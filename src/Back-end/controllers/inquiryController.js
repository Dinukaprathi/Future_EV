const Inquiry = require('../models/inquiryModel');

class InquiryController {
  async createInquiry(req, res) {
    const { stationName, address, contactPerson, contactEmail, contactPhone, additionalNotes } = req.body;

    if (!stationName || !address || !contactPerson || !contactEmail) {
      return res.status(400).json({ message: 'All required fields must be filled' });
    }

    try {
      const newInquiry = new Inquiry({
        stationName,
        address,
        contactPerson,
        contactEmail,
        contactPhone,
        additionalNotes,
      });

      await newInquiry.save();
      res.status(201).json({ message: 'Inquiry submitted successfully', inquiry: newInquiry });
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      res.status(500).json({ message: 'Error submitting inquiry', error: error.message });
    }
  }
}

module.exports = new InquiryController();