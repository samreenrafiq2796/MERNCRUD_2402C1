const export_user = require("../Collection/User")
let emailwork = require("nodemailer")
let bcy = require("bcrypt")
require("dotenv").config()

let email_information = emailwork.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSKEY
    }
})




let Home = async function (req, res) {
    res.send("Home Page")
    res.end()
}

let About = async function (req, res) {
    res.send("About Page")
    res.end()
}

let Contact = async function (req, res) {
    res.send("Contact Page")
    res.end()
}

let saveData = async function (req, res) {

    try {
        let { name, email, age, Is_Married, password } = req.body
        // Email Check
        let email_exist = await export_user.findOne({ email: email })
        if (email_exist) {
            res.status(409).json({ msg: "Email Exist" })
        }
        else {
            let hash_pswd = await bcy.hashSync(password, 12)

            let user = new export_user({
                name: name,
                email: email,
                age: age,
                Is_Married: Is_Married,
                password: hash_pswd
            })
            user.save()
            res.status(200).json({ msg: "Data Saved Successfully" })

            let email_body = {
                to: email,
                from: process.env.EMAIL,
                subject: "Registered Successfully",
                html: `<p>Hello ${name} <br/><br/>Your Account has been created successfully.</p>`
            }

            email_information.sendMail(email_body, function (e, i) {
                if (e) {
                    console.log(e)
                }
                else {
                    console.log("Email Sent Successfully"
                    )
                }
            })

        }

    } catch (error) {
        res.status(501).json({ msg: error.message })
    }
}

let showdata = async function (req, res) {
    try {
        let get_data = await export_user.find().
            select("-email").sort({ Record_Added_at: -1 });
        return res.status(200).json({ get_data })
    } catch (error) {
        return res.status(501).json({ msg: error })

    }

}
//1
let delete_user = async function (req, res) {
    try {
        let { id } = req.params;
        let finD_user = await export_user.findById(id)
        if (!finD_user) {
            return res.status(404).json({ msg: "User Not Found" })
        }
        else {
            await export_user.findByIdAndDelete(id)
            return res.status(200).json({ msg: "User Deleted Successfully" })
        }
    } catch (error) {
        return res.status(501).json({ msg: error })
    }
}

let update_user = async function (req, res) {
    try {
        let { name, age } = req.body
        let { id } = req.params

        let user_exist = await export_user.findById(id)

        if (!user_exist) {
            return res.status(404).json({ msg: "User Not Found" })
        }
        else {
            let updated_data = {
                name: name,
                age: age
            };

            await export_user.findByIdAndUpdate(id, updated_data)
            return res.status(200).json({ msg: "Record Updated Successfully" })
        }
    }
    catch (error) {
        return res.status(501).json({ msg: error })
    }


}

let login_user = async function (req, res) {
    try {
        let { email, password } = req.body

        let find_email = await export_user.findOne({ email: email })

        if (!find_email) {
            return res.status(404).json({ msg: "Email Not Found" })
        }

        let change_password = await bcy.compare(password, find_email.password)

        if (!change_password) {
            return res.status(400).json({ msg: "Invalid Password" })

        }
        return res.status(200).json(
            {
                msg: "Login Successfully",
                user: {
                    id: find_email._id,
                    name: find_email.name
                }
            })


    } catch (error) {
        return res.status(501).json({ msg: error })
    }
}



module.exports = { Home, About, Contact, saveData, showdata, delete_user, update_user, login_user }