import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/types/screen";

const selectHomePage = (state: AppRootState) => state.homePage;

export const retrievePopularBooks = createSelector(
  selectHomePage,
  (HomePage) => HomePage.popularBooks
);

export const retrieveNewBooks = createSelector(
  selectHomePage,
  (HomePage) => HomePage.newBooks
);

export const retrieveTopUsers = createSelector(
  selectHomePage,
  (HomePage) => HomePage.topUsers
);
