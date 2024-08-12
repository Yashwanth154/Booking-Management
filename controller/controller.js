const db=require('../models/models.js');
exports.bookingdetails = (req, res) => {
    db.getall((err, bookings) => {
        if (err) {
            console.error('Error getting bookings:', err);
            res.status(500).send('Error getting bookings');
            return;
        }
        res.status(200).send(bookings);
    });
};
exports.bookingsbyid = (req, res) => {
    db.getbyid(req.params.id, (err, booking) => {
        if (err) {
            console.error('Error getting booking by ID:', err);
            res.status(500).send('Error getting booking');
            return;
        }
        console.log(booking);
        res.status(200).send(booking);
    });
};
exports.newbooking = (req, res) => {
    const booking = req.body;
    db.newbooking(booking, (err, result) => {
        if (err) {
            console.error('Error creating new booking:', err);
            res.status(500).send('Error creating booking');
            return;
        }
        res.status(201).send({ id: result.insertId, ...booking });
    });
};
exports.updatebooking = (req, res) => {
    const booking = req.body;
    db.updatebooking(req.params.id, booking, (err) => {
        if (err) {
            console.error('Error updating booking:', err);
            res.status(500).send('Error updating booking');
            return;
        }
        res.status(200).send({ message: 'Booking updated successfully' });
    });
};
exports.deletebooking = (req, res) => {
    db.deletebooking(req.params.id, (err) => {
        if (err) {
            console.error('Error deleting booking:', err);
            res.status(500).send('Error deleting booking');
            return;
        }
        res.status(200).send({ message: 'Booking deleted successfully' });
    });
};
