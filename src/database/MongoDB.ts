import { connect, connection } from "mongoose";
const MONGODB_DATABASE = "megaelixir?retryWrites=true&w=majority";

export default async (): Promise<void> => {
    if (process.env.MONGODB_USER)
        await connect(`mongodb+srv://${process.env.MONGODB_USER}/${MONGODB_DATABASE}`, {
            //autoIndex: process.env.NODE_ENV === "development",
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
            .then(() => console.log("Conexión establecida con MongoDB."))
            .catch((error: Error) => console.error("ERROR CONEXIÓN MongoDB:", error));

    connection.on("error", console.error.bind(console, "[MongoDB] Error de conexión:"));
};
