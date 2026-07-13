import {
  Paper,
  Typography,
  Box,
  Divider,
} from "@mui/material";

import DescriptionIcon from "@mui/icons-material/Description";

function ResumePreview({ text = "" }) {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 4,
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        gap={1}
        mb={2}
      >
        <DescriptionIcon color="primary" />

        <Typography
          variant="h6"
          fontWeight="bold"
        >
          Resume Preview
        </Typography>
      </Box>

      <Divider sx={{ mb: 2 }} />

      <Paper
        variant="outlined"
        sx={{
          p: 2,
          height: 350,
          overflowY: "auto",
          bgcolor: "#FAFAFA",
          borderRadius: 2,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            whiteSpace: "pre-wrap",
            lineHeight: 1.8,
          }}
        >
          {text || "Resume preview will appear here after upload."}
        </Typography>
      </Paper>
    </Paper>
  );
}

export default ResumePreview;