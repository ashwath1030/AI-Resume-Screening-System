import { Avatar, Box, Chip, Typography } from "@mui/material";
import WavingHandIcon from "@mui/icons-material/WavingHand";

function DashboardHeader() {
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Box
      sx={{
        bgcolor: "#1565c0",
        color: "#fff",
        p: 4,
        borderRadius: 3,
        mb: 3,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 8px 20px rgba(0,0,0,.12)",
      }}
    >
      <Box>
        <Typography
          variant="h4"
          fontWeight="bold"
        >
          Welcome Back!
        </Typography>

        <Typography sx={{ mt: 1, opacity: 0.9 }}>
          AI Resume Screening & Candidate Ranking Dashboard
        </Typography>

        <Typography variant="body2" sx={{ mt: 1 }}>
          {today}
        </Typography>
      </Box>

      <Box textAlign="center">
        <Avatar
          sx={{
            bgcolor: "#fff",
            color: "#1565c0",
            width: 70,
            height: 70,
            mx: "auto",
            mb: 1,
          }}
        >
          <WavingHandIcon fontSize="large" />
        </Avatar>

        
      </Box>
    </Box>
  );
}

export default DashboardHeader;