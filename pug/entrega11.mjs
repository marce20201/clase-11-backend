
import express from 'express';
import path from 'path';
import { Productos } from './productos.mjs';

const app = express();
const router = express.Router();
const port = 8080;
const __dirname = path.resolve();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, '/public')));

app.use('/', express.static(path.resolve() + '/public'));

app.use('/api', router);

// se setea el motor de plantilla a utilizar
app.set('view engine', 'pug');
// directorio de archivos de plantilla
app.set('views', './views');
const memory = new Productos();

app.get('/', (req, res) => {
  res.render('form.pug');
});

app.get('/productos/vista', (req, res) => {
  const productsArray = memory.getProducts();
  res.render('view.pug', { productos: productsArray });
});

router.get('/productos/listar', (req, res) => {
  const resultado = memory.getProducts();
  if (resultado.length > 0) {
    res.status(200).send(JSON.stringify(resultado));
  } else {
    res.status(422).send({ error: 'ERROR! NO HAY PRODUCTOS CARGADOS' });
  }
});

router.get('/productos/listar/:id', (req, res) => {
  const { id } = req.params;
  const resultado = memory.getProductById(id);
  console.log(resultado);
  if (resultado) {
    res.status(200).send(JSON.stringify(resultado));
  } else {
    res.status(400).send({ error: 'ERROR! NO HAY PRODUCTOS CARGADOS' });
  }
});

router.post('/productos/guardar', (req, res) => {
  const producto = req.body;
  if (producto.price && producto.title && producto.thumbnail) {
    memory.addProduct(producto);
    res.status(200).send(producto);
    // res.render('view.pug');
  } else {
    res.status(400).send({ error: 'Informacion incompleta' });
  }
});
//ENTREGA 9
//ROUTE

router.put('/productos/actualizar/:id', (req, res) => {
  const { id } = req.params;

  const newProduct = {
    title: req.body.title,
    price: req.body.price,
    thumbnail: req.body.thumbnail,
    id: Number(id),
  };

  if (newProduct.price && newProduct.title && newProduct.thumbnail) {
    const cocinado = memory.updateProduct(newProduct, id);
    res.status(200).send(JSON.stringify(cocinado));
  } else {
    res.status(400).send({ error: 'ERROR!' });
  }
});

router.delete('/productos/borrar/:id', (req, res) => {
  const { id } = req.params;
  const resultado = memory.getProductById(id);
  if (resultado) {
    res.status(200).send(JSON.stringify(memory.deleteProduct(id)));
  } else {
    res.status(400).send({ error: 'ERROR! NO SE ENCUENTRA EL ID' });
  }
});

app.listen(port, () => {
  console.log(`SERVER CORRIENDO EN EL PUERTO ${port}`);
});
