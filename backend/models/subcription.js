
module.exports = (sequelize,DataTypes) => {
    const Subscription = sequelize.define("Subscriptions", {
        membershipType: {
            type: DataTypes.STRING,
            allowNull: false
        },
        title: {
             type: DataTypes.STRING,
             allowNull: false
        },
        duration: {
            type: DataTypes.DATEONLY
         },
        currencyName: {
             type: DataTypes.STRING,
             allowNull: false
        },
        fees: {
            type: DataTypes.DOUBLE,
            defaultValue:0.0
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });

    return Subscription;
}