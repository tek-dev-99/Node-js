const db = require('../Config/db.js');

const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize(
    db.database,
    db.user,
    db.password,{
        host: db.host,
        dialect: db.dialect,
        pool: {
            max:db.pool.max,
            min:db.pool.min,
            acquire:db.pool.acquire,
            idle:db.pool.idle,
        }
    }
);

sequelize.authenticate()
.then(()=>{
    console.log('connected')
})
.catch((err)=>{
    console.log('Error'+err)
})

const dbConfig = {}
dbConfig.Sequelize = Sequelize
dbConfig.sequelize = sequelize

dbConfig.products = require('./product.js')(sequelize,DataTypes)
dbConfig.users = require('./user.js')(sequelize,DataTypes)


dbConfig.sequelize.sync({force:false})
.then(()=>{
    console.log('sync done!')
})

module.exports = dbConfig;