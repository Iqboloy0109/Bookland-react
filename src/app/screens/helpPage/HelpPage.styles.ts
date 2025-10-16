import { styled, keyframes } from "@mui/material/styles";
import {
  Container,
  Tabs,
  Tab,
  Box,
  Typography,
  Accordion,
  Button,
  TextField,
} from "@mui/material";

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Styled Components
export const HelpContainer = styled(Container)({
  padding: "40px 0",
  animation: `${fadeIn} 0.6s ease-out`,
  backgroundColor: "#f8f8ff",
  minHeight: "100vh",
});

export const HelpTabs = styled(Tabs)({
  "& .MuiTabs-indicator": {
    backgroundColor: "#2e7d32",
    height: "3px",
  },
});

export const HelpTab = styled(Tab)({
  fontWeight: 600,
  fontSize: "1rem",
  textTransform: "none",
  color: "#555",
  transition: "all 0.3s ease",

  "&.Mui-selected": {
    color: "#2e7d32",
  },

  "&:hover": {
    color: "#1b5e20",
  },
});

export const ContentBox = styled(Box)({
  background: "white",
  borderRadius: "12px",
  padding: "30px",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
  marginTop: "30px",
  animation: `${fadeIn} 0.5s ease-out`,
});

export const TermsItem = styled(Typography)({
  padding: "15px 0",
  borderBottom: "1px solid #eee",
  lineHeight: 1.6,
  transition: "all 0.3s ease",

  "&:hover": {
    backgroundColor: "#f9f9f9",
    paddingLeft: "10px",
  },
});

export const FAQAccordion = styled(Accordion)({
  marginBottom: "10px !important",
  borderRadius: "8px !important",
  overflow: "hidden",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05) !important",
  transition: "all 0.3s ease",

  "&:before": {
    display: "none",
  },

  "&:hover": {
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1) !important",
  },
});

export const ContactForm = styled("form")({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  width: "100%",
  maxWidth: "600px",
  margin: "0 auto",
});

export const FormTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",

    "& fieldset": {
      borderColor: "#ddd",
    },

    "&:hover fieldset": {
      borderColor: "#2e7d32",
    },

    "&.Mui-focused fieldset": {
      borderColor: "#2e7d32",
      boxShadow: "0 0 0 2px rgba(46, 125, 50, 0.2)",
    },
  },
});

export const SubmitButton = styled(Button)({
  backgroundColor: "#2e7d32",
  color: "white",
  fontWeight: 600,
  padding: "12px 24px",
  borderRadius: "8px",
  textTransform: "none",
  fontSize: "1rem",
  transition: "all 0.3s ease",
  animation: `${pulse} 2s infinite`,

  "&:hover": {
    backgroundColor: "#1b5e20",
    transform: "translateY(-2px)",
  },

  "& .MuiButton-startIcon": {
    transition: "transform 0.3s ease",
  },

  "&:hover .MuiButton-startIcon": {
    transform: "translateX(3px)",
  },
});

export const SectionTitle = styled(Typography)({
  fontSize: "2rem",
  fontWeight: 700,
  color: "#2e7d32",
  marginBottom: "20px",
  fontFamily: "'Merriweather', serif",
});

export const SectionSubtitle = styled(Typography)({
  fontSize: "1rem",
  color: "#666",
  marginBottom: "30px",
});
