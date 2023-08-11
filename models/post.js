const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model{}

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        user: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_id: {
            references: {
                model: 'user',
                key: 'id'
            }
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        sequelize,
        modelName: 'post'
    }
)

module.exports = Post