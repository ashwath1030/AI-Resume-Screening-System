import { Box, Typography } from "@mui/material";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        textAlign: "center",
        bgcolor: "#fff",
        borderTop: "1px solid #e5e7eb",
      }}
    >
      <Typography variant="body2" fontWeight={500}>
        © 2026 AI Resume Screening System
      </Typography>

      <Typography variant="caption" color="text.secondary">
        Smart Resume Screening • Candidate Ranking • HR Dashboard
      </Typography>
    </Box>
  );
}

export default Footer;