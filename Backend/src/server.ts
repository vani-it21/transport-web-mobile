
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes"; 
import transportRoutes from "./routes/transportRoutes";
import UpdatesRoutes from "./routes/UpdatesRoutes";
import express, { Application } from 'express';

import bodyParser from 'body-parser';
import path from "path";

dotenv.config();

const app: Application = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173", // Web (Vite)
      "http://localhost:3000", // Web (React)
      "http://localhost" ,
      "http://10.10.182.192",  
      "http://10.0.2.2",  
    ],
    credentials: true,
  })
);

// ✅ Security Headers (For Web)
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  res.setHeader("Cross-Origin-Embedder-Policy", "credentialless");
  next();
});

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", authRoutes);
app.use('/api', transportRoutes);
app.use('/api', UpdatesRoutes);
const imagePath = path.join(__dirname, "../");
console.log("Serving images from:", imagePath); 

app.use("/images", express.static(imagePath));


app.listen(5000, "0.0.0.0", () => {
  console.log("Server running on port 5000");
});