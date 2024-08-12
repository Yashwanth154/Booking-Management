const config = require('../config/config.js');
const mysql = require('mysql2'); 
const con = mysql.createPool({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
});
exports.getall=(callback) => {con.query('SELECT * FROM booking_details',callback)};
exports.getbyid = (id, callback) => {
    con.query(`SELECT * FROM booking_details WHERE booking_id=  ${id}`, (err, result) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, result[0]);
    });
};
exports.newbooking = (booking, callback) => {
    con.query(
        `INSERT INTO booking_details (customer_name, booking_date, booking_time, total_amount, booking_status, payment_method, duration_minutes)
         VALUES ('${booking.customer_name}', '${booking.booking_date}', '${booking.booking_time}', ${booking.total_amount}, '${booking.booking_status}', 
         '${booking.payment_method}', ${booking.duration_minutes})`, callback
    );
};
exports.updatebooking = (id, booking, callback) => {
    con.query(`UPDATE booking_details SET 
        customer_name = '${booking.customer_name}', booking_date = '${booking.booking_date}', booking_time = '${booking.booking_time}', 
        total_amount = ${booking.total_amount}, booking_status = '${booking.booking_status}', payment_method = '${booking.payment_method}', 
        duration_minutes = ${booking.duration_minutes} 
        WHERE booking_id = ${id}`, callback
    );
};
exports.deletebooking = (id, callback) => {
    con.query('DELETE FROM booking_details WHERE booking_id = ?', id, callback);
};