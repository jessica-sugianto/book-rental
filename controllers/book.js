const { Book } = require('../models')

class Books {

    static list(req, res) {
        Book.findAll()
            .then(data => {
                res.send(data)
            })
            .catch(err => {
                res.send(err)
            })
    }


}

module.exports = Books;