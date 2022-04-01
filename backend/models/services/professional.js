
module.exports = ( sequelize, DataTypes ) => {
    const Professional = sequelize.define('Professionals', {
        subcategoryId: {
           type: DataTypes.INTEGER, 
           allowNull: false
        },
        isCompany: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        isIndividual: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        freeMembershipType: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        image: {
             type:DataTypes.STRING,
             allowNull: false
        },
        subscriptionMembershipType: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        cellNumber: {
            type: DataTypes.STRING,
            allowNull: false
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
   
    return Professional;
   }