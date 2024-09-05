export interface CartResponse {
  status: string;
  message: string;
  numOfCartItems: number;
  cartId: string;
  data: Cart;
}

export interface Cart {
  _id: string;
  cartOwner: string;
  products: Product[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  totalCartPrice: number;
}

export interface Product {
  count: number;
  _id: string;
  product: string;
  price: number;
}