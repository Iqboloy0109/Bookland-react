import React, { useEffect } from "react";
import Statistics from "./Statistics";
import PopularDishes from "./PopularDishes";
import NewDishes from "./NewDishes";
import Advertisement from "./Advertisement";
import ActiveUsers from "./ActiveUsers";
import Events from "./Events";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setNewBooks, setPopularBooks, setTopUsers } from "./slice";
import { Book } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import { BookGenre } from "../../../lib/enums/product.enum";
import MemberService from "../../services/MemberService";
import { Member } from "../../../lib/types/member";
import "../../../css/home.css";
import { CartItem } from "../../../lib/types/search";

// REDUX SLICE & SELECTOR
const actionDispatch = (dispatch: Dispatch) => ({
  setPopularBooks: (data: Book[]) => dispatch(setPopularBooks(data)),
  setNewBooks: (data: Book[]) => dispatch(setNewBooks(data)),
  setTopUsers: (data: Member[]) => dispatch(setTopUsers(data)),
});

interface HomePageProps {
  onWishAdd: (item: CartItem) => void;
}

export default function HomePage(props: HomePageProps) {
  const { onWishAdd } = props;
  const { setPopularBooks, setNewBooks, setTopUsers } = actionDispatch(
    useDispatch()
  );

  useEffect(() => {
    // Backend server data fetch = Data
    const product = new ProductService();
    product
      .getProducts({
        page: 1,
        limit: 4,
        order: "bookViews",
      })
      .then(({ results, total }) => {
        setPopularBooks(results);
      })
      .catch((err) => console.log(err));

    product
      .getProducts({
        page: 1,
        limit: 4,
        order: "createdAt",
      })
      .then(({ results, total }) => {
        setNewBooks(results);
      })
      .catch((err) => console.log(err));

    const member = new MemberService();
    member
      .getTopUsers()
      .then((data) => {
        setTopUsers(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={"homepage"}>
      <Statistics />
      <PopularDishes onWishAdd={onWishAdd} />
      <NewDishes onWishAdd={onWishAdd} />
      <Advertisement />
      <ActiveUsers />
      <Events />
    </div>
  );
}
