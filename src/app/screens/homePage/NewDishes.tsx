import React from "react";
import { Box, Container, Stack } from "@mui/material";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import { CssVarsProvider } from "@mui/joy/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StarIcon from "@mui/icons-material/Star";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveNewBooks } from "./selector";
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
const AnimatedCard = styled(Card)<{ delay: string }>`
  border: none;
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.5s ease forwards;
  opacity: 1;
  height: 100%;
  width: 280px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  animation-delay: ${(props) => props.delay};

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    animation: ${float} 2s ease infinite;
  }
`;

const SectionTitle = styled(Typography)`
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-size: 2.2rem;
  color: #1a1a1a;
  margin-bottom: 1.5rem;
  text-align: center;
  position: relative;
  display: inline-block;

  &::before {
    content: "";
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, #3f51b5, #2196f3);
    border-radius: 3px;
  }
`;

const BookImageContainer = styled(AspectRatio)`
  border-radius: 12px 12px 0 0;
  overflow: hidden;

  img {
    transition: transform 0.5s ease;
    object-fit: cover;
  }

  &:hover img {
    transform: scale(1.08);
  }
`;

const BookInfo = styled(Box)`
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const BookTitle = styled(Typography)`
  font-family: "Roboto Slab", serif;
  font-weight: 600;
  color: #2d3436;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 0.5rem;
  line-height: 1.3;
`;

const BookAuthor = styled(Typography)`
  font-family: "Roboto", sans-serif;
  font-size: 0.9rem;
  color: #636e72;
  margin-bottom: 0.75rem;
`;

const PriceContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
`;

const PriceBadge = styled(Box)`
  background: linear-gradient(135deg, #3f51b5, #2196f3);
  color: white;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.95rem;
`;

const MetaInfo = styled(Box)`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 0.5rem;
`;

const MetaItem = styled(Box)`
  display: flex;
  align-items: center;
  color: #636e72;
  font-size: 0.85rem;

  svg {
    margin-right: 0.25rem;
    font-size: 1rem;
    color: #fdcb6e;
  }
`;

const StatusBadge = styled(Box)<{ status: string }>`
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  z-index: 1;
  background: ${(props) =>
    props.status === "NEW"
      ? "#00b894"
      : props.status === "BESTSELLER"
      ? "#e84393"
      : "#6c5ce7"};
  color: white;
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

const NoDataMessage = styled(Box)`
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
const NewBooksRetriever = createSelector(retrieveNewBooks, (newBooks) => ({
  newBooks,
}));

interface NewBooksProps {
  onWishAdd: (item: CartItem) => void;
}

export default function NewBooks(props: NewBooksProps) {
  const { onWishAdd } = props;
  const { newBooks } = useSelector(NewBooksRetriever);

  return (
    <Box
      sx={{
        width: "100%",
        py: 10,
        backgroundColor: "#f9f9f9",
        position: "relative",
      }}
    >
      <Container maxWidth="lg">
        <Stack alignItems="center" spacing={4}>
          <SectionTitle level="h2">New Arrivals</SectionTitle>
          <Typography
            level="body-md"
            sx={{
              color: "#636e72",
              maxWidth: "600px",
              textAlign: "center",
              mb: 2,
            }}
          >
            Discover our latest collection of books from talented authors around
            the world
          </Typography>

          <Stack
            direction="row"
            flexWrap="wrap"
            justifyContent="center"
            gap={4}
            sx={{ width: "100%" }}
          >
            <CssVarsProvider>
              {newBooks.length > 0 ? (
                newBooks.map((book: Book, index: number) => {
                  const imagePath = `${serverApi}/${book.bookImages[0]}`;
                  const animationDelay = `${index * 0.1}s`;
                  const isBestseller = book.bookViews > 1000;

                  return (
                    <AnimatedCard
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
                          <StatusBadge
                            status={isBestseller ? "BESTSELLER" : "NEW"}
                          >
                            {isBestseller ? "Bestseller" : "New"}
                          </StatusBadge>
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
                          {book.bookAuthor || "Anonymous"}
                        </BookAuthor>

                        <MetaInfo>
                          {book.bookGenre && (
                            <MetaItem>
                              <Typography level="body-xs">
                                {book.bookGenre}
                              </Typography>
                            </MetaItem>
                          )}
                          {book.bookPages && (
                            <MetaItem>
                              <Typography level="body-xs">
                                {book.bookPages} pages
                              </Typography>
                            </MetaItem>
                          )}
                        </MetaInfo>

                        <PriceContainer>
                          <PriceBadge>${book.bookPrice.toFixed(2)}</PriceBadge>
                          <MetaItem>
                            <StarIcon fontSize="small" />
                            <Typography level="body-sm">4.8</Typography>
                            <VisibilityIcon fontSize="small" sx={{ ml: 1 }} />
                            <Typography level="body-sm">
                              {book.bookViews}
                            </Typography>
                          </MetaItem>
                        </PriceContainer>
                      </BookInfo>
                    </AnimatedCard>
                  );
                })
              ) : (
                <NoDataMessage>
                  We're currently updating our collection. Check back soon for
                  new arrivals!
                </NoDataMessage>
              )}
            </CssVarsProvider>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
