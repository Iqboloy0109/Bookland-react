import { Box, Container, Stack } from "@mui/material";
import Card from "@mui/joy/Card";
import { CssVarsProvider, Typography } from "@mui/joy";
import CardOverflow from "@mui/joy/CardOverflow";
import AspectRatio from "@mui/joy/AspectRatio";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import StarRateIcon from "@mui/icons-material/StarRate";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveTopUsers } from "./selector";
import { serverApi } from "../../../lib/config";
import { Member } from "../../../lib/types/member";

// REDUX SELECTOR
const TopUsersRetriever = createSelector(retrieveTopUsers, (topUsers) => ({
  topUsers,
}));

export default function ActiveUsers() {
  const { topUsers } = useSelector(TopUsersRetriever);

  // Generate random reading stats for demo
  const getRandomStats = () => ({
    booksRead: Math.floor(Math.random() * 50) + 10,
    rating: (Math.random() * 2 + 3).toFixed(1),
    saved: Math.floor(Math.random() * 30) + 5,
  });

  return (
    <div className="active-users-frame">
      <Container>
        <Stack className="main">
          <Box className="category-title">Top Book Readers</Box>
          <Stack className="cards-frame">
            <CssVarsProvider>
              {topUsers.length !== 0 ? (
                topUsers.map((member: Member) => {
                  const imagePath = member.memberImage
                    ? `${serverApi}/${member.memberImage}`
                    : "/images/default-reader.jpg";
                  const stats = getRandomStats();

                  return (
                    <Card key={member._id} variant="outlined" className="card">
                      <div className="reading-badge">
                        {stats.booksRead} books
                      </div>
                      <CardOverflow>
                        <AspectRatio ratio="1">
                          <img
                            src={imagePath}
                            alt={member.memberNick}
                            className="member-avatar"
                            loading="lazy"
                          />
                        </AspectRatio>
                      </CardOverflow>
                      <CardOverflow variant="soft" className="product-detail">
                        <Typography className="member-nickname">
                          {member.memberNick}
                        </Typography>
                        <div className="member-stats">
                          <div className="stat-item">
                            <StarRateIcon fontSize="small" />
                            {stats.rating}
                          </div>
                          <div className="stat-item">
                            <BookmarkIcon fontSize="small" />
                            {stats.saved}
                          </div>
                          <div className="stat-item">
                            <MenuBookIcon fontSize="small" />
                            {stats.booksRead}
                          </div>
                        </div>
                      </CardOverflow>
                    </Card>
                  );
                })
              ) : (
                <Box className="no-data">
                  <MenuBookIcon />
                  No Active Readers Found
                </Box>
              )}
            </CssVarsProvider>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
