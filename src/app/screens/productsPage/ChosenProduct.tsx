import React, { useEffect, useState } from "react";
import {
  Container,
  Stack,
  Box,
  Chip,
  IconButton,
  Collapse,
  Typography,
  Button,
} from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Rating from "@mui/material/Rating";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { Book } from "../../../lib/types/product";
import { setChosenProduct, setRestaurant } from "./slice";
import { retrieveChosenProduct, retrieveRestaurant } from "./selector";
import { Member } from "../../../lib/types/member";
import { useParams, useHistory } from "react-router-dom";
import ProductService from "../../services/ProductService";
import MemberService from "../../services/MemberService";
import { serverApi } from "../../../lib/config";
import { CartItem } from "../../../lib/types/search";
import { motion } from "framer-motion";

// REDUX SLICE & SELECTOR
const actionDispatch = (dispatch: Dispatch) => ({
  setRestaurant: (data: Member) => dispatch(setRestaurant(data)),
  setChosenProduct: (data: Book) => dispatch(setChosenProduct(data)),
});

const ChosenProductRetriever = createSelector(
  retrieveChosenProduct,
  (chosenProduct) => ({
    chosenProduct,
  })
);

const RestaurantRetriever = createSelector(
  retrieveRestaurant,
  (restaurant) => ({
    restaurant,
  })
);

interface ChosenProductProps {
  onAdd: (item: CartItem) => void;
  onWishAdd: (item: CartItem) => void;
}

export default function ChosenProduct(props: ChosenProductProps) {
  const { onAdd, onWishAdd } = props;
  const { productId } = useParams<{ productId: string }>();
  const history = useHistory();
  const { setChosenProduct, setRestaurant } = actionDispatch(useDispatch());
  const { chosenProduct } = useSelector(ChosenProductRetriever);
  const { restaurant } = useSelector(RestaurantRetriever);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    const product = new ProductService();
    product
      .getProduct(productId)
      .then((data) => setChosenProduct(data))
      .catch((err) => console.log(err));

    const member = new MemberService();
    member
      .getRestaurant()
      .then((data) => setRestaurant(data))
      .catch((err) => console.log(err));
  }, [productId]);

  if (!chosenProduct) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="chosen-product"
    >
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <IconButton
          onClick={() => history.goBack()}
          sx={{ mb: 2, color: "primary.main" }}
        >
          <ArrowBackIcon />
        </IconButton>

        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={4}
          sx={{ mb: 6 }}
        >
          {/* Simple Image Gallery */}
          <Box sx={{ width: { xs: "100%", md: "50%" } }}>
            <Box
              sx={{ mb: 2, borderRadius: 2, overflow: "hidden", boxShadow: 3 }}
            >
              <img
                src={`${serverApi}/${chosenProduct.bookImages[selectedImageIndex]}`}
                alt={chosenProduct.bookTitle}
                style={{
                  width: "100%",
                  height: "400px",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </Box>

            {/* Thumbnail selector */}
            <Box sx={{ display: "flex", gap: 2, overflowX: "auto", py: 1 }}>
              {chosenProduct.bookImages.map((image: string, index: number) => (
                <Box
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: 1,
                    overflow: "hidden",
                    cursor: "pointer",
                    border:
                      selectedImageIndex === index ? "2px solid" : "1px solid",
                    borderColor:
                      selectedImageIndex === index ? "primary.main" : "divider",
                    opacity: selectedImageIndex === index ? 1 : 0.7,
                    transition: "all 0.2s ease",
                    "&:hover": {
                      opacity: 1,
                    },
                  }}
                >
                  <img
                    src={`${serverApi}/${image}`}
                    alt={`Thumbnail ${index + 1}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              ))}
            </Box>
          </Box>

          {/* Product Info */}
          <Box sx={{ width: { xs: "100%", md: "50%" }, pl: { md: 4 } }}>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Stack spacing={3}>
                <Box>
                  <Chip
                    label={chosenProduct.bookFormat}
                    color="primary"
                    size="small"
                    sx={{ mb: 1 }}
                  />
                  <Typography
                    variant="h4"
                    component="h1"
                    sx={{ fontWeight: 700, mb: 1 }}
                  >
                    {chosenProduct.bookTitle}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    {chosenProduct.bookAuthor}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Rating
                    value={4.5}
                    precision={0.5}
                    readOnly
                    sx={{ color: "#FFD700" }}
                  />
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <RemoveRedEyeIcon sx={{ color: "text.secondary" }} />
                    <Typography variant="body2">
                      {chosenProduct.bookViews} views
                    </Typography>
                  </Box>
                </Box>

                <Box>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 700, color: "primary.main" }}
                  >
                    ${chosenProduct.bookPrice.toFixed(2)}
                  </Typography>
                  {chosenProduct.bookCondition && (
                    <Chip
                      label={`Condition: ${chosenProduct.bookCondition}`}
                      variant="outlined"
                      sx={{ mt: 1 }}
                    />
                  )}
                </Box>

                {/* Description Section */}
                <Box>
                  <Button
                    variant="outlined"
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    sx={{ mb: 1 }}
                  >
                    {showFullDescription
                      ? "Hide Description"
                      : "Show Full Description"}
                  </Button>
                  <Collapse in={showFullDescription}>
                    <Box
                      sx={{
                        p: 2,
                        bgcolor: "background.paper",
                        borderRadius: 1,
                        border: "1px solid",
                        borderColor: "divider",
                      }}
                    >
                      <Typography variant="body1" paragraph>
                        {chosenProduct.bookDescription ||
                          "No description available."}
                      </Typography>
                      <Typography
                        variant="body1"
                        paragraph
                        sx={{ fontWeight: 600 }}
                      >
                        About This Book:
                      </Typography>
                      <Typography variant="body1" paragraph>
                        This carefully selected edition comes from our premium
                        collection. Each book in our store undergoes a thorough
                        quality check to ensure it meets our high standards for
                        content and physical condition.
                      </Typography>
                      <Typography
                        variant="body1"
                        paragraph
                        sx={{ fontWeight: 600 }}
                      >
                        Our Bookstore Promise:
                      </Typography>
                      <Typography variant="body1" paragraph>
                        We specialize in providing quality books at reasonable
                        prices. Our team of bibliophiles personally selects each
                        title, ensuring you receive a book that's worth your
                        time and money.
                      </Typography>
                      <Typography
                        variant="body1"
                        paragraph
                        sx={{ fontWeight: 600 }}
                      >
                        Condition Guarantee:
                      </Typography>
                      <Typography variant="body1" paragraph>
                        We provide accurate condition reports for all our books.
                        If you're not completely satisfied with your purchase,
                        we offer a 30-day return policy with full refund.
                      </Typography>
                    </Box>
                  </Collapse>
                </Box>

                <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    onClick={(e) => {
                      onAdd({
                        _id: chosenProduct._id,
                        quantity: 1,
                        name: chosenProduct.bookTitle,
                        price: chosenProduct.bookPrice,
                        image: chosenProduct.bookImages[0],
                      });
                      e.stopPropagation();
                    }}
                    sx={{
                      py: 1.5,
                      fontWeight: 600,
                      textTransform: "none",
                    }}
                  >
                    Add to Cart
                  </Button>
                  <IconButton
                    onClick={(e) => {
                      onWishAdd({
                        _id: chosenProduct._id,
                        quantity: 1,
                        name: chosenProduct.bookTitle,
                        price: chosenProduct.bookPrice,
                        image: chosenProduct.bookImages[0],
                        description: chosenProduct.bookDescription,
                      });

                      setIsFavorite(!isFavorite);

                      e.stopPropagation();
                    }}
                    sx={{
                      border: "1px solid",
                      borderColor: "divider",
                      color: isFavorite ? "error.main" : "inherit",
                    }}
                  >
                    {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                  </IconButton>
                  <IconButton
                    sx={{
                      border: "1px solid",
                      borderColor: "divider",
                    }}
                  >
                    <ShareIcon />
                  </IconButton>
                </Box>

                {restaurant && (
                  <Box
                    sx={{
                      mt: 3,
                      p: 2,
                      bgcolor: "background.paper",
                      borderRadius: 1,
                      border: "1px solid",
                      borderColor: "divider",
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                      Seller Information
                    </Typography>
                    <Typography variant="body1">
                      {restaurant.memberNick}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Contact: {restaurant.memberPhone}
                    </Typography>
                  </Box>
                )}
              </Stack>
            </motion.div>
          </Box>
        </Stack>
      </Container>
    </motion.div>
  );
}
