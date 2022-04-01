module.exports = ( sequelize, DataTypes ) => {
    const SubCategory = sequelize.define('SubCategories', {
        categoryId:{
           type: DataTypes.INTEGER,
           allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        },
        title: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    })
   
    return SubCategory;
   }