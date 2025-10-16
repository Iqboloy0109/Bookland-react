import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Typography,
  Grow,
  Slide,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import Basket from "./Basket";
import { CartItem } from "../../../lib/types/search";
import { useGlobals } from "../../hooks/useGlobals";
import { serverApi } from "../../../lib/config";
import {
  Logout,
  MenuBook,
  Home,
  Help,
  Person,
  ShoppingCart,
} from "@mui/icons-material";
import { keyframes } from "@emotion/react";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import { RippleBadge } from "../../MaterialTheme/styled";
import WishlistPage from "../../screens/wishListPage";

interface HomeNavbarProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;
  setSignupOpen: (isOpen: boolean) => void;
  setLoginOpen: (isOpen: boolean) => void;
  handleLogoutClick: (e: React.MouseEvent<HTMLElement>) => void;
  anchorEl: HTMLElement | null;
  handleCloseLogout: () => void;
  handleLogoutRequest: () => void;
}

const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
`;

const textGlow = keyframes`
  0% { text-shadow: 0 0 5px rgba(255,255,255,0.3); }
  50% { text-shadow: 0 0 20px rgba(255,255,255,0.8); }
  100% { text-shadow: 0 0 5px rgba(255,255,255,0.3); }
`;

export default function HomeNavbar(props: HomeNavbarProps) {
  const {
    cartItems,
    onAdd,
    onRemove,
    onDelete,
    onDeleteAll,
    setSignupOpen,
    setLoginOpen,
    handleLogoutClick,
    handleCloseLogout,
    anchorEl,
    handleLogoutRequest,
  } = props;

  const { authMember } = useGlobals();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`home-navbar ${scrolled ? "scrolled" : ""}`}>
      <Container className="navbar-container">
        <Stack className="menu">
          <Grow in={true} timeout={1000}>
            <Box>
              <NavLink to="/">
                <img
                  className="brand-logo"
                  src="/icons/bookstore-logo.png"
                  alt="Book Haven"
                />
              </NavLink>
            </Box>
          </Grow>

          <Stack className="links">
            <Slide direction="down" in={true} timeout={500}>
              <Box className={"hover-line"}>
                <NavLink to="/" activeClassName={"underline"}>
                  <Home sx={{ mr: 1 }} />
                  Home
                </NavLink>
              </Box>
            </Slide>

            <Slide direction="down" in={true} timeout={700}>
              <Box className={"hover-line"}>
                <NavLink to="/products" activeClassName={"underline"}>
                  <MenuBook sx={{ mr: 1 }} />
                  Books
                </NavLink>
              </Box>
            </Slide>

            {/* {authMember && (
              <Slide direction="down" in={true} timeout={900}>
                <Box className={"hover-line"}>
                  <NavLink to="/orders" activeClassName={"underline"}>
                    <ShoppingCart sx={{ mr: 1 }} />
                    Orders
                  </NavLink>
                </Box>
              </Slide>
            )} */}

            {authMember && (
              <Slide direction="down" in={true} timeout={1100}>
                <Box className={"hover-line"}>
                  <NavLink to="/member-page" activeClassName={"underline"}>
                    <Person sx={{ mr: 1 }} />
                    My Page
                  </NavLink>
                </Box>
              </Slide>
            )}

            <Slide direction="down" in={true} timeout={1300}>
              <Box className={"hover-line"}>
                <NavLink to="/help" activeClassName={"underline"}>
                  <Help sx={{ mr: 1 }} />
                  Help
                </NavLink>
              </Box>
            </Slide>

            <Slide direction="down" in={true} timeout={1100}>
              <Box className={"hover-line"}>
                <NavLink to="/wishlist" activeClassName={"underline"}>
                  <FavoriteBorder sx={{ mr: 1 }} /> Wishlist
                </NavLink>
              </Box>
            </Slide>

            <Basket
              cartItems={cartItems}
              onAdd={onAdd}
              onRemove={onRemove}
              onDelete={onDelete}
              onDeleteAll={onDeleteAll}
            />

            {!authMember ? (
              <Slide direction="down" in={true} timeout={1500}>
                <Box>
                  <Button
                    variant="contained"
                    className="login-button"
                    onClick={() => setLoginOpen(true)}
                    sx={{
                      background:
                        "linear-gradient(45deg, #3f51b5 30%, #2196f3 90%)",
                      boxShadow: "0 3px 5px 2px rgba(33, 150, 243, .3)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.05)",
                        boxShadow: "0 5px 8px 3px rgba(33, 150, 243, .4)",
                      },
                    }}
                  >
                    Login
                  </Button>
                </Box>
              </Slide>
            ) : (
              <Slide direction="down" in={true} timeout={1500}>
                <img
                  className="user-avatar"
                  src={
                    authMember?.memberImage
                      ? `${serverApi}/${authMember?.memberImage}`
                      : "/icons/default-user.svg"
                  }
                  aria-haspopup={"true"}
                  onClick={handleLogoutClick}
                />
              </Slide>
            )}

            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={Boolean(anchorEl)}
              onClose={handleCloseLogout}
              onClick={handleCloseLogout}
              PaperProps={{
                elevation: 6,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  background: "rgba(25, 118, 210, 0.9)",
                  backdropFilter: "blur(10px)",
                  color: "white",
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem
                onClick={handleLogoutRequest}
                sx={{ "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" } }}
              >
                <ListItemIcon>
                  <Logout fontSize="small" style={{ color: "white" }} />
                </ListItemIcon>
                <Typography variant="body1">Logout</Typography>
              </MenuItem>
            </Menu>
          </Stack>
        </Stack>

        <Stack className="header-frame">
          <Stack className="detail">
            <Grow in={true} timeout={1000}>
              <Typography variant="h1" className="head-main-txt">
                Discover Your Next{" "}
                <span className="highlight">Favorite Book</span>
              </Typography>
            </Grow>

            <Slide direction="right" in={true} timeout={1200}>
              <Typography variant="h4" className="wel-txt">
                Where Stories Come to Life
              </Typography>
            </Slide>

            <Slide direction="right" in={true} timeout={1400}>
              <Typography variant="subtitle1" className="service-txt">
                Curated collection for every reader
              </Typography>
            </Slide>

            {!authMember && (
              <Slide direction="up" in={true} timeout={1600}>
                <Box className="signup">
                  <Button
                    variant="contained"
                    className="signup-button"
                    onClick={() => setSignupOpen(true)}
                    sx={{
                      padding: "12px 36px",
                      fontSize: "1.1rem",
                      background:
                        "linear-gradient(45deg, #ff6b6b 30%, #ff8e53 90%)",
                      boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.05)",
                        boxShadow: "0 5px 8px 3px rgba(255, 105, 135, .4)",
                      },
                    }}
                  >
                    JOIN OUR READERS
                  </Button>
                </Box>
              </Slide>
            )}
          </Stack>

          <Box className="logo-frame">
            <div className="logo-img" />
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
