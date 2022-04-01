

module.exports = (sequelize, DataTypes) => {
     const Review = sequelize.define("Reviews", {
         userId: {
             type: DataTypes.INTEGER
         },
         message: {
              type: DataTypes.TEXT,
              allowNull: false
         },
         userEmail: {
             type: DataTypes.STRING,
             allowNull: false
         }
     })

     return Review;
}