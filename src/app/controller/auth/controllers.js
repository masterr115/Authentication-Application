const { isEmpty } = require('../../../services/isEmpty')
const { encrypt, decrypt } = require('../../../services/CryptDecrypt')
const { findUser, createUser } = require('../../model/user')

module.exports = {

    async LoginController(req, res) {

        const { email, password } = req.body

        if (email == undefined || password == undefined) {

            res.send({ status: 502, error: true, errormessage: "Fill all the values!" })

        } else {

            const find = await findUser(email)

            if (!isEmpty(find)) {

                if (findUser.verifyEmail == '1') {

                    const findLogged = await findLogged(encrypt(email))

                    if (isEmpty(findLogged)) {

                        if (password == decrypt(find.password)) {

                            req.session.user = encrypt(email)

                            await axios.post(`https://discordapp.com/api/channels/${process.env.CHANNEL_DISCORD_ID}/messages`, {

                                headers: {

                                    Authorization: `Bot ${process.env.BOT_TOKEN}`

                                },

                                embed: {

                                    title: "New login",
                                    description: `The user ${email} logged in!`,
                                    color: 1360864

                                }

                            })

                            res.send({ status: 200, error: false, message: "Logged in successfully!" })

                        } else {

                            res.send({ status: 403, error: true, errormessage: "Password not match!" })

                        }

                    } else {

                        res.send({ status: 502, error: true, errormessage: "You're already logged in!" })

                    }

                } else {

                    res.send({ status: 403, error: true, errormessage: "You need to verify your email before logging!" })

                }


            } else {

                res.send({ status: 502, error: true, errormessage: "This email not exists!" })

            }

        }

    },

    async RegisterController(req, res) {

        const { name, email, password } = req.body

        if (password.match(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$/)) {

            const find = await findUser(email)

            if (isEmpty(find)) {

                await createUser({ name, email, password, verifyEmail: '0' })

                res.send({ status: 200, error: false, message: "Account created successfully!" })

            } else {

                res.send({ status: 502, error: true, errormessage: "This email is already registered!" })

            }

        } else {

            res.send({ status: 502, error: true, errormessage: "Password being at least 8 characters long, having a capital letter and a symbol." })

        }

    }

}