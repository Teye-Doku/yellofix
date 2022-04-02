const dbConfig = require('../config/dbConfig');

const { Sequelize,DataTypes } = require('sequelize');


const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
          host: dbConfig.HOST,
          dialect: dbConfig.dialect,
          operatorsAliases: false, 
          pool:   {
               max: dbConfig.pool.max,
               min: dbConfig.pool.min,
               acquire: dbConfig.pool.acquire,
               idle:dbConfig.pool.idle
          }
    }
);

sequelize
.authenticate()
.then(() => {
     console.log('Connected');
})
.catch( err => console.log(`Error: ${err}`));

const db = {}
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.categories = require('./services/category.js')(sequelize,DataTypes);
db.users = require('./users/user.js')(sequelize,DataTypes);
db.credits = require('./credit.js')(sequelize,DataTypes);
db.subscriptions = require('./subcription.js')(sequelize,DataTypes);
db.reviews = require('./review.js')(sequelize,DataTypes);
db.subcategories = require('./services/subcategory')(sequelize,DataTypes);
db.bookings = require('./services/booking')(sequelize,DataTypes);
db.jobs = require('./services/job')(sequelize,DataTypes);
db.professionals = require('./services/professional')(sequelize,DataTypes);
db.questions = require('./question')(sequelize,DataTypes);
db.opts = require('./users/opt')(sequelize,DataTypes);
db.fopts = require('./users/fOpt')(sequelize,DataTypes);


db.sequelize
.sync({force:false})
.then(() => {
     console.log('resync done')
});

module.exports = db;