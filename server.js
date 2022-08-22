const express = require("express")
const cors = require("cors");
const historiqueRouter = require("./routes/historiqueRouter");
const userRouter = require("./routes/userRouter")

const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const verificationRouter = require("./routes/verificationRouter")
const TestRouter=require("./routes/TestRouter")
const echantillonRouter=require("./routes/echantillonRouter")
const resultatRouter=require("./routes/resultatRouter")
 const TypeRouter=require("./routes/TypeRouter")

const app = express();
const bindUser = require("./middleware/bindUser")

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.use(fileUpload({
  createParentPath: true
}));
app.all('*').use(bindUser)
app.use("/historique", historiqueRouter)
app.use("/users", userRouter)
app.use("/payement", verificationRouter)
app.use("/test",TestRouter)
app.use("/echantillon",echantillonRouter)
app.use("/resultat",resultatRouter)
app.use("/type",TypeRouter)
const port = process.env.PORT || 8000;

app.listen(port, async () => {
  console.log("server is running on port: "+ port);
});