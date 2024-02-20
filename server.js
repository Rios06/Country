import express from 'express';
import mongoose from 'mongoose';
import countryRoute from './src/routes/countryRoutes.js'; 
import cors from 'cors'; 

const app = express();
const port =  3000;

app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:3000", "https://country-theta-two.vercel.app"]
}));


app.use(express.json());
app.use("/country", countryRoute);

app.get("/", (req, res) => {
    res.send("Welcome to my API");
});

mongoose
    .connect("mongodb+srv://Paises:4910247Jr@cluster0.5ocwqrw.mongodb.net/")
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((error) => console.error(error));

app.listen(port, () => console.log("Server listening to", port));
