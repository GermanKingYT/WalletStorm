module.exports = (sequelize, DataTypes) => {
    const app = this;
    
    var Wallet = sequelize.define('Wallet', {
        UserId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
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
    }, {
        classMethods: {
            associate () {
                Wallet.belongsTo(sequelize.models['User']);
            }
        }
    });
    
    return Wallet;
};