let abc = require("express");
const route  = require("./Router/Routes");
const mydb_connection = require("./Connection");
const export_user = require("./Collection/User");
let c = require("cors")
require("dotenv").config()

let myapp = abc()

myapp.use(c())
myapp.use(abc.json())
myapp.use("/",route)

mydb_connection().then(()=>{
    myapp.listen(process.env.PORT, ()=>{
        console.log(`Server started at : http://localhost:${process.env.PORT}`)
        console.log("Database Connected")
     
    })
}).catch((E)=>{
    console.log(E)
})
