import {
  getAll,
  getOne,
  create,
  update,
  remove,
  getAllByUserId,
} from '../services/products.service';
import { Product } from '../models/products.models';
import { User } from '../models/users.models';
import DecodeToken from '../utils/decodeToken';

export async function getAllProductsHandler(req: any, res: any) {
  try {
    const products: Product = await getAll();
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

export async function getProductByIdHandler(req: any, res: any) {
  try {
    const { id } = req.params;
    const product = await getOne(id);
    res.json(product);
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ message: error.message, status: 404 });
    } else {
      res.status(500).json(error);
    }
  }
}

export async function createProductHandler(req: any, res: any) {
  try {
    if (
      req.body.name
      && req.body.name !== ''
      && req.body.price
      && req.body.price > 0
    ) {
      const product: Product = req.body;
      const token = req.headers.authorization.split(' ')[1];
      const user: User = await DecodeToken(token);
      product.UserID = user.id;
      await create(product);
      res.status(201).json({ message: 'Product created', status: 201 });
    } else {
      res.status(400).json({ message: 'Bad request', status: 400 });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message, status: 400 });
    } else {
      res.status(500).json(error);
    }
  }
}

export async function updateProductHandler(req: any, res: any) {
  try {
    const { id } = req.params;
    const product: Product = req.body;
    await update(id, product);
    res.json({ message: 'Product updated', status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ message: error.message, status: 404 });
    } else {
      res.status(500).json(error);
    }
  }
}

export async function deleteProductHandler(req: any, res: any) {
  try {
    const { id } = req.params;
    await remove(id);
    res.json({ message: 'Product deleted', status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ message: error.message, status: 404 });
    } else {
      res.status(500).json(error);
    }
  }
}

export async function getProductsByUserIdHandler(req: any, res: any) {
  try {
    const { id } = req.params;
    const UserID: number = Number(id);
    const products = await getAllByUserId(UserID);
    res.status(200).json({ products, status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ message: error.message, status: 404 });
    } else {
      res.status(500).json(error);
    }
  }
}
