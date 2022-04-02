module.exports = (sequelize,DataTypes) => {
    const FOpt = sequelize.define("fopts", {
         emailOrPhone: {
             type: DataTypes.STRING,
             allowNull: false
         },
         opt: {
             type: DataTypes.STRING,
             allowNull: false
         },
         createdAt: {
             type: DataTypes.DATE,
             defaultValue: Date.now,
             index: {expires: 300}
         }
    }); 
    return FOpt;
}