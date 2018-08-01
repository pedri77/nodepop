'use strict'

const mongoose = require('mongoose');

// definimos nuestro esquema de anuncio
const anuncioSchema = mongoose.Schema({
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: [String]
});

// creamos un método estático
anuncioSchema.statics.listar = function(filtro, limit, skip, fields, sort) {
    const query = Anuncio.find(filtro);
    query.limit(limit);
    query.skip(skip);
    query.select(fields);
    query.sort(sort);
    return query.exec();
  }

// creamos el modelo con ese esquema
const Anuncio = mongoose.model('Anuncio', anuncioSchema);

// lo exportamos
module.exports = Anuncio;