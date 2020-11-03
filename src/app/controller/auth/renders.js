module.exports = {

    async RenderLogin(req, res) {

        res.render('pages/auth/login')

    },

    async RenderRegister(req, res) {

        res.render('pages/auth/register')

    },

}