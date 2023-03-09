module.exports = (Sequelize,DataTypes) =>{
    const user = Sequelize.define("user",{
        name: {
            type:DataTypes.STRING,
        },
        email: {
            type:DataTypes.STRING,
            unique: true,
        },
        password: {
            type:DataTypes.STRING,
        },
      
    })

    return user;
}
