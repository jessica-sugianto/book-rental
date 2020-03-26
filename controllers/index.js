class index {
    static index(req, res) {
        res.render('home.ejs', {
            err: req.query.err
        })
    }
}

module.exports = index