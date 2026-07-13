import {
  Paper,
  Typography,
  Box,
  LinearProgress,
  Chip,
} from "@mui/material";

import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

function ResumeScore({ score = 0 }) {

  const getStatus = () => {
    if (score >= 85)
      return {
        label: "Excellent Match",
        color: "success",
      };

    if (score >= 70)
      return {
        label: "Good Match",
        color: "warning",
      };

    return {
      label: "Needs Improvement",
      color: "error",
    };
  };

  const status = getStatus();

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 4,
        mt: 3,
      }}
    >
      <Typography
        variant="h6"
        fontWeight="bold"
        mb={3}
      >
        AI Resume Score
      </Typography>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <EmojiEventsIcon
          sx={{
            fontSize: 55,
            color: "#F59E0B",
            mb: 1,
          }}
        />

        <Typography
          variant="h2"
          fontWeight="bold"
          color="primary"
        >
          {score}%
        </Typography>

        <Chip
          label={status.label}
          color={status.color}
          sx={{
            mt: 2,
            fontWeight: "bold",
          }}
        />
      </Box>

      <Box mt={4}>
        <Typography
          variant="body2"
          color="text.secondary"
          mb={1}
        >
          Candidate Score
        </Typography>

        <LinearProgress
          variant="determinate"
          value={score}
          sx={{
            height: 12,
            borderRadius: 10,
          }}
        />
      </Box>
    </Paper>
  );
}

export default ResumeScore;