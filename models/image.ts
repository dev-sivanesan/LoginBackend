import { DataTypes } from 'sequelize';
import db from '../config/db';

const Image = db.define('Image', {
  
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false}

});


export default Image;
