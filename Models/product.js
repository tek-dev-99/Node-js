module.exports = (Sequelize, DataTypes) =>{
    const product = Sequelize.define("product",{
        title: {
            type:DataTypes.STRING,
        },
        price: {
            type:DataTypes.INTEGER,
        },
    })

    return product;
}