import React from "react";
import { Box, Container, Stack } from "@mui/material";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import { CssVarsProvider } from "@mui/joy/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import StarIcon from "@mui/icons-material/Star";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrievePopularBooks } from "./selector";
import { Book } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";
import { CartItem } from "../../../lib/types/search";

// Animation keyframes
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0px); }
`;

// Styled components
const PopularBooksContainer = styled(Box)`
  width: 100%;
  padding: 80px 0;
  background: linear-gradient(to bottom, #f9f9ff 0%, #ffffff 100%);
  position: relative;
`;

const SectionTitle = styled(Typography)`
  font-family: "Playfair Display", serif;
  font-weight: 700;
  font-size: 2.5rem;
  color: #2d3436;
  margin-bottom: 1rem;
  text-align: center;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background: linear-gradient(90deg, #6c5ce7, #00cec9);
    border-radius: 3px;
  }
`;

const SectionSubtitle = styled(Typography)`
  font-family: "Roboto", sans-serif;
  font-size: 1.1rem;
  color: #636e72;
  text-align: center;
  max-width: 700px;
  margin: 0 auto 40px;
`;

const BookCard = styled(Card)<{ delay: string }>`
  border: none;
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.5s ease forwards;
  opacity: 1;
  width: 100%;
  max-width: 300px;
  border-radius: 12px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  animation-delay: ${(props) => props.delay};

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
    animation: ${float} 2s ease infinite;
  }
`;

const BookImageContainer = styled(AspectRatio)`
  border-radius: 8px 8px 0 0;
  overflow: hidden;

  img {
    transition: transform 0.5s ease;
    object-fit: cover;
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

const BookInfo = styled(Box)`
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const BookTitle = styled(Typography)`
  font-family: "Roboto Slab", serif;
  font-weight: 600;
  color: #2d3436;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 8px;
  line-height: 1.3;
`;

const BookAuthor = styled(Typography)`
  font-family: "Roboto", sans-serif;
  font-size: 0.9rem;
  color: #636e72;
  margin-bottom: 12px;
`;

const BookMeta = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
`;

const RatingContainer = styled(Box)`
  display: flex;
  align-items: center;
  color: #fdcb6e;

  svg {
    margin-right: 4px;
  }
`;

const ViewCount = styled(Box)`
  display: flex;
  align-items: center;
  color: #636e72;
  font-size: 0.85rem;

  svg {
    margin-right: 4px;
    color: #74b9ff;
  }
`;

const PriceBadge = styled(Box)`
  background: linear-gradient(135deg, #6c5ce7, #00cec9);
  color: white;
  padding: 6px 12px;
  border-radius: 16px;
  font-weight: 600;
  font-size: 0.95rem;
`;

const BestsellerBadge = styled(Box)`
  position: absolute;
  top: 12px;
  right: 12px;
  background: #e84393;
  color: white;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  z-index: 1;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

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

const NoBooksMessage = styled(Box)`
  font-family: "Roboto", sans-serif;
  font-size: 1.2rem;
  color: #b2bec3;
  text-align: center;
  padding: 3rem;
  border: 1px dashed #dfe6e9;
  border-radius: 12px;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

// REDUX SELECTOR
const PopularBooksRetriever = createSelector(
  retrievePopularBooks,
  (popularBooks) => ({ popularBooks })
);

interface PopularBooksProps {
  onWishAdd: (item: CartItem) => void;
}

export default function PopularBooks(props: PopularBooksProps) {
  const { onWishAdd } = props;
  const { popularBooks } = useSelector(PopularBooksRetriever);

  return (
    <PopularBooksContainer>
      <Container maxWidth="lg">
        <Stack alignItems="center" spacing={2}>
          <SectionTitle level="h2">Popular Books</SectionTitle>
          <SectionSubtitle level="body-md">
            Discover our most loved books that readers can't stop talking about
          </SectionSubtitle>

          <Stack
            direction="row"
            flexWrap="wrap"
            justifyContent="center"
            gap={2}
            sx={{ width: "100%" }}
          >
            <CssVarsProvider>
              {popularBooks.length > 0 ? (
                popularBooks.map((book: Book, index: number) => {
                  const imagePath = `${serverApi}/${book.bookImages[0]}`;
                  const animationDelay = `${index * 0.1}s`;
                  const isBestseller = book.bookViews > 100;

                  return (
                    <BookCard
                      key={book._id}
                      variant="plain"
                      delay={animationDelay}
                    >
                      <CardOverflow>
                        <BookImageContainer ratio="0.7">
                          <img
                            src={imagePath}
                            alt={book.bookTitle}
                            loading="lazy"
                          />
                          {isBestseller && (
                            <BestsellerBadge>Bestseller</BestsellerBadge>
                          )}
                          <WishlistButton
                            onClick={(e) => {
                              onWishAdd({
                                _id: book._id,
                                quantity: 1,
                                name: book.bookTitle,
                                price: book.bookPrice,
                                image: book.bookImages[0],
                                description: book.bookDescription,
                              });
                              e.stopPropagation();
                            }}
                          >
                            <FavoriteBorderIcon fontSize="small" />
                          </WishlistButton>
                        </BookImageContainer>
                      </CardOverflow>

                      <BookInfo>
                        <BookTitle level="h3">{book.bookTitle}</BookTitle>
                        <BookAuthor level="body-sm">
                          By {book.bookAuthor || "Anonymous"}
                        </BookAuthor>

                        <BookMeta>
                          <Box>
                            <RatingContainer>
                              <StarIcon fontSize="small" />
                              <Typography level="body-sm">4.8</Typography>
                            </RatingContainer>
                            <ViewCount>
                              <VisibilityIcon fontSize="small" />
                              <Typography level="body-sm">
                                {book.bookViews}
                              </Typography>
                            </ViewCount>
                          </Box>
                          <PriceBadge>${book.bookPrice.toFixed(2)}</PriceBadge>
                        </BookMeta>
                      </BookInfo>
                    </BookCard>
                  );
                })
              ) : (
                <NoBooksMessage>
                  Currently no popular books available. Check back soon!
                </NoBooksMessage>
              )}
            </CssVarsProvider>
          </Stack>
        </Stack>
      </Container>
    </PopularBooksContainer>
  );
}
