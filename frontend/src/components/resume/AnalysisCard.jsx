import {
  Paper,
  Typography,
  Grid,
  Chip,
  Divider,
} from "@mui/material";

import PsychologyIcon from "@mui/icons-material/Psychology";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

function AnalysisCard({
  score = 0,
  skills = [],
  filename = "",
}) {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 4,
      }}
    >
      <Typography
        variant="h6"
        fontWeight="bold"
        display="flex"
        alignItems="center"
        gap={1}
      >
        <PsychologyIcon color="primary" />
        AI Analysis Summary
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Grid container spacing={2}>

        <Grid item xs={12}>
          <Typography fontWeight="bold">
            File Name
          </Typography>

          <Typography color="text.secondary">
            {filename || "No file uploaded"}
          </Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography fontWeight="bold">
            Resume Score
          </Typography>

          <Typography
            variant="h4"
            color="primary"
          >
            {score}%
          </Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography fontWeight="bold">
            Skills Found
          </Typography>

          <Typography
            variant="h4"
            color="success.main"
          >
            {skills.length}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography
            fontWeight="bold"
            mb={1}
          >
            Top Skills
          </Typography>

          {skills.length === 0 ? (
            <Typography color="text.secondary">
              No skills detected.
            </Typography>
          ) : (
            skills.map((skill, index) => (
              <Chip
                key={index}
                label={skill}
                icon={<CheckCircleIcon />}
                color="success"
                sx={{
                  mr: 1,
                  mb: 1,
                }}
              />
            ))
          )}
        </Grid>

      </Grid>
    </Paper>
  );
}

export default AnalysisCard;