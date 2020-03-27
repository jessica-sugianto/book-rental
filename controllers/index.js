class index {
    static index(req, res) {
        res.render('home.ejs', {
            err: req.query.err,
            session: req.session.role
        })
    }
}

module.exports = index