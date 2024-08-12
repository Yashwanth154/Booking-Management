const express = require('express');
const cors = require('cors'); // Import the cors package
const app = express();
app.use(cors());
app.use(express.json());
app.use('/',express.static('view'));
const businessRoutes = require('./routes/routes.js');
app.use('/bookings', businessRoutes);
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
