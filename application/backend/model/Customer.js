const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  customerId: { type: String, required: true },
  customerName: { type: String, required: true },
  contact: { type: String, required: true },
  email: { type: String, required: true },
  trackId: { type: String, required: true },
  status: { type: String, required: true },
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
