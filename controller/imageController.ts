import { Request, Response } from 'express';
import Image from '../models/image';
import sequelize from 'sequelize';
const getImage = async (req: Request, res: Response) => {
  try {
    const data = await Image.findAll({
      order: sequelize.literal('rand()'),
      limit: 3
  });
  const url = data;
  return res.json({ url });
   
  } catch (error) {
    return res.json({ message: "error fetching images", status: false });
  }
}
export { getImage };
