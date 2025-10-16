import { ChangeEvent, useEffect, useState } from "react";
import {
  Box,
  Button,
  Stack,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  TextField,
  Slider,
  Pagination,
  PaginationItem,
  SelectChangeEvent,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import Badge from "@mui/material/Badge";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ClearIcon from "@mui/icons-material/Clear";
import "../../../css/products.css";

import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import {
  Book,
  BookInquiry,
  BookFormat,
  BookGenre,
  BookCondition,
} from "../../../lib/types/product";
import { setProducts } from "./slice";
import { retrieveProducts } from "./selector";
import ProductService from "../../services/ProductService";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";
import styled from "@emotion/styled";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

// Redux actions
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Book[]) => dispatch(setProducts(data)),
});

// Selector
const ProductsRetriever = createSelector(retrieveProducts, (products) => ({
  products,
}));

interface ProductsProps {
  onAdd: (item: CartItem) => void;
  onWishAdd: (item: CartItem) => void;
}

const WishlistButton = styled(Box)`
  position: absolute;
  top: 12px;
  left: 12px;
  background: rgba(255, 255, 255, 0.9);
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 1;

  &:hover {
    background: #ff7675;
    color: white;
    transform: scale(1.1);
  }
`;

export default function Products(props: ProductsProps) {
  const { onAdd, onWishAdd } = props;
  const { setProducts } = actionDispatch(useDispatch());
  const { products } = useSelector(ProductsRetriever);

  const initialSearchState: BookInquiry = {
    order: "createdAt",
    page: 1,
    limit: 6,
    bookGenre: undefined,
    bookCondition: undefined,
    search: "",
    minPrice: 0,
    maxPrice: 100,
    bookFormat: undefined,
  };

  const [productSearch, setProductSearch] =
    useState<BookInquiry>(initialSearchState);
  const [searchText, setSearchText] = useState<string>("");
  const [totalPages, setTotalPages] = useState<number>(1);
  const history = useHistory();

  useEffect(() => {
    const productService = new ProductService();
    productService
      .getProducts(productSearch)
      .then(({ results, total }) => {
        console.log("Received products from backend:", results);
        setProducts(results);
        setTotalPages(Math.ceil(total / productSearch.limit));
      })
      .catch((err) => console.log(err));
  }, [productSearch]);

  const searchProductHandler = () => {
    setProductSearch({
      ...productSearch,
      page: 1,
      search: searchText,
    });
  };

  const paginationHandler = (e: ChangeEvent<unknown>, value: number) => {
    setProductSearch({
      ...productSearch,
      page: value,
    });
  };

  const chooseBookHandler = (id: string) => {
    history.push(`/products/${id}`);
  };

  const handleSortChange = (e: SelectChangeEvent) => {
    setProductSearch({
      ...productSearch,
      order: e.target.value,
      page: 1,
    });
  };

  const handlePriceChange = (e: Event, newValue: number | number[]) => {
    const [min, max] = newValue as number[];
    setProductSearch({
      ...productSearch,
      minPrice: min,
      maxPrice: max,
      page: 1,
    });
  };

  const handleFormatChange = (e: SelectChangeEvent) => {
    setProductSearch({
      ...productSearch,
      bookFormat: e.target.value as BookFormat,
      page: 1,
    });
  };

  const handleConditionChange = (e: SelectChangeEvent) => {
    setProductSearch({
      ...productSearch,
      bookCondition: e.target.value as BookCondition,
      page: 1,
    });
  };

  const handleGenreChange = (e: SelectChangeEvent) => {
    setProductSearch({
      ...productSearch,
      bookGenre: e.target.value as BookGenre,
      page: 1,
    });
  };

  const resetFilters = () => {
    setProductSearch(initialSearchState);
    setSearchText("");
  };

  // Check if any filters are active
  const hasActiveFilters =
    productSearch.bookGenre !== undefined ||
    productSearch.bookCondition !== undefined ||
    productSearch.bookFormat !== undefined ||
    productSearch.minPrice !== 0 ||
    productSearch.maxPrice !== 100 ||
    productSearch.search !== "" ||
    productSearch.order !== "createdAt";

  return (
    <div className="products-page">
      <div className="products-container">
        {/* Left Sidebar - Filters */}
        <div className="filter-sidebar">
          <div className="filter-group">
            {/* Reset Button */}
            {hasActiveFilters && (
              <Button
                variant="outlined"
                startIcon={<ClearIcon />}
                onClick={resetFilters}
                fullWidth
                sx={{ mb: 2 }}
              >
                Reset Filters
              </Button>
            )}

            {/* Genre */}
            <FormControl size="small" className="filter-control" fullWidth>
              <InputLabel>Genre</InputLabel>
              <Select
                value={productSearch.bookGenre || ""}
                onChange={handleGenreChange}
                label="Genre"
              >
                <MenuItem value="">All Genres</MenuItem>
                {Object.values(BookGenre).map((g) => (
                  <MenuItem key={g} value={g}>
                    {g.replace(/_/g, " ")}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Format */}
            <FormControl
              size="small"
              className="filter-control"
              fullWidth
              sx={{ mt: 2 }}
            >
              <InputLabel>Format</InputLabel>
              <Select
                value={productSearch.bookFormat || ""}
                onChange={handleFormatChange}
                label="Format"
              >
                <MenuItem value="">All Formats</MenuItem>
                {Object.values(BookFormat).map((f) => (
                  <MenuItem key={f} value={f}>
                    {f}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Condition */}
            <FormControl
              size="small"
              className="filter-control"
              fullWidth
              sx={{ mt: 2 }}
            >
              <InputLabel>Condition</InputLabel>
              <Select
                value={productSearch.bookCondition || ""}
                onChange={handleConditionChange}
                label="Condition"
              >
                <MenuItem value="">All Conditions</MenuItem>
                {Object.values(BookCondition).map((c) => (
                  <MenuItem key={c} value={c}>
                    {c}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Price Slider */}
            <Box className="filter-control" sx={{ mt: 2, width: "100%" }}>
              <InputLabel>
                Price Range (${productSearch.minPrice} - $
                {productSearch.maxPrice})
              </InputLabel>
              <Slider
                value={[
                  productSearch.minPrice || 0,
                  productSearch.maxPrice || 100,
                ]}
                onChange={handlePriceChange}
                valueLabelDisplay="auto"
                min={0}
                max={100}
                valueLabelFormat={(value) => `$${value}`}
              />
            </Box>
          </div>
        </div>

        {/* Main Content */}
        <div className="product-grid-container">
          {/* Header with Search and Sort */}
          <div className="filter-header">
            <TextField
              placeholder="Search books..."
              size="small"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && searchProductHandler()}
              sx={{ width: 250 }}
              InputProps={{
                endAdornment: (
                  <Button onClick={searchProductHandler}>
                    <SearchIcon />
                  </Button>
                ),
              }}
            />

            <FormControl size="small" sx={{ minWidth: 160 }}>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={productSearch.order}
                onChange={handleSortChange}
                label="Sort By"
              >
                <MenuItem value="createdAt">Newest</MenuItem>
                <MenuItem value="bookPrice_asc">Price: Low to High</MenuItem>
                <MenuItem value="bookPrice_desc">Price: High to Low</MenuItem>
                <MenuItem value="bookViews">Popularity</MenuItem>
              </Select>
            </FormControl>
          </div>

          {/* Products Grid */}
          <div className="product-grid">
            {products.length > 0 ? (
              products.map((product: Book) => {
                const imagePath = `${serverApi}/${product.bookImages[0]}`;
                return (
                  <div
                    key={product._id.toString()}
                    className="product-card"
                    onClick={() => chooseBookHandler(product._id.toString())}
                  >
                    <div
                      className="product-img"
                      style={{ backgroundImage: `url(${imagePath})` }}
                    >
                      <WishlistButton
                        onClick={(e) => {
                          onWishAdd({
                            _id: product._id,
                            quantity: 1,
                            name: product.bookTitle,
                            price: product.bookPrice,
                            image: product.bookImages[0],
                            description: product.bookDescription,
                          });
                          e.stopPropagation();
                        }}
                      >
                        <FavoriteBorderIcon fontSize="small" />
                      </WishlistButton>
                      <Button
                        className="shop-btn"
                        onClick={(e) => {
                          onAdd({
                            _id: product._id,
                            quantity: 1,
                            name: product.bookTitle,
                            price: product.bookPrice,
                            image: product.bookImages[0],
                          });
                          e.stopPropagation();
                        }}
                      >
                        <img src="/icons/shopping-cart.svg" alt="cart" />
                      </Button>
                      <Button className="view-btn">
                        <Badge
                          badgeContent={product.bookViews}
                          color="secondary"
                        >
                          <RemoveRedEyeIcon
                            sx={{
                              color: product.bookViews === 0 ? "gray" : "white",
                            }}
                          />
                        </Badge>
                      </Button>
                    </div>
                    <div className="product-desc">
                      <span
                        className="product-title"
                        style={{ fontSize: "22px" }}
                      >
                        {product.bookTitle}
                      </span>
                      <div className="product-author">{product.bookAuthor}</div>
                      <div
                        className="product-price"
                        style={{ fontSize: "1.2rem" }}
                      >
                        <MonetizationOnIcon />${product.bookPrice}
                      </div>
                      <div className="product-format">{product.bookFormat}</div>
                    </div>
                  </div>
                );
              })
            ) : (
              <Box className="no-data">No books found</Box>
            )}
          </div>

          {/* Pagination */}
          <Stack className="pagination-section">
            <Pagination
              count={totalPages}
              page={productSearch.page}
              onChange={paginationHandler}
              renderItem={(item) => (
                <PaginationItem
                  components={{
                    previous: ArrowBackIcon,
                    next: ArrowForwardIcon,
                  }}
                  {...item}
                />
              )}
            />
          </Stack>
        </div>
      </div>
    </div>
  );
}
