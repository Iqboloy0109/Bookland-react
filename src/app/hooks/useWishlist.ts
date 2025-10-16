import { useState } from "react";
import { CartItem } from "../../lib/types/search";

const useWishlist = () => {
  const wishListJson: string | null = localStorage.getItem("wishListData");
  const currentWishlist = wishListJson ? JSON.parse(wishListJson) : [];
  const [wishlistItems, setWishlistItems] =
    useState<CartItem[]>(currentWishlist);

  // HANDLERS
  const onWishAdd = (input: CartItem) => {
    const exist: any = wishlistItems.find(
      (item: CartItem) => item._id === input._id
    );
    if (exist) {
      const cartUpdate = wishlistItems.map((item: CartItem) => {
        return item._id === input._id
          ? { ...exist, quantity: exist.quantity }
          : item;
      });
      setWishlistItems(cartUpdate);
      localStorage.setItem("cartData", JSON.stringify(cartUpdate));
    } else {
      const wishlistUpdate = [...wishlistItems, { ...input }];
      setWishlistItems(wishlistUpdate);
      localStorage.setItem("wishListData", JSON.stringify(wishlistUpdate));
    }
  };

  const onWishDelete = (input: CartItem) => {
    const wishlistUpdate = wishlistItems.filter(
      (item: CartItem) => item._id !== input._id
    );
    setWishlistItems(wishlistUpdate);
    localStorage.setItem("wishListData", JSON.stringify(wishlistUpdate));
  };

  const onWishDeleteAll = () => {
    setWishlistItems([]);
    localStorage.removeItem("wishListData");
  };

  return {
    wishlistItems,
    onWishAdd,
    onWishDelete,
    onWishDeleteAll,
  };
};

export default useWishlist;
