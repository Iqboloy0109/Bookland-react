import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import ChosenProduct from "./ChosenProduct";
import Products from "./products";
import "../../../css/products.css";
import { CartItem } from "../../../lib/types/search";

interface ProductsPageProps {
  onAdd: (item: CartItem) => void;
  onWishAdd: (item: CartItem) => void;
}

export default function ProductsPage(props: ProductsPageProps) {
  const { onAdd, onWishAdd } = props;
  const products = useRouteMatch();
  console.log("products: ", products);
  return (
    <div className="products-page">
      <Switch>
        <Route path={`${products.path}/:productId`}>
          <ChosenProduct onAdd={onAdd} onWishAdd={onWishAdd} />
        </Route>
        <Route path={`${products.path}`}>
          <Products onAdd={onAdd} onWishAdd={onWishAdd} />
        </Route>
      </Switch>
    </div>
  );
}
