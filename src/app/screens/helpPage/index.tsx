import React, { useState } from "react";
import {
  Box,
  Stack,
  AccordionSummary,
  AccordionDetails,
  InputAdornment,
  Typography,
} from "@mui/material";
import { ExpandMore, Send, Person, Email, Message } from "@mui/icons-material";
import { faq } from "../../../lib/data/faq";
import { terms } from "../../../lib/data/terms";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import {
  HelpContainer,
  HelpTabs,
  HelpTab,
  ContentBox,
  TermsItem,
  FAQAccordion,
  ContactForm,
  FormTextField,
  SubmitButton,
  SectionTitle,
  SectionSubtitle,
} from "./HelpPage.styles";

export default function HelpPage() {
  const [value, setValue] = useState("1");

  const handleChange = (e: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <HelpContainer maxWidth="lg">
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <HelpTabs
            value={value}
            onChange={handleChange}
            aria-label="Help sections"
          >
            <HelpTab label="Terms" value="1" />
            <HelpTab label="FAQ" value="2" />
            <HelpTab label="Contact" value="3" />
          </HelpTabs>
        </Box>

        <Stack spacing={3} mt={4}>
          <TabPanel value="1">
            <ContentBox>
              <SectionTitle>Terms & Conditions</SectionTitle>
              <Stack spacing={2}>
                {terms.map((term, index) => (
                  <TermsItem key={index}>{term}</TermsItem>
                ))}
              </Stack>
            </ContentBox>
          </TabPanel>

          <TabPanel value="2">
            <ContentBox>
              <SectionTitle>Frequently Asked Questions</SectionTitle>
              <Stack spacing={1}>
                {faq.map((item, index) => (
                  <FAQAccordion key={index}>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Typography fontWeight={600}>{item.question}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>{item.answer}</Typography>
                    </AccordionDetails>
                  </FAQAccordion>
                ))}
              </Stack>
            </ContentBox>
          </TabPanel>

          <TabPanel value="3">
            <ContentBox>
              <SectionTitle>Contact Us</SectionTitle>
              <SectionSubtitle>
                Fill out the form below to send us a message
              </SectionSubtitle>

              <ContactForm action="#" method="POST">
                <FormTextField
                  label="Your Name"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person />
                      </InputAdornment>
                    ),
                  }}
                />

                <FormTextField
                  label="Your Email"
                  variant="outlined"
                  fullWidth
                  type="email"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email />
                      </InputAdornment>
                    ),
                  }}
                />

                <FormTextField
                  label="Message"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Message />
                      </InputAdornment>
                    ),
                  }}
                />

                <Box display="flex" justifyContent="flex-end" mt={3}>
                  <SubmitButton
                    type="submit"
                    variant="contained"
                    startIcon={<Send />}
                  >
                    Send Message
                  </SubmitButton>
                </Box>
              </ContactForm>
            </ContentBox>
          </TabPanel>
        </Stack>
      </TabContext>
    </HelpContainer>
  );
}
