'use strict';

const express = require('express');
const router = express.Router();
var createError = require('http-errors');

const Anuncio = require('../../models/Anuncios');
const multer = require('../../lib/upload');

/**
 * GET /
 * Retorna una lista de Anuncios
 */
router.get('/', async (req, res, next) => {
  try {

    // recuperar datos de entrada
    const nombre = req.query.nombre;
    const venta = req.query.venta;
    const limit = parseInt(req.query.limit);
    const skip = parseInt(req.query.skip);
    const fields = req.query.fields;
    const sort = req.query.sort;

    // crear el filtro vacio
    const filtro = {};

    if (nombre) {
      filtro.nombre = nombre;
    }

    if (venta) {
      filtro.venta = venta;
    }

    const anuncios = await Anuncio.listar(filtro, limit, skip, fields, sort);
    // si await falla, lanza una excepción --> throw new Exception()
    res.json({ success: true, result: anuncios });
  } catch (err) {
    next(err);
  }  
});

/**
 * GET /:id
 * Retorna un anuncio
 */
router.get('/:id', async (req, res, next) => {
  try {
    const _id = req.params.id;

    const anuncio = await Anuncio.findById(_id).exec();

    if (!anuncio) {
      next(createError(404));
      return;
    }

    res.json({ success: true, result: anuncio });

  } catch (err) {
    next(err);
  }
})

/**
 * POST /
 * Crea un anuncio en la colección
 */
router.post('/', async (req, res, next) => {
  try {
    const datosAnuncio = req.body;

    // crear un anuncio en memoria
    const anuncio = new Anuncio(datosAnuncio);

    // guardarlo en la base de datos
    const anuncioGuardado = await anuncio.save();

    res.json({ success: true, result: anuncioGuardado });

  } catch (err) {
    next(err);
  }
});

/**
 * DELETE /:id
 * Elimina un anuncio
 */
router.delete('/:id', async (req, res, next) => {
  try {
    const _id = req.params.id;

    await Anuncio.remove({ _id: _id }).exec();

    res.json({ success: true });

  } catch (err) {
    next(err);
  }
});

/**
 * PUT /:id
 * Actualiza un anuncio
 */
router.put('/:id', async (req, res, next) => {
  try {
    const _id = req.params.id;
    const datosAnuncio = req.body;

    // usamos { new: true } para que retorne el anuncio actualizado
    const anuncioActualizado = await Anuncio.findByIdAndUpdate(_id, datosAnuncio, { new: true }).exec();
    res.json({ success: true, result: anuncioActualizado });

  } catch (err) {
    next(err);
  }
});

module.exports = router;