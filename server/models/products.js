module.exports = (sequelize, DataTypes) => {
    return sequelize.define('products', {
        name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        image: {
          type: DataTypes.STRING
        },
        price: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        desc: {
            type: DataTypes.TEXT
        }
    })
  }