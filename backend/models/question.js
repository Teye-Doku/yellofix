
module.exports = (sequelize, DataTypes) => {
    const Question = sequelize.define("Questions", {
         question: {
             type: DataTypes.STRING,
             allowNull: false
         },
         userId: {
             type: DataTypes.INTEGER,
         },
         date: {
             type: DataTypes.DATEONLY
         }
    });

    return Question;
}