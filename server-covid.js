const express = require("express")
const https = require('https')
const http = require('http')
const fs = require('fs');
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
 const ResultatsRouter=require("./routes/ResultatsTestsRouter")
 
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
 app.use("/resultats",ResultatsRouter)
const port = 8000;

const isHttps = false
if(isHttps) {
          var options = {
                    key: fs.readFileSync('/var/www/html/api/https/privkey.pem'),
                    cert: fs.readFileSync('/var/www/html/api/https/cert.pem')
          };
          https.createServer(options, app).listen(port, async () => {
                    console.log("server is running on port: " + port);
          });
} else {
          http.createServer(app).listen(port, async () => {
                    console.log("server is running on port: " + port);
          });
}