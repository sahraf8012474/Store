import type { Product, ProductsResponse } from '../types';

const BASE_URL = 'https://dummyjson.com/products';

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(`${BASE_URL}?limit=0`); // Fetch all or a sensible limit
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  const data: ProductsResponse = await response.json();
  return data.products;
}

export async function fetchProductById(id: string | number): Promise<Product> {
  const response = await fetch(`${BASE_URL}/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch product ${id}`);
  }
  const data: Product = await response.json();
  return data;
}

export async function fetchCategories(): Promise<string[]> {
  const response = await fetch(`${BASE_URL}/categories`);
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  const data = await response.json();
  if (data.length > 0 && typeof data[0] === 'object') {
    return data.map((c: any) => c.slug || c.name);
  }
  return data;
}
