const { Book, User } = require('../models')
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
        Book.findAll({
            where: {
                [column]: {
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

    static seeCustomer(req, res) {
        let id = req.params.id
        Book.findByPk(id, { include: [{ model: User }] })
            .then((data) => {
                //res.send(data)
                res.render('seeCustomer.ejs', {
                    data: data
                })
            })
    }
}

module.exports = Books;