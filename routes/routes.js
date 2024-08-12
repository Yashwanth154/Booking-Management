const express = require('express');
const router = express.Router();
const userController = require('../controller/controller.js');
router.get('/booking-details', userController.bookingdetails);
router.get('/bookings/:id', userController.bookingsbyid);
router.post('/booking-details', userController.newbooking);
router.put('/bookings/:id', userController.updatebooking);
router.delete('/bookings/:id', userController.deletebooking);
module.exports = router;