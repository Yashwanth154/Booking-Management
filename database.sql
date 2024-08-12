create database bookings;
use bookings;
create table booking_details (
	booking_id INT auto_increment PRIMARY KEY,
    customer_name varchar(20),
    booking_date varchar(10),
    booking_time varchar(10),
    total_amount INT,
    booking_status varchar(20),
    payment_method varchar(10),
    duration_minutes INT
);
INSERT INTO booking_details (customer_name, booking_date, booking_time, total_amount, booking_status, payment_method, duration_minutes)
VALUES ('harsh', '2021-01-19', '23:00:00', 200, 'available', 'card', 100);
select * from booking_details;
INSERT INTO booking_details (customer_name, booking_date, booking_time, total_amount, booking_status, payment_method, duration_minutes)
VALUES ('kishore', '2020-02-09', '20:00:00', 100, 'not_available', 'cash', 50);
