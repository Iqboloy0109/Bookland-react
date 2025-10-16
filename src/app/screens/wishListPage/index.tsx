import {
  Container,
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Button,
  Box,
} from "@mui/material";
import Grid from "@material-ui/core/Grid";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { CartItem } from "../../../lib/types/search";
import { serverApi } from "../../../lib/config";

interface WishlistPageProps {
  onAdd: (item: CartItem) => void;
  wishlistItems: CartItem[];
  onWishAdd: (item: CartItem) => void;
  onWishDelete: (item: CartItem) => void;
  onWishDeleteAll: () => void;
}

export default function WishlistPage(props: WishlistPageProps) {
  const { wishlistItems, onWishAdd, onWishDelete, onWishDeleteAll, onAdd } =
    props;

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Your Wishlist
        </Typography>
        {wishlistItems.length > 0 && (
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={onWishDeleteAll}
          >
            Clear All
          </Button>
        )}
      </Box>

      {wishlistItems.length === 0 ? (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="300px"
          textAlign="center"
        >
          <FavoriteIcon color="disabled" sx={{ fontSize: 80, mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            Your wishlist is empty
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Save your favorite items here for later
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {wishlistItems.map((item) => (
            <Grid item key={item._id} xs={12} sm={6} md={4} lg={3}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={`${serverApi}/${item.image}`}
                  alt={item.name}
                  sx={{
                    objectFit: "contain",
                    p: 1,
                    backgroundColor: "#f5f5f5",
                  }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="div" noWrap>
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {item.description}
                  </Typography>
                  <Typography variant="h6" color="primary" mt={1}>
                    ${item.price}
                  </Typography>
                </CardContent>
                <Box display="flex" justifyContent="space-between" p={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => onAdd(item)}
                  >
                    Add to Cart
                  </Button>
                  <IconButton
                    aria-label="remove from wishlist"
                    color="error"
                    onClick={() => onWishDelete(item)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
