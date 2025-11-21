import { Request, Response } from "express";
import { User } from "../models/User";
import bcrypt from "bcrypt"
import { generateToken } from "../utils/generateTokens";
import { LoginInput, RegisterInput } from "../schemas/authSchema";

export const register = async (
    req: Request<{}, {}, RegisterInput>,
    res: Response
) => {
    try {
        const { name, email, password} = req.body;

        const userExist = await User.findOne({ email });

        if (userExist) {
            return res.status(400).json({ message: "Email já cadastrado"});
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id.toString())
        })
    } catch (error) {
        res.status(500).json({ message: "Erro interno "});
    }
};

export const login = async (
    req: Request<{}, {}, LoginInput>,
    res: Response
) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select('+password');
        
        if (!user) {
            return res.status(400).json({ message: "Credenciais inválidas" });
        }

        const correctPassword = await bcrypt.compare(password, user.password!);

        if (!correctPassword) {
            return res.status(400).json({ message: "Credenciais inválidas" });
        }

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id.toString())
        });
    } catch (error) {
        res.status(500).json({ message: "Error interno"});
    }
};
