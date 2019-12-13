const express = require('express');
const _ = require('underscore');
const app = express();

const Producto = require('../models/producto');

app.get('/producto', (req, res) => {
    Producto.find({ disponible: true })
        .exec((err, productos) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            return res.status(200).json({
                ok: true,
                count: productos.length,
                productos
            })
        });
});

app.post('/producto', (req, res) => {
    let body = req.body;

    let producto = new Producto({
        nombre: body.nombre,
        precioUni: body.precioUni,
        categoria: body.categoria,
        usuario: body.usuario

    });

    producto.save((err, productDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            productDB
        });

    });

});

app.put('/producto/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'precioUni', 'categoria', 'disponible', 'usuario']);

    Producto.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, productDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            productDB
        });
    });
});
app.delete('/producto/:id', (req, res) => {
    let id = req.params.id;
    // Usuario.deleteOne({ _id: id }, (err, resp) => {
    //     if (err) {
    //         return res.status(400).json({
    //             ok: false,
    //             err
    //         });
    //     }
    //     if (resp.deletedCount === 0) {
    //         return res.status(400).json({
    //             ok: false,
    //             err: {
    //                 id,
    //                 msg: 'Usuario no encontrado'
    //             }
    //         });
    //     }
    //     return res.status(200).json({
    //         ok: true,
    //         resp
    //     });

    // });
    Producto.findByIdAndUpdate(id, { disponible: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            resp
        });
    });
});

module.exports = app;