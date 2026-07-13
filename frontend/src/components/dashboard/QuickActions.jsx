import {
  Paper,
  Typography,
  Grid,
  Card,
  CardActionArea,
  Box,
} from "@mui/material";

import { Link } from "react-router-dom";

import UploadFileIcon from "@mui/icons-material/UploadFile";
import WorkIcon from "@mui/icons-material/Work";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import AssessmentIcon from "@mui/icons-material/Assessment";

const actions = [
  {
    title: "Upload Resume",
    icon: <UploadFileIcon sx={{ fontSize: 38 }} />,
    color: "#2563EB",
    link: "/upload",
  },
  {
    title: "Manage Jobs",
    icon: <WorkIcon sx={{ fontSize: 38 }} />,
    color: "#10B981",
    link: "/jobs",
  },
  {
    title: "AI Ranking",
    icon: <LeaderboardIcon sx={{ fontSize: 38 }} />,
    color: "#F59E0B",
    link: "/ranking",
  },
  {
    title: "Reports",
    icon: <AssessmentIcon sx={{ fontSize: 38 }} />,
    color: "#8B5CF6",
    link: "/reports",
  },
];

function QuickActions() {
  return (
    <Paper
      sx={{
        p: 3,
        mt: 3,
        borderRadius: 4,
        boxShadow: "0 10px 25px rgba(0,0,0,.08)",
      }}
    >
      <Typography
        variant="h5"
        fontWeight="bold"
        mb={3}
      >
        Quick Actions
      </Typography>

      <Grid container spacing={2}>
        {actions.map((action) => (
          <Grid item xs={6} key={action.title}>
            <Card
              sx={{
                borderRadius: 3,
                transition: ".3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 12px 25px rgba(0,0,0,.15)",
                },
              }}
            >
              <CardActionArea
                component={Link}
                to={action.link}
              >
                <Box
                  sx={{
                    p: 3,
                    textAlign: "center",
                  }}
                >
                  <Box
                    sx={{
                      color: action.color,
                      mb: 1,
                    }}
                  >
                    {action.icon}
                  </Box>

                  <Typography fontWeight="bold">
                    {action.title}
                  </Typography>
                </Box>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}

export default QuickActions;