import query from './db.service';
import { Product } from '../models/products.models';

export const getAll = async () => {
  const products = await query('SELECT * FROM Products', []);
  return products;
};

export const getOne = async (id: Product['id']) => {
  const [product] = await query('SELECT * FROM Products WHERE id = ?', [id]);
  if (!product) {
    throw new Error('Product not found');
  }
  return product;
};

export const create = async (product: Product) => {
  const newProduct = await query(
    'INSERT INTO Products SET name=?, price=?, UserID=?',
    [product.name, product.price, product.UserID],
  );
  return newProduct;
};

export const update = async (id: Product['id'], product: Product) => {
  const updatedProduct = await query(
    'UPDATE Products SET name=?, price=? WHERE id = ?',
    [product.name, product.price, id],
  );
  if (updatedProduct.affectedRows === 0) {
    throw new Error('Product not found');
  }
  return updatedProduct;
};

export const remove = async (id: Product['id']) => {
  const deletedProduct = await query('DELETE FROM Products WHERE id = ?', [id]);
  if (deletedProduct.affectedRows === 0) {
    throw new Error('Product not found');
  }
  return deletedProduct;
};

export const getAllByUserId = async (id: Product['UserID']) => {
  const product = await query('SELECT * FROM Products WHERE UserID = ?', [id]);
  if (product.length === 0) {
    throw new Error('User not found');
  }
  return product;
};
