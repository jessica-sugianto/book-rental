'use strict';
module.exports = (sequelize, DataTypes) => {


    const Sequelize = sequelize.Sequelize;
    const Model = Sequelize.Model;

    class User extends Model {}

    User.init({
        first_name: {
            type: Sequelize.STRING,
            validate: {
                notEmpty: {
                    msg: 'Nama depan tidak boleh kosong'
                },
                is: {
                    msg: 'Nama depan harus berupa huruf'
                }
            }
        },
        last_name: DataTypes.STRING,
        phone_number: {
            type: Sequelize.INTEGER,
            validate: {
                notEmpty: {
                    msg: 'Nomor HP tidak boleh kosong'
                },
                not: {
                    msg: 'Hanya boleh menginputkan angka'
                }
            }
        },
        birth_date: {
            type: Sequelize.DATEONLY,
            validate: {
                notEmpty: {
                    msg: 'Tanggal ulang tahun tidak boleh kosong'
                },
                isDate: {
                    msg: 'Tanggal ulang tahun harus format date'
                }
            }
        },
        address: {
            type: Sequelize.STRING,
            validate: {
                notEmpty: {
                    msg: 'Alamat tidak boleh kosong'
                },
            }
        },
        noktp: DataTypes.INTEGER,
        username: {
            type: Sequelize.STRING,
            validate: {
                notEmpty: {
                    msg: 'Username tidak boleh kosong'
                }
            }
        },
        password: {
            type: Sequelize.STRING,
            validate: {
                notEmpty: {
                    msg: 'Password tidak boleh kosong'
                }
            }
        },
        role: DataTypes.STRING
    }, {
        sequelize,
        hook: {
            beforeCreate: (model, option) => {
                if (model.last_name === '' || model.last_name === null || model.last_name === undefined) {
                    model.last_name = model.first_name
                }
            }
        }
    });

    User.associate = function(models) {
        User.belongsToMany(models.Book, { through: models.Transaction })
        User.hasMany(models.Transaction)
    };
    return User;
};