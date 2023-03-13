import { Router } from 'express';
import auth from '../middlewares/auth';
import authAdminOrUser from '../middlewares/authAdminOrUser';
import {
  getAllProductsHandler,
  getProductByIdHandler,
  createProductHandler,
  updateProductHandler,
  deleteProductHandler,
  getProductsByUserIdHandler,
} from '../controllers/products.controller';

const router = Router();

router.get('/products', getAllProductsHandler); // GET all products no auth needed
router.get('/products/:id', getProductsByUserIdHandler); // get all products of a user, no auth needed
router.get('/product/:id', auth, getProductByIdHandler); // get one product by id, auth needed
router.post('/product/create', auth, createProductHandler); // create a product and link it to the auth user
router.put('/product/:id', authAdminOrUser, updateProductHandler); // update a product, only the owner or admin can update
router.delete('/product/:id', authAdminOrUser, deleteProductHandler); // delete a product, only the owner or admin can delete

export default router;
