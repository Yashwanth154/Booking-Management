//initial input
const idInput = document.getElementById("customer-id-input");
const nameInput = document.getElementById("customer-name-input");
const dateInput = document.getElementById("date-input");
const timeInput = document.getElementById("time-input");
const totalamount = document.getElementById("number-input");
const statusa = document.getElementById("status-input");
const payment_method = document.getElementById("payment-input");
const duration = document.getElementById("duration-input");
const addBtn = document.getElementById("add-btn");
const tableBody = document.getElementById("table-body");
//update input
const updateidInput = document.getElementById("update-customer-id");
const updatenameInput = document.getElementById("update-customer-name");
const updatedateInput = document.getElementById("update-booking-date");
const updatetimeInput = document.getElementById("update-booking-time");
const updatetotalamount = document.getElementById("update-total-amount");
const updatestatus = document.getElementById("update-status");
const updatepayment_method = document.getElementById("update-payment-type");
const updateduration = document.getElementById("update-duration-minutes");
const updateBtn = document.getElementById("update-btn");
const cancelBtn = document.getElementById("cancel-btn");
let currentUserId = null;
function displayTable() {
    tableBody.innerHTML = "";
    fetch('http://localhost:3000/bookings/booking-details')
    .then(response => response.json())
    .then(users => {
        users.forEach(user => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${user.booking_id}</td>
                <td>${user.customer_name}</td>
                <td>${user.booking_date}</td>
                <td>${user.booking_time}</td>
                <td>${user.total_amount}</td>
                <td>${user.booking_status}</td>
                <td>${user.payment_method}</td>
                <td>${user.duration_minutes}</td>
                <td>
                    <button class="edit-btn" onclick="showUpdateForm(${user.booking_id})">Edit</button>
                    <button class="delete-btn" onclick="deleteUser(${user.booking_id})">Delete</button>
                </td>
            `;
            tableBody.appendChild(tr);
        });
    })
    .catch(error => {
        console.error('Error fetching bookings:', error);
    });
}
function addUser() {
    const id = idInput.value;
    const name = nameInput.value;
    const date = dateInput.value;
    const time = timeInput.value;
    const totalAmount = totalamount.value;
    const bookingStatus = statusa.value;
    const paymentMethod = payment_method.value;
    const durationa = duration.value;
    if (id && name && date && time && totalAmount && bookingStatus && paymentMethod && durationa) {
        const user = {
            booking_id: id,
            customer_name: name,
            booking_date: date,
            booking_time: time,
            total_amount: totalAmount,
            booking_status: bookingStatus,
            payment_method: paymentMethod,
            duration_minutes: durationa
        };
        fetch('http://localhost:3000/bookings/booking-details', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            displayTable();
        })
        .catch(error => {
            console.error('Error:', error);
        });
        idInput.value = "";
        nameInput.value = "";
        dateInput.value = "";
        timeInput.value = "";
        totalamount.value = "";
        statusa.value = "";
        payment_method.value = "";
        durationa.value = "";
    } 
    else {
        alert("Please enter all details.");
    }
}
function showUpdateForm(userId) {
    if (!userId) {
        console.error('User ID is undefined');
        return;
    }
    fetch(`http://localhost:3000/bookings/bookings/${userId}`)
    .then(response => response.json())
    .then(user => {
        if (user) {
            document.getElementById("input-container").style.display = "none";
            document.getElementById("update-container").style.display = "block";
            updateidInput.value = user.booking_id;
            updatenameInput.value = user.customer_name;
            updatedateInput.value = user.booking_date;
            updatetimeInput.value = user.booking_time;
            updatetotalamount.value = user.total_amount;
            updatestatus.value = user.booking_status;
            updatepayment_method.value = user.payment_method;
            updateduration.value = user.duration_minutes;
            currentUserId = user.booking_id;
        }
    })
    .catch(error => {
        console.error('Error fetching booking:', error);
    });
}
function updateUser() {
    const updatedUser = {
        booking_id: updateidInput.value,
        customer_name: updatenameInput.value,
        booking_date: updatedateInput.value,
        booking_time: updatetimeInput.value,
        total_amount: updatetotalamount.value,
        booking_status: updatestatus.value,
        payment_method: updatepayment_method.value,
        duration_minutes: updateduration.value
    };
    fetch(`http://localhost:3000/bookings/bookings/${updatedUser.booking_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedUser)
    })
    .then(response => response.json())
    .then(data => {
        alert("booking successfull");
        console.log('Booking updated:', data);
        displayTable();
        hideUpdateForm();
    })
    .catch(error => {
        console.error('Error updating booking:', error);
    });
}
function hideUpdateForm() {
    document.getElementById("update-container").style.display = "none";
    document.getElementById("input-container").style.display = "flex";
    updateBtn.removeEventListener("click", updateUser);
}
function deleteUser(userId) {
    if (!userId) {
        console.error('User ID is undefined');
        return;
    }
    fetch(`http://localhost:3000/bookings/bookings/${userId}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        console.log('Booking deleted:', data);
        displayTable();
    })
    .catch(error => {
        console.error('Error deleting booking:', error);
    });
}
document.addEventListener("DOMContentLoaded", displayTable);
