const Customer = require('../model/Customer');
// Add a new customer
const addCustomer = async (req, res) => {
  try {
    const formData = req.body;
    const newCustomer = new Customer(formData);
    await newCustomer.save();
    res.status(201).json({ message: 'Customer added successfully!' });
  } catch (error) {
    console.error('Error adding customer:', error);
    res.status(500).json({ error: 'Failed to add customer' });
  }
};

// Get all customers
const getCustomer = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ error: 'Failed to fetch customers' });
  }
};

module.exports = {
  addCustomer,
  getCustomer,
};
