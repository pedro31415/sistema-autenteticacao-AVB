import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Token não fornecido!" });
    }

    const token = header.split(" ")[1]

    if (!token) {
        return res.status(401).json({ message: "Acesso negado"});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        (req as any).user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token inválido" });
    }
};