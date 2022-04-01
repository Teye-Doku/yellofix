const db = require('../../models');

const Booking = db.bookings;

exports.createBooking = async (req,res,next) => {}
exports.getBookings = async (req,res,next) => {
    const id = req.params.id; 
    let bookings;
    try {
          bookings = await Booking.findAll();
    }catch(err) {
        return next(
            new HttpError('could find job',500)
        )
    }
    res.status(200).json({bookings})
}
exports.getBooking = async (req,res,next) => {
    const id = req.params.id; 
    let booking;
    try {
          booking = await Booking.findByPk(id);
    }catch(err) {
        return next(
            new HttpError('could find job',500)
        )
    }
    res.status(200).json({
        booking
    })
}
exports.updateBooking = async (req,res,next) => {
    const id = req.params.id; 
    let booking;
    try {
          booking = await Booking.findByPk(id);
    }catch(err) {
        return next(
            new HttpError('could find job',500)
        )
    }
    let updatedBooking;
    try {
        updatedBooking = await Booking.upsert({
            id:id
        })
    }catch(err) {
        return next(
            new HttpError('could not update job',500)
        ) 
    }
    res.status(201).json({
        message:"booking deleted",
        booking
    })
}
exports.deleteBooking = async (req,res,next) => {
    const id = req.params.id; 
    let booking;
    try {
          booking = await Booking.findByPk(id);
    }catch(err) {
        return next(
            new HttpError('could find job',500)
        )
    }
    if(booking) {
        await booking.destroy();
    }
    res.status(200).json({
        message:"booking deleted",
        booking
    })
}