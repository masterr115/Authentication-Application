module.exports = {

    async RenderLogin(req, res) {

        // Render the login page
        return res.render('pages/auth/login')

    },

    async RenderRegister(req, res) {

        // Render the register page
        return res.render('pages/auth/register')

    },

    async RenderLogout(req, res) {

        // Render the logout page
        return res.redirect('/')

    }

}