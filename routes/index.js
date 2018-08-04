var express = require('express');
var router = express.Router();

const { query, body, param, validationResult} = require ('express-validator/check');
//seria lo mismo que:
// const validator = require ('express-validator');
// const query = validator.query;
// const body = validator.body;
// const body = validator.param;
// const validationResult = validator.validationResult;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'NODEPOP' });
});

/**
 * Primer requisito de apiv1 
 */
router.get('/apiv1', function(req, res, next){
  //en un middleware podemos responder:
  res.send('Primera ruta en nuestra API');
  //o llamar a next;
  // console.log('llamada a un middleware');
  next(new Error('no permitido'));
});

router.get('/anuncios/:dato?', (req, res, next) => {
  const dato = req.params.dato;
  res.send('ok, recibido dato: ' + dato);
});

router.get('/anunciosopt/:dato?', (req, res, next) => {
  const dato = req.params.dato;
  res.send('ok, recibido dato opcional: ' + dato);
});

router.get('/params/:id([5b584a573bfb042d14c969]+[a-c]+[0-9])/nombre/:nombre/venta/:true', (req, res, next) => {
  const id = req.params.id;
  console.log(req.params);
  res.send('ok, recibido id: ' + id);
});

router.get('/anuncios', [ // validations
  query('precio').isNumeric().withMessage('debe ser numérico'),
  query('color').isNumeric().withMessage('debe ser numérico')
], (req, res, next) => {
  // http://localhost:3000/anuncios/?color=rojo&talla=M
  console.log(req.query);
  validationResult(req).throw(); // pasa los errores de validación a next(err)
  // si la ejecución llega aquí, es que todos los parámetros son validos
  res.send('ok');
});


router.post('/enelbody', (req, res, next) => {
  console.log('req.body', req.body);
  res.send('Recibimos datos por POST');
});

module.exports = router;
