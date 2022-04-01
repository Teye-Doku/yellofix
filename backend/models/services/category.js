
module.exports = ( sequelize, DataTypes ) => {
 const Category = sequelize.define('Categories', {
    title: {
        type: DataTypes.TEXT,
        allowNull: false
    },
     image: {
         type: DataTypes.STRING,
         allowNull: false
     }
 })

 return Category;
}