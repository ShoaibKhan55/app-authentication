"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const allRoutes_1 = require("./routes/allRoutes");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    next();
});
app.use("/api", allRoutes_1.router);
// app.get("/", (req: Request, res: Response) => {
//   res.send("Express + TypeScript Server");
// });
// app.post("/register", async (request, response) => {
//   try {
//     const { password, email, first_name } = request.body;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = new Users({
//       first_name,
//       email,
//       password: hashedPassword,
//     });
//     const userSaved = await user.save();
//     response.status(201).send({
//       message: "User Created Successfully",
//       userSaved,
//     });
//   } catch (error: any) {
//     response.status(500).send({
//       message: "Password was not hashed successfully",
//       error,
//     });
//   }
// });
// app.post("/login", (request, response) => {
//   try {
//     Users.findOne({
//       email: request.body.email,
//     }).then((user: any) => {
//       bcrypt
//         .compare(request.body.password, user.password)
//         .then((passwordCheck: any) => {
//           if (!passwordCheck) {
//             return response.status(400).send({
//               message: "Passwords does not match",
//             });
//           }
//           const token = jwt.sign(
//             {
//               userId: user._id,
//               userEmail: user.email,
//             },
//             "RANDOM-TOKEN",
//             { expiresIn: "24h" }
//           );
//           response.status(200).send({
//             message: "Login Successful",
//             email: user.email,
//             token,
//           });
//           const newToken = token;
//           console.log(
//             "🚀 ~ file: index.ts:84 ~ response.status ~ token:",
//             newToken
//           );
//         })
//         .catch((error: any) => {
//           response.status(400).send({
//             message: "Passwords does not match",
//             error,
//           });
//         });
//     });
//   } catch (e: any) {
//     response.status(404).send({
//       message: "Email not found",
//       e,
//     });
//   }
// });
// const verifyToken = (req: any, res: any, next: any) => {
//   try {
//     const token = req.get("authorization");
//     if (!token) {
//       return res.sendStatus(401);
//     }
//     const verified = jwt.verify(token, "RANDOM-TOKEN");
//     req.body.user = verified;
//     next();
//   } catch (error) {
//     res.status(400).send({
//       massage: "not verified",
//       error,
//     });
//   }
// };
// app.get("/protected", verifyToken, (request, response) => {
//   response.json({ message: "This is a protected route" });
// });
// MONGO SETUP
const port = process.env.PORT || 8080;
const MONGO_URL = String(process.env.MONGO_URL);
mongoose.set("strictQuery", true);
mongoose
    .connect(MONGO_URL)
    .then(() => {
    /** running server */
    app.listen(port, () => console.log(`⚡️[server]: Server is running at http://localhost:${port}`));
})
    .catch((error) => console.log(`${error} did not connect`));
