'use strict';

require('dotenv').config();

const readline = require('readline');

const anuncios = require('./data/anuncios.json').anuncios;
const conn = require('./lib/connectMongoose');
const Anuncio = require('./models/Anuncios');

conn.once('open', async () => {
  try {
    const response = await askUser('Estas seguro que quieres borrar los contenidos de la base de datos? (no)');

    if (response.toLowerCase() !== 'yes') {
      console.log('Proceso abortado');
      process.exit();
    }

    await initAnuncios(anuncios);
    // await initUsers();
    // await initStores();
    // ...

    //conn.close();
    // workarround - la conexión no se cierra, temporalmente hago
    process.exit();

  } catch (err) {
    console.log('Hubo un error', err);
    process.exit(1);
  }
});

function askUser(question) {
  return new Promise((resolve, reject) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question(question,
      function(answer) {
        rl.close();
        resolve(answer);
      }
    );
  });
}

async function initAnuncios(anuncios) {
  // eliminar los documentos actuales
  const deleted = await Anuncio.deleteMany();
  console.log(`Eliminados ${deleted.n} anunios.`);

  // cargar los nuevos documentos
  const inserted = await Agente.insertMany(anuncios);
  console.log(`Insertados ${inserted.length} anuncios.`);
}