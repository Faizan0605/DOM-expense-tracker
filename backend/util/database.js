const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('sql12839418', 'sql12839418', 'wRXYaM9RbW', {
    host: 'sql12.freesqldatabase.com',
    dialect: 'mysql'
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection to the Database has been created");
    } catch (err) {
        console.log(err);
    }
})();


module.exports = sequelize;