import express, { Request, Response, NextFunction } from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", async (req, res) => {
  res.send("Hello Welcome to Backend Skeleton Code of Zomato like platform!");
});

app.use(
  "/",
  (err: ErrorEvent, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json("Oops, Something Bad Happened!");
    console.log(err);
  }
);

app.listen(3001, () => {
  console.log("Hello from Port 3001! 🙋🏻‍♂️");
});
