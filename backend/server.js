const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const PORT = process.env.PORT || 5000;


const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));


app.get('/',(req,res,next) => {
     res.status(200).send('It is working')
});


app.listen(PORT,() => console.log(`server is running on port ${PORT}`))