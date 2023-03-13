import express from 'express';
import UserRoutes from './routes/users.routes';
import RegisterRoutes from './routes/register.routes';
import LoginRoutes from './routes/login.routes';
import ProductRoutes from './routes/products.routes';

require('dotenv').config();

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('API sujet_backend');
});

app.use('/', UserRoutes);
app.use('/register', RegisterRoutes);
app.use('/login', LoginRoutes);
app.use('/', ProductRoutes);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
