module.exports = (sequelize, DataTypes) => {
    var Coin = sequelize.define('Coin', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        code: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }, 
        apiEndpoint: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });
    
    return Coin;
};