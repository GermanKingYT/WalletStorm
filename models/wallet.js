module.exports = (sequelize, DataTypes) => {
    const app = this;
    
    var Wallet = sequelize.define('Wallet', {
        CoinId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        balance: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: 0.00000000
        }
    });
    
    return Wallet;
};