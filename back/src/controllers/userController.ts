import { Request, Response } from "express";
import { User } from "../models/User";

export const getProfile = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;

        const user = await User.findById(userId).select("-password");

        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        return res.json(user);
    } catch (error) {
        return res.status(500).json({ message: "Erro interno" });
    }
};