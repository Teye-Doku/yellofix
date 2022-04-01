const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const usersRoutes = require('./routes/users/users');
const creditRoutes = require('./routes/credits');
const subscriptionRoutes = require('./routes/subscriptions');
const reviewRoutes = require('./routes/reviews');
const professionalRoutes = require('./routes/services/professionals');
const categoryRoutes = require('./routes/services/categories');
const subCategoryRoutes = require('./routes/services/subcategories');
const bookingRoutes = require('./routes/services/bookings');
const jobRoutes = require('./routes/services/jobs');
const questionRoutes = require('./routes/questions');


const PORT = process.env.PORT || 5000;


const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use('/api/categories',categoryRoutes);
app.use('/api/subcategories',subCategoryRoutes);
app.use('/api/professionals',professionalRoutes);
app.use('/api/users',usersRoutes);
app.use('/api/credits',creditRoutes);
app.use('/api/subscriptions',subscriptionRoutes);
app.use('/api/reviews',reviewRoutes);
app.use('/api/bookings',bookingRoutes);
app.use('/api/jobs',jobRoutes);
app.use('/api/questions',questionRoutes);


app.get('/',(req,res,next) => {
     res.status(200).send('It is working')
});

app.use((req,res,next) => {
     const error = new Error('not found');
     error.status = 404;
     next(error);
   });
 app.use((error,req,res,next) => {
    res.status(error.status || 500).json({
         error:{
             message:error.message
         }
    });
   })
 

app.listen(PORT,() => console.log(`server is running on port ${PORT}`));
module.exports = app;