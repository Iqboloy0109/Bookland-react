import {
  Box,
  Button,
  Container,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Typography,
  Slide,
  Grow,
  styled,
  keyframes,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import Basket from "./Basket";
import { CartItem } from "../../../lib/types/search";
import { useGlobals } from "../../hooks/useGlobals";
import { serverApi } from "../../../lib/config";
import {
  Logout,
  Home,
  ShoppingCart,
  Help,
  Person,
  MenuBook,
  FavoriteBorder,
} from "@mui/icons-material";

const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0px); }
`;

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  textDecoration: "none",
  color: theme.palette.common.white,
  padding: "8px 12px",
  borderRadius: "4px",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    transform: "translateY(-2px)",
  },
  "&.active": {
    position: "relative",
    "&:after": {
      content: '""',
      position: "absolute",
      width: "100%",
      height: "2px",
      bottom: "-4px",
      left: 0,
      background: "linear-gradient(90deg, #3f51b5, #2196f3)",
    },
  },
}));

interface OtherNavbarProps {
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

export default function OtherNavbar(props: OtherNavbarProps) {
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

  return (
    <div className="other-navbar">
      <Container className="navbar-container">
        <Stack className="menu">
          <Grow in={true} timeout={800}>
            <Box>
              <NavLink to="/">
                <img
                  className="brand-logo"
                  src="/icons/bookstore-logo.png"
                  alt="Burak Text"
                />
              </NavLink>
            </Box>
          </Grow>

          <Stack className="links">
            <Slide direction="down" in={true} timeout={500}>
              <Box>
                <StyledNavLink to="/">
                  <Home sx={{ mr: 1, fontSize: "1.2rem" }} />
                  <Typography variant="body1">Home</Typography>
                </StyledNavLink>
              </Box>
            </Slide>

            <Slide direction="down" in={true} timeout={600}>
              <Box>
                <StyledNavLink to="/products" activeClassName="active">
                  <MenuBook sx={{ mr: 1 }} />
                  <Typography variant="body1">Books</Typography>
                </StyledNavLink>
              </Box>
            </Slide>

            {authMember && (
              <Slide direction="down" in={true} timeout={700}>
                <Box>
                  <StyledNavLink to="/orders" activeClassName="active">
                    <ShoppingCart sx={{ mr: 1, fontSize: "1.2rem" }} />
                    <Typography variant="body1">Orders</Typography>
                  </StyledNavLink>
                </Box>
              </Slide>
            )}

            {authMember && (
              <Slide direction="down" in={true} timeout={800}>
                <Box>
                  <StyledNavLink to="/member-page" activeClassName="active">
                    <Person sx={{ mr: 1, fontSize: "1.2rem" }} />
                    <Typography variant="body1">My Page</Typography>
                  </StyledNavLink>
                </Box>
              </Slide>
            )}

            <Slide direction="down" in={true} timeout={900}>
              <Box>
                <StyledNavLink to="/help" activeClassName="active">
                  <Help sx={{ mr: 1, fontSize: "1.2rem" }} />
                  <Typography variant="body1">Help</Typography>
                </StyledNavLink>
              </Box>
            </Slide>

            <Slide direction="down" in={true} timeout={1100}>
              <Box className={"hover-line"}>
                <StyledNavLink to="/wishlist" activeClassName={"underline"}>
                  <FavoriteBorder sx={{ mr: 1 }} />{" "}
                  {/* Heart icon for wishlist */}
                  Wishlist
                </StyledNavLink>
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
              <Slide direction="down" in={true} timeout={1000}>
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
              <Slide direction="down" in={true} timeout={1000}>
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
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.1)",
                    animation: `${floatAnimation} 2s ease-in-out infinite`,
                  },
                }}
              >
                <ListItemIcon>
                  <Logout fontSize="small" style={{ color: "white" }} />
                </ListItemIcon>
                <Typography variant="body1">Logout</Typography>
              </MenuItem>
            </Menu>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
