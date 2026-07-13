import {
  Paper,
  Typography,
  Chip,
  Box,
} from "@mui/material";

import WarningAmberIcon from "@mui/icons-material/WarningAmber";

function MissingSkills({ skills = [] }) {
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
        mb={3}
      >
        Missing Skills
      </Typography>

      {skills.length === 0 ? (
        <Typography color="text.secondary">
          No missing skills found.
        </Typography>
      ) : (
        <Box
          display="flex"
          gap={1.5}
          flexWrap="wrap"
        >
          {skills.map((skill, index) => (
            <Chip
              key={index}
              icon={<WarningAmberIcon />}
              label={skill}
              color="warning"
              sx={{
                fontWeight: "bold",
              }}
            />
          ))}
        </Box>
      )}
    </Paper>
  );
}

export default MissingSkills;