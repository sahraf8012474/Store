import type { Product, ProductsResponse, LoginResponse } from '../types';

const BASE_URL = 'https://dummyjson.com';

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(`${BASE_URL}/products?limit=0`);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  const data: ProductsResponse = await response.json();
  return data.products;
}

export async function fetchProductById(id: string | number): Promise<Product> {
  const response = await fetch(`${BASE_URL}/products/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch product ${id}`);
  }
  const data: Product = await response.json();
  return data;
}

export async function fetchCategories(): Promise<string[]> {
  const response = await fetch(`${BASE_URL}/products/categories`);
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  const data = await response.json();
  if (data.length > 0 && typeof data[0] === 'object') {
    return data.map((c: any) => c.slug || c.name);
  }
  return data;
}

export async function login(username: string, password: string): Promise<LoginResponse> {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Login failed');
  }

  return response.json();
}

export async function signup(userData: any): Promise<any> {
  const response = await fetch(`${BASE_URL}/users/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Signup failed');
  }

  return response.json();
}
