import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log("Conexão feita com sucesso");
    } catch (error) {
        console.error("Erro ao tentar se conectar", error);
        process.exit(1)
    }
}