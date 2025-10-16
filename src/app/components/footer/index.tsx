import React from "react";
import { Box, Container, Stack, Typography, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import {
  Facebook,
  Twitter,
  Instagram,
  YouTube,
  LocationOn,
  Phone,
  Email,
  Schedule,
  MenuBook,
  Home,
  ShoppingCart,
  Help,
  Person,
}
from "@mui/icons-material";

const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0px); }
`;

const FooterContainer = styled.div`
  width: 100%;
  background: #1a1a2e;
  padding: 60px 0 30px;
  position: relative;
  overflow: hidden;
  color: white;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      135deg,
      rgba(63, 81, 181, 0.1),
      rgba(33, 150, 243, 0.1)
    );
    z-index: 0;
  }
`;

const StyledLink = styled(Link)`
  color: #e3c08d;
  text-decoration: none;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
  margin-bottom: 12px;

  &:hover {
    color: #ffffff;
    transform: translateX(5px);
  }

  svg {
    margin-right: 8px;
    font-size: 1.2rem;
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  color: #e3c08d;
  transition: all 0.3s ease;

  &:hover {
    color: #ffffff;
    transform: translateX(5px);
  }

  svg {
    margin-right: 10px;
    font-size: 1.2rem;
  }
`;

const SocialIcon = styled(IconButton)`
  color: #e3c08d;
  background: rgba(255, 255, 255, 0.1);
  margin-right: 10px;
  transition: all 0.3s ease;

  &:hover {
    color: white;
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-3px);
  }
`;

const SectionTitle = styled(Typography)`
  position: relative;
  padding-bottom: 10px;
  margin-bottom: 20px;
  color: #ffffff;
  font-weight: 600;

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 2px;
    background: #e3c08d;
    transition: width 0.3s ease;
  }

  &:hover:after {
    width: 80px;
  }
`;

export default function Footer() {
  const authMember = null;

  return (
    <FooterContainer>
      <Container sx={{ position: "relative", zIndex: 1 }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={8}
          sx={{ mb: 6 }}
        >
          {/* About Section */}
          <Box sx={{ maxWidth: 340 }}>
            <Box sx={{ mb: 3 }}>
              <img
                width={"150px"}
                src={"/icons/logo-white.png"}
                alt="Book Haven"
                style={{ filter: "drop-shadow(0 0 5px rgba(255,255,255,0.3))" }}
              />
            </Box>
            <Typography
              variant="body1"
              sx={{ color: "#e3c08d", mb: 3, lineHeight: 1.7 }}
            >
              Book Haven is your gateway to literary adventures. We curate the
              finest collection of books to inspire, educate, and entertain
              readers of all ages. Our mission is to foster a love for reading
              in every community we serve.
            </Typography>
            <Box sx={{ display: "flex" }}>
              <SocialIcon
                aria-label="Facebook"
                sx={{ animation: `${floatAnimation} 3s ease infinite` }}
              >
                <Facebook />
              </SocialIcon>
              <SocialIcon
                aria-label="Twitter"
                sx={{ animation: `${floatAnimation} 3s ease infinite 0.5s` }}
              >
                <Twitter />
              </SocialIcon>
              <SocialIcon
                aria-label="Instagram"
                sx={{ animation: `${floatAnimation} 3s ease infinite 1s` }}
              >
                <Instagram />
              </SocialIcon>
              <SocialIcon
                aria-label="YouTube"
                sx={{ animation: `${floatAnimation} 3s ease infinite 1.5s` }}
              >
                <YouTube />
              </SocialIcon>
            </Box>
          </Box>

          {/* Quick Links */}
          <Box>
            <SectionTitle variant="h6">Explore</SectionTitle>
            <Box>
              <StyledLink to="/">
                <Home fontSize="small" /> Home
              </StyledLink>
              <StyledLink to="/products">
                <MenuBook fontSize="small" /> Books
              </StyledLink>
              {authMember && (
                <StyledLink to="/orders">
                  <ShoppingCart fontSize="small" /> Orders
                </StyledLink>
              )}
              <StyledLink to="/help">
                <Help fontSize="small" /> Help
              </StyledLink>
              {authMember && (
                <StyledLink to="/member-page">
                  <Person fontSize="small" /> My Shelf
                </StyledLink>
              )}
            </Box>
          </Box>

          {/* Contact Info */}
          <Box>
            <SectionTitle variant="h6">Find Us</SectionTitle>
            <Box>
              <ContactItem>
                <LocationOn fontSize="small" />
                <Typography variant="body1">
                  123 Book Street, Literary District
                </Typography>
              </ContactItem>
              <ContactItem>
                <Phone fontSize="small" />
                <Typography variant="body1">+1 (234) 567-8910</Typography>
              </ContactItem>
              <ContactItem>
                <Email fontSize="small" />
                <Typography variant="body1">info@bookhaven.com</Typography>
              </ContactItem>
              <ContactItem>
                <Schedule fontSize="small" />
                <Typography variant="body1">Mon-Sat: 9am - 8pm</Typography>
              </ContactItem>
            </Box>
          </Box>

          {/* Newsletter */}
          <Box sx={{ maxWidth: 300 }}>
            <SectionTitle variant="h6">Newsletter</SectionTitle>
            <Typography variant="body1" sx={{ color: "#e3c08d", mb: 2 }}>
              Subscribe to receive updates on new arrivals and special offers.
            </Typography>
            <Box component="form" sx={{ display: "flex" }}>
              <input
                type="email"
                placeholder="Your email"
                style={{
                  padding: "10px",
                  border: "1px solid #e3c08d",
                  background: "transparent",
                  color: "white",
                  flexGrow: 1,
                  outline: "none",
                }}
              />
              <button
                type="submit"
                style={{
                  background: "#e3c08d",
                  color: "#1a1a2e",
                  border: "none",
                  padding: "0 15px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              >
                Subscribe
              </button>
            </Box>
          </Box>
        </Stack>

        {/* Divider */}
        <Box
          sx={{
            borderTop: "1px solid rgba(197, 200, 201, 0.2)",
            my: 4,
            opacity: 0.5,
          }}
        />

        {/* Copyright */}
        <Typography
          variant="body2"
          sx={{
            color: "#e3c08d",
            textAlign: "center",
            opacity: 0.8,
          }}
        >
     
        </Typography>
      </Container>
    </FooterContainer>
  );
}
