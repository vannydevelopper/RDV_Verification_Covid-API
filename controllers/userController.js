const userModel = require("../models/userModel");
const Validation = require("../class/Validation")
const jwt = require("jsonwebtoken")
const md5 = require("md5");

const login = async (req, res) => {
    try {
        const { USERNAME, USER_PASSWORD ,lat,long} = req.body;
        console.log(req.body)
        const validation = new Validation(
            req.body,
            {
                USERNAME: "required",
                USER_PASSWORD:
                {
                    required: true,
                },
            },
            {
                USER_PASWORD:
                {
                    required: "Mot de passe est obligatoire",

                },

            }
        );
        validation.run();
        if (!validation.isValidate()) {
            return res.status(422).json({ errors: validation.getErrors() });
        }

        var user = (await userModel.findBy("USERNAME", USERNAME))[0];
        console.log(user)
        if (user) {
            if (user.USER_PASSWORD == md5(USER_PASSWORD)) {
                const token = jwt.sign({ user: user.USER_ID }, 'fffffcccckkkkpppp', {
                    expiresIn: 3600 * 24 * 365 * 3
                })
                res.status(200).json({
                    success: true,
                    message: "vous avez été connecté avec succès",
                    token,
                    user
                });


            }
            else {
                const errors = {
                    password:  "Mot de passe  incorrect",

                };
                res.status(404).json({ errors });
            }
        }
        else {
            const errors = {
                main: "Utilisateur n'existe pas ",
            };
            res.status(404).json({ errors });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Server error");
    }
};
module.exports = {

    login,


}