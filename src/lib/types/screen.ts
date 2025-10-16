// REACT APP STATE

import { Member } from "./member";
import { Order } from "./order";
import { Book } from "./product";

export interface AppRootState {
  homePage: HomePageState;
  productsPage: ProductsPageState;
  ordersPage: OrdersPageState;
}

// HOMEPAGE
export interface HomePageState {
  popularBooks: Book[];
  newBooks: Book[];
  topUsers: Member[];
}

// PRODUCTS PAGE
export interface ProductsPageState {
  restaurant: Member | null;
  chosenProduct: Book | null;
  products: Book[];
}

// ORDERS PAGE
export interface OrdersPageState {
  pausedOrders: Order[];
  processOrders: Order[];
  finishedOrders: Order[];
}
