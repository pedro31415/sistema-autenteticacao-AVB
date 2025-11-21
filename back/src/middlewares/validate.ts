import { NextFunction, Request, Response } from "express";
import { ZodError, ZodType } from "zod";


 
export const validate = 
(schema: ZodType) => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse({
            body: req.body,
            params: req.params,
            query: req.query,
        });

        next();
    } catch(error) {
        if (error instanceof ZodError) {
            const formattedErros = error.issues.map((issue) => {
                const fieldName = issue.path.length > 1 ? issue.path.slice(1).join('.') : issue.path.join('.');

                return {
                    path: fieldName, 
                    message: issue.message,
                };
            });

            return res.status(400).json({ errors: formattedErros });
        }

        return res.status(500).json({ message: "Internal server error" });
    }
};