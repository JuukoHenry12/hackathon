const express = require('express');
const CustomerRouter = express.Router();
const {addCustomer,getCustomer} = require('../controller/customer');

// Ensure addCustomer is a function that handles req and res
CustomerRouter.post('/add', addCustomer);
CustomerRouter.get('/get', getCustomer);
module.exports = CustomerRouter;
