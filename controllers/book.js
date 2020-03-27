const { Book, User, Transaction } = require('../models')
const { Op } = require("sequelize");
const Auth = require("../controllers/auth")

const multer = require('multer');
const path = require('path')
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({
    storage: storage
}).single('bookImage');


class Books {

    static list(req, res) {
        Book.findAll({
                order: [
                    ["title", 'ASC']
                ]
            })
            .then(data => {
                if (req.query.success) res.render('book.ejs', { data: data, success: req.query.success, role: req.session.role })
                else res.render('book.ejs', { data: data, success: null, role: req.session.role })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static uploadForm(req, res) {
        let bookId = req.params.id
        Book.findByPk(bookId)
            .then(data => {
                res.render('uploadBook.ejs', {
                    data: data,
                    session: req.session.role
                })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static uploadData(req, res) {
        upload(req, res, (err) => {
            if (err) res.send(err)
            else {
                let pathImage = `uploads/${req.file.filename}`
                Book.update({ pathImage: pathImage }, {
                        where: {
                            id: req.params.id
                        }
                    })
                    .then(data => {
                        res.redirect('/book?success=' + 'Successfully add image')
                    })
                    .catch(err => {
                        res.send(err)
                    })
            }
        })
    }

    static create(req, res) {
        res.render('addBook.ejs', {
            err: req.query.err,
            session: req.session.role
        })
    }

    static add(req, res) {
        Book.create({
                title: req.body.title,
                author: req.body.author,
                year: req.body.year,
                stock: req.body.stock,
                readyStock: req.body.stock,
                harga: req.body.harga
            })
            .then(data => {
                res.redirect('/book?success=' + 'Successfully added data')
            })
            .catch(err => {
                console.log(err)
                res.redirect('/book/add?err=' + err.errors[0].message)
            })
    }

    static view(req, res) {
        let bookId = req.params.id
        Book.findByPk(bookId)
            .then(data => {
                res.render('viewBook.ejs', {
                    data: data,
                    session: req.session.role
                })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static edit(req, res) {
        let bookId = req.params.id
        Book.findByPk(bookId)
            .then(data => {
                res.render('editBook.ejs', {
                    data: data,
                    session: req.session.role
                })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static editData(req, res) {
        Book.update(req.body, {
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

    static rentForm(req, res) {
        let bookId = req.params.id
        res.render('rentForm.ejs', {
            id: bookId,
            session: req.session.role
        })

    }

    static rent(req, res) {
        let id = req.params.id
        let dataBook = null
        Book.findByPk(req.params.id)
            .then(data => {
                dataBook = data
                let stock = dataBook.readyStock - 1

                return Book.update({
                    readyStock: stock
                }, {
                    where: {
                        id: id
                    }
                })
            })
            .then(data2 => {
                Transaction.create({
                    UserId: req.session.UserId,
                    BookId: id,
                    borrow_date: new Date(),
                    duration: req.body.duration,
                    total_price: 0
                })
            })
            .then(data1 => {
                res.redirect('/book/seeCustomer/' + id)
            })
            .catch(err => {
                console.log(err)
                res.send(err)
            })
    }

    static
    return (req, res) {
        let id = req.params.id
        let dataBook = null

        Transaction.findAll({ where: { UserId: req.session.UserId } })
            .then(data => {
                if (data.length > 0) {
                    return Book.findByPk(req.params.id)
                } else {
                    res.redirect('/book')
                }
            })
            .then(data => {
                dataBook = data

                let stock = dataBook.readyStock + 1

                return Book.update({
                    readyStock: stock
                }, {
                    where: {
                        id: id
                    }
                })
            })
            .then(data2 => {
                return Transaction.destroy({
                    where: {
                        [Op.and]: [
                            { UserId: req.session.UserId },
                            { BookId: id }
                        ]
                    }
                })
            })
            .then(data1 => {
                res.redirect('/book')
            })
            .catch(err => {
                console.log(err)
                res.send(err)
            })
    }

    static search(req, res) {
        let column = `${req.query.searchBy}`
        if (column == 'year') {
            Book.findAll({
                    where: {
                        [column]: {
                            [Op.eq]: `${req.query.searchData}`
                        }
                    }
                })
                .then(data => {
                    res.render('book.ejs', { data: data, success: null, role: req.session.role })
                })
                .catch(err => {
                    res.send(err)
                })
        } else {
            Book.findAll({
                    where: {
                        [column]: {
                            [Op.iLike]: `%${req.query.searchData}%`
                        }
                    }
                })
                .then(data => {
                    res.render('book.ejs', { data: data, success: null, role: req.session.role })
                })
                .catch(err => {
                    res.send(err)
                })
        }
    }

    static seeCustomer(req, res) {
        let id = req.params.id
        Book.findByPk(id, { include: [{ model: User }] })
            .then((data) => {
                //res.send(data)
                res.render('seeCustomer.ejs', {
                    data: data,
                    session: req.session.role
                })
            })
    }
}

module.exports = Books;