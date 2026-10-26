const express = require('express');
const cors = require('cors');
const sequelize = require('./util/database');
const expenseRoutes = require('./routes/expenseRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send("asfsdfsd")
})
app.use('/expenses', expenseRoutes);

// Sync database and start server
sequelize.sync({ force: false })
    .then(() => {
        console.log('Database synced successfully.');
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    })
    .catch(err => {
        console.error('Failed to sync database:', err);
    });