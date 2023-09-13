const app = require("./application/app.js");
const config = require("./config.js");
app.listen(config.PORT, config.IP, ()=>{
    console.log(`server is runing at PORT ${config.PORT} and IP ${config.IP}`)
})