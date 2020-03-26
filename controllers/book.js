const { Book, User } = require('../models')
const { Op } = require("sequelize");
const Auth = require("../controllers/auth")

const multer = require('multer');
const path = require('path')
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({
    storage: storage
}).single('bookImage');


class Books {

    static list(req, res) {
        console.log(req.session.role)
        Book.findAll({ order: [["title", 'ASC']] })
            .then(data => {
                if (req.query.success) res.render('book.ejs', { data: data, success: req.query.success })
                else res.render('book.ejs', { data: data, success: null })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static uploadForm(req, res) {
        let bookId = req.params.id
        Book.findByPk(bookId)
            .then(data => {
                res.render('uploadBook.ejs', { data: data })
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
                Book.update({ pathImage: pathImage },
                    {
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

    static view(req, res) {
        let bookId = req.params.id
        Book.findByPk(bookId)
            .then(data => {
                res.render('viewBook.ejs', { data: data })
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

    static rent(req, res) {
        let dataBook = null
        Book.findByPk(req.params.id)
            .then(data => {
                dataBook = data
                let stock = dataBook.stock - 1
                let id = req.params.id
                return Book.update({
                    stock: stock
                }, {
                    where: {
                        id: id
                    }
                })
            })
            .then(data1 => {
                res.redirect('/book?success=' + 'Successfully rent')
            })
            .catch(err => {
                console.log(err)
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