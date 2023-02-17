import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {User} from "../models/User.js";
import { v4 as uuidv4 } from "uuid";

//register user

export const register = async (req, res) => {
    try {
        const {
            email,
            name,
            surname,
            password,
            avatar,
            location,
            occupation
        } = req.body;

        const userId = uuidv4();
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            userId,
            email,
            name,
            surname,
            password: passwordHash,
            avatar,
            location,
            occupation,
            viewedCount: Math.floor(Math.random() * 1000),
            impressions : Math.floor(Math.random() * 1000),
        });
        const savedUser = await newUser.save()
        res.status(201).json(savedUser);
    
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
}