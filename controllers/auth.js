const User = require('../models').User
const Pass = require('../helpers/password')

class AuthController {

    static formLogin(req, res) {
        res.render('auths/login', {
            err: req.query.err
        })
    }

    static login(req, res) {
        if (req.session.role) {
            res.redirect('/auth/login?err=Sudah ada user yang login')
        } else {
            User.findOne({
                    where: {
                        username: req.body.username
                    }
                })
                .then(user => {
                    if (user) {
                        req.session.role = user.role
                        req.session.UserId = user.id
                        if (Pass.checkPassword(req.body.password, user.password)) {
                            res.redirect('/book')
                        } else {
                            res.redirect('/auth/login?err=Password salah')
                        }
                    } else {
                        res.redirect('/auth/login?err=Username salah')
                    }
                })
                .catch(err => {
                    console.log(err)
                    res.send(err)
                })
        }
    }

    static formRegister(req, res) {
        res.render('auths/register', {
            err: req.query.err
        })
    }

    static create(req, res) {
        User.create({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                phone_number: req.body.phone_number,
                birth_date: new Date(req.body.birth_date),
                address: req.body.address,
                noktp: Number(req.body.ktp),
                username: req.body.username,
                password: Pass.hashPassword(req.body.password),
                role: 'Customer'
            })
            .then(user => {
                res.redirect('/auth/login')
            })
            .catch(err => {
                res.redirect('/auth/register?err=' + err.message)
            })
    }

    static logout(req, res) {
        req.session.destroy(err => {
            if (err) {
                console.log(err)
                res.send(err)
            } else {
                res.redirect('/auth/login')
            }
        })
    }
}

module.exports = AuthController