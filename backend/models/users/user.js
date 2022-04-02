

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("Users",{
      cellNumber:{
          type:DataTypes.STRING,
          allowNull:false
      },
      photo: {
        type:DataTypes.STRING
      },
      firstName: {
           type: DataTypes.STRING,
           allowNull:false
      },
      lastName: {
          type:DataTypes.STRING,
          allowNull:false
      },
      email: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      }
  });

  return User;
}