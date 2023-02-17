import { sequelize } from "../db/index.js";
import { DataTypes } from "sequelize";

export const User = sequelize.define("user", {
  userId: { type: DataTypes.STRING, primaryKey: true },
  email: { type: DataTypes.STRING },
  name: { type: DataTypes.STRING },
  surname: { type: DataTypes.STRING },
  password: { type: DataTypes.STRING },
  avatar: { type: DataTypes.STRING },
  friendsList: { type: DataTypes.JSONB },
  location: { type: DataTypes.STRING },
  occupation: { type: DataTypes.STRING },
  viewedCount: { type: DataTypes.INTEGER },
  impressions: { type: DataTypes.INTEGER },
});
