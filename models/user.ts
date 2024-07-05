import db from "../config/db";
import { DataTypes} from "sequelize";

const User = db.define("user", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dateOfBirth: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    profileImageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    role :{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "user",
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    token:{
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
    }
},{
    timestamps: true
})

export default User;