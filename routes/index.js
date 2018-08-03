var express = require('express');
var router = express.Router();

const { query, validationResult} = require ('express-validator/check');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'NODEPOP' });
});

/**
 * Ejemplo de ruta 
 */
router.get('/apiv1', function(req, res, next){
  //en un middleware podemos responder:
  res.send('Prueba');
  res.render('anuncios', { title: 'Anuncios' });
  //o llamar a next;
  // console.log('llamada a un middleware');
  next(new Error('no permitido'));
});

router.get('/paramenrutaopt/:dato?', (req, res, next) => {
  const dato = req.params.dato;
  res.send('ok, recibido dato opcional: ' + dato);
});

router.get('/params/:id([0-9]+)/piso/:piso/puerta/:puerta', (req, res, next) => {
  const id = req.params.id;
  console.log(req.params);
  res.send('ok, recibido id: ' + id);
});

router.get('/enquerystring', [ // validations
  query('talla').isNumeric().withMessage('debe ser numérico'),
  //query('color').isNumeric().withMessage('debe ser numérico')
], (req, res, next) => {
  // http://localhost:3000/enquerystring/?color=rojo&talla=M
  console.log(req.query);
  validationResult(req).throw(); // pasa los errores de validación a next(err)

  // si la ejecución llega aquí, es que todos los parámetros son validos
  res.send('ok');
});

router.post('/enelbody', (req, res, next) => {
  console.log('req.body', req.body);
  res.send('ok');
});

module.exports = router;
