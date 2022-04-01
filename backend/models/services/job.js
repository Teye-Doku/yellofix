
module.exports = ( sequelize, DataTypes ) => {
    const Job = sequelize.define('Jobs', {
        max_bids_allowed: {
            type: DataTypes.INTEGER,
        },
        total_bids: {
            type: DataTypes.INTEGER,
        },
        categoryId: {
            type: DataTypes.INTEGER
        },
        title: {
             type:DataTypes.STRING,
             allowNull: false
        },
        location: {
            type:DataTypes.STRING,
            allowNull: false
        },
        availability: {
            type: DataTypes.DATEONLY
        },
        userId: {
            type: DataTypes.INTEGER
        }
    })
   
    return Job;
   }