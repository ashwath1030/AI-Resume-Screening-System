import {
  Paper,
  Typography,
  Grid,
  Avatar,
  Box,
  Divider,
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";

function CandidateInfo({ resume }) {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 4,
        height: "100%",
      }}
    >
      <Typography
        variant="h6"
        fontWeight="bold"
        mb={3}
      >
        Candidate Information
      </Typography>

      <Box
        display="flex"
        alignItems="center"
        gap={2}
        mb={3}
      >
        <Avatar
          sx={{
            width: 70,
            height: 70,
            bgcolor: "#2563EB",
          }}
        >
          <PersonIcon sx={{ fontSize: 40 }} />
        </Avatar>

        <Box>
          <Typography
            variant="h6"
            fontWeight="bold"
          >
           {resume?.candidate_name || "Unknown Candidate"}
          </Typography>

          <Typography color="text.secondary">
            Resume Uploaded
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ mb: 2 }} />

      <Grid container spacing={2}>

        <Grid item xs={12}>
          <Box display="flex" gap={1}>
            <EmailIcon color="primary" />
            <Typography>
              {resume?.email || "Not Available"}
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box display="flex" gap={1}>
            <PhoneIcon color="primary" />
            <Typography>
              {resume?.phone || "Not Available"}
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box display="flex" gap={1}>
            <SchoolIcon color="primary" />
            <Typography>
              {resume?.education || "Not Available"}
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box display="flex" gap={1}>
            <WorkIcon color="primary" />
            <Typography>
              {resume?.experience || "Not Available"}
            </Typography>
          </Box>
        </Grid>

      </Grid>
    </Paper>
  );
}

export default CandidateInfo;