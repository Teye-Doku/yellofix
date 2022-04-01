module.exports = (sequelize,DataTypes) => {
     const Opt = sequelize.define("opts", {
          number: {
              type: DataTypes.STRING,
              allowNull: false
          },
          opt: {
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
          createdAt: {
              type: DataTypes.DATE,
              defaultValue: Date.now,
              index: {expires: 300}
          }
     }); 
     return Opt;
}