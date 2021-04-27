require('dotenv').config()
const { isEmpty } = require('../../../services/isEmpty')
const { encrypt, decrypt } = require('../../../services/CryptDecrypt')
const { findUser, createUser } = require('../../model/user')
const axios = require('axios')

const BASEAPI = "https://discord.com/api/v7"

module.exports = {

    async LoginController(req, res) {

        // Get the body of POST request
        const { email, password } = req.body

        // Pre-Verify if values is undefined or null
        if (email == undefined || password == undefined) {

            // Return BadRequest status
            res.status(400).send({ status: 400, error: true, errormessage: "Fill all the values!" })

        } else {

            // Search the Member in database
            const findMember = await findUser(email)

            // Check if user exists
            if (!isEmpty(findMember)) {

                // Search if user is LoggedIn
                const findLogged = await findLogged(encrypt(email))

                // Check if user is LoggedIn
                if (isEmpty(findLogged)) {

                    // Check passwords
                    if (password == decrypt(find.password)) {

                        // Set the session for the member
                        req.session.user = encrypt(email)

                        // Send a message to Discord using the AXIOS with POST.
                        let headers = {
                            headers: {
                                Authorization: `Bot ${process.env.BOT_TOKEN}`
                            }
                        }

                        let body = {

                            embed: {
                                title: "New login",
                                description: 'The user `' + email + '` logged in!',
                                color: 65280,
                                timestamp: new Date().toISOString(),
                                footer: {
                                    text: process.env.BOT_TOKEN,
                                }
                            }
                        }

                        await axios.post(`https://discordapp.com/api/channels/${process.env.CHANNEL_DISCORD_ID}/messages`, body, headers)

                        // Return OK status
                        res.status(200).send({ status: 200, error: false, message: "Logged in successfully!" })

                    } else {

                        // Return Forbbiden status
                        res.status(403).send({ status: 403, error: true, errormessage: "Password not match!" })

                    }

                } else {

                    // Return Forbbiden status
                    res.status(401).send({ status: 401, error: true, errormessage: "You're already logged in!" })

                }



            } else {

                // Return NotFound status
                res.status(404).send({ status: 404, error: true, errormessage: "This email not exists!" })

            }

        }

    },

    async RegisterController(req, res) {

        // Get the body of POST request 
        const { name, email, password } = req.body

        // Check if the password being at least 8 characters long, having a capital letter and a symbol.
        if (password.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/)) {

            // Seach for existing user
            const findMember = await findUser(email)

            // Check if not exists the user mentioned
            if (isEmpty(findMember)) {

                // Send a message to Discord using the AXIOS with POST.
                let headers = {
                    headers: {
                        "Authorization": `Bot ` + process.env.BOT_TOKEN,
                        "Content-Type": "application/json"
                    }
                }

                let body = {
                    embed: {
                        title: 'New register',
                        description: 'The user `' + email + '` has been registered!',
                        color: 16733952,
                        timestamp: new Date().toISOString(),
                        footer: {
                            text: process.env.APP_NAME,
                        }
                    }
                }

                await axios.post(`${BASEAPI}/channels/${process.env.CHANNEL_DISCORD_ID}/messages`, body, headers)

                // Create user in database
                await createUser({ name, email, password })

                // Return created status
                res.status(201).send({ status: 201, error: false, message: "Account created successfully! Check your email for more instructions." })

            } else {

                // Return forbbiden status
                res.status(403).send({ status: 403, error: true, errormessage: "This email is already registered!" })

            }

        } else {

            // Return Not-Acceptable status
            res.status(406).send({ status: 406, error: true, errormessage: "Password being at least 8 characters long, having a capital letter and a symbol." })

        }

    }

}