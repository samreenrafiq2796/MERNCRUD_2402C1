let exp = require("express")
const { Home, About, Contact, saveData, showdata, delete_user, update_user,login_user, foreget_password } = require("../Function/Controller")
let route = exp.Router()

route.get("", Home);
route.get("/ab", About);
route.get("/con", Contact);
route.post("/go", saveData)
route.get("/lao",showdata)
route.delete("/lao/:id",delete_user);
route.put("/lao/:id",update_user);
route.post("/log", login_user)
route.post("/forgot", foreget_password)



module.exports = route