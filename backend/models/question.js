
module.exports = (sequelize, DataTypes) => {
    const Question = sequelize.define("Questions", {
         question: {
             type: DataTypes.STRING,
             allowNull: false
         },
         checked: {
             type:DataTypes.BOOLEAN,
             defaultValue: false
         },
         date: {
             type: DataTypes.DATEONLY
         }
    });

    return Question;
}