
module.exports = ( sequelize, DataTypes ) => {
    const Booking = sequelize.define('Bookings', {
        professionalId: {
            type: DataTypes.INTEGER,
        },
        userId: {
            type: DataTypes.INTEGER,
        },
        amount: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        serviceFee: {
            type: DataTypes.DOUBLE,
            allowNull: false 
        },
        yourEarn: {
            type: DataTypes.DOUBLE,
            allowNull: false 
        },
        startDate: {
            type: DataTypes.DATEONLY
        },
        endDate: {
            type: DataTypes.DATEONLY
        }
        
    
    })
   
    return Booking;
   }