import express from "express";
import bodyParser from "body-parser";
import { sequelize } from "./db/index.js";
import cors from "cors";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { register } from "./controllers/auth.js";

// config
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

//file storage
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage })

//routes
app.post("/auth/register", upload.single("picture"), register);
 
const start = async () => {
    try {
      await sequelize.authenticate();
      await sequelize.sync();
      app.listen(PORT, () =>
        console.log(`Server at ${PORT} port`)
      );
    } catch (error) {
      console.log(error);
    }
  };
  
  start();