import React from "react";
import {
  Box,
  Button,
  Stack,
  IconButton,
  Menu,
  Typography,
} from "@mui/material";
import { Cancel, DeleteForever, ShoppingCart } from "@mui/icons-material";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";
import { Messages, serverApi } from "../../../lib/config";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { useGlobals } from "../../hooks/useGlobals";
import OrderService from "../../services/OrderService";
import { RippleBadge } from "../../MaterialTheme/styled";

interface BasketProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;
}

export default function Basket(props: BasketProps) {
  const { cartItems, onAdd, onRemove, onDelete, onDeleteAll } = props;
  const { authMember, setOrderBuilder } = useGlobals();
  const history = useHistory();

  const itemPrice = cartItems.reduce((a, c) => a + c.quantity * c.price, 0);
  const shippingCost = itemPrice < 100 ? 5 : 0;
  const totalPrice = (itemPrice + shippingCost).toFixed(2);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const proceedOrderHandler = async () => {
    try {
      handleClose();
      if (!authMember) throw new Error(Messages.error2);

      const order = new OrderService();
      await order.createOrder(cartItems);

      onDeleteAll();
      setOrderBuilder(new Date());
      history.push("/orders");
    } catch (err) {
      sweetErrorHandling(err).then();
    }
  };

  return (
    <Box>
      <IconButton
        aria-label="cart"
        onClick={handleClick}
        sx={{
          color: "white",
          "&:hover": {
            transform: "scale(1.1)",
            color: "#f5f5f5",
          },
          transition: "all 0.2s",
        }}
      >
        <RippleBadge badgeContent={cartItems.length} color="primary">
          <ShoppingCart sx={{ fontSize: 28 }} />
        </RippleBadge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: 380,
            maxHeight: 500,
            borderRadius: "12px",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
            p: 1,
          },
        }}
      >
        <Stack spacing={1} sx={{ p: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              pb: 1,
              borderBottom: "1px solid #eee",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: "#2e7d32", // Green color for book store
                fontFamily: "'Merriweather', serif",
              }}
            >
              Your Book Cart
            </Typography>
            {cartItems.length > 0 && (
              <IconButton
                onClick={onDeleteAll}
                sx={{ color: "#d32f2f" }} // Red color for delete
              >
                <DeleteForever />
              </IconButton>
            )}
          </Box>

          {cartItems.length === 0 ? (
            <Typography
              sx={{
                py: 3,
                textAlign: "center",
                color: "text.secondary",
              }}
            >
              Your cart is empty
            </Typography>
          ) : (
            <>
              <Box
                sx={{
                  maxHeight: 300,
                  overflowY: "auto",
                  pr: 1,
                  "&::-webkit-scrollbar": {
                    width: 6,
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#ccc",
                    borderRadius: 3,
                  },
                }}
              >
                {cartItems.map((item) => (
                  <Box
                    key={item._id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      py: 2,
                      position: "relative",
                      borderBottom: "1px solid #f5f5f5",
                    }}
                  >
                    <Box
                      component="img"
                      src={`${serverApi}/${item.image}`}
                      sx={{
                        width: 50,
                        height: 70,
                        objectFit: "cover",
                        borderRadius: "4px",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                      }}
                      alt={item.name}
                    />

                    <Box sx={{ flexGrow: 1 }}>
                      <Typography
                        sx={{
                          fontWeight: 500,
                          fontSize: "0.95rem",
                          lineHeight: 1.3,
                        }}
                      >
                        {item.name}
                      </Typography>
                      <Typography
                        sx={{
                          color: "#2e7d32",
                          fontWeight: 600,
                          fontSize: "0.9rem",
                          mt: 0.5,
                        }}
                      >
                        ${item.price.toFixed(2)}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                      }}
                    >
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => onRemove(item)}
                        sx={{
                          minWidth: 30,
                          p: 0,
                          borderColor: "#ddd",
                          color: "#2e7d32",
                          "&:hover": {
                            backgroundColor: "#e8f5e9",
                          },
                        }}
                      >
                        -
                      </Button>
                      <Typography
                        sx={{
                          minWidth: 24,
                          textAlign: "center",
                          fontSize: "0.9rem",
                        }}
                      >
                        {item.quantity}
                      </Typography>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => onAdd(item)}
                        sx={{
                          minWidth: 30,
                          p: 0,
                          borderColor: "#ddd",
                          color: "#2e7d32",
                          "&:hover": {
                            backgroundColor: "#e8f5e9",
                          },
                        }}
                      >
                        +
                      </Button>
                      <IconButton
                        size="small"
                        onClick={() => onDelete(item)}
                        sx={{
                          ml: 0.5,
                          color: "#757575",
                          "&:hover": {
                            color: "#d32f2f",
                          },
                        }}
                      >
                        <Cancel fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                ))}
              </Box>

              <Box sx={{ pt: 1 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography>Subtotal:</Typography>
                  <Typography>${itemPrice.toFixed(2)}</Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Typography>Shipping:</Typography>
                  <Typography
                    sx={{
                      color: shippingCost > 0 ? "inherit" : "#2e7d32", // Green for free shipping
                    }}
                  >
                    {shippingCost > 0 ? `$${shippingCost.toFixed(2)}` : "FREE"}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                    fontWeight: 600,
                    fontSize: "1.05rem",
                  }}
                >
                  <Typography>Total:</Typography>
                  <Typography>${totalPrice}</Typography>
                </Box>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={proceedOrderHandler}
                  startIcon={<ShoppingCart />}
                  sx={{
                    py: 1.5,
                    fontWeight: 600,
                    letterSpacing: 0.5,
                    backgroundColor: "#2e7d32", // Green button
                    "&:hover": {
                      backgroundColor: "#1b5e20", // Darker green on hover
                    },
                  }}
                >
                  Proceed to Checkout
                </Button>
              </Box>
            </>
          )}
        </Stack>
      </Menu>
    </Box>
  );
}
