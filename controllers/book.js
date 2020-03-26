const { Book } = require('../models')
const { Op } = require("sequelize");

class Books {

    static list(req, res) {
        Book.findAll({ order: [["title", 'ASC']] })
            .then(data => {
                if (req.query.success) res.render('book.ejs', { data: data, success: req.query.success })
                else res.render('book.ejs', { data: data, success: null })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static create(req, res) {
        res.render('addBook.ejs')
    }

    static add(req, res) {
        Book.create(req.body)
            .then(data => {
                res.redirect('/book?success=' + 'Successfully added data')
            })
            .catch(err => {
                res.send(err)
            })
    }

    static edit(req, res) {
        let bookId = req.params.id
        Book.findByPk(bookId)
            .then(data => {
                res.render('editBook.ejs', { data: data })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static editData(req, res) {
        Book.update(req.body,
            {
                where: {
                    id: req.params.id
                }
            })
            .then(data => {
                res.redirect('/book?success=' + 'Successfully edit data')
            })
            .catch(err => {
                res.send(err)
            })
    }

    static search(req, res) {

        let column = `${req.query.searchBy}`

        if (`${req.query.searchBy}` == 'title') {
            Book.findAll({
                where: {
                    title: {
                        [Op.iLike]: `%${req.query.searchData}%`
                    }
                }
            })
                .then(data => {
                    res.render('book.ejs', { data: data, success: null })
                })
                .catch(err => {
                    res.send(err)
                })
        } else if (`${req.query.searchBy}` == 'author') {
            Book.findAll({
                where: {
                    author: {
                        [Op.iLike]: `%${req.query.searchData}%`
                    }
                }
            })
                .then(data => {
                    res.render('book.ejs', { data: data, success: null })
                })
                .catch(err => {
                    res.send(err)
                })
        } else if (`${req.query.searchBy}` == 'year') {
            Book.findAll({
                where: {
                    year: {
                        [Op.iLike]: `%${req.query.searchData}%`
                    }
                }
            })
                .then(data => {
                    res.render('book.ejs', { data: data, success: null })
                })
                .catch(err => {
                    res.send(err)
                })
        }
    }
}

module.exports = Books;