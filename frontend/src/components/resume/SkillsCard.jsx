import {
  Paper,
  Typography,
  Chip,
  Box,
} from "@mui/material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";

function SkillsCard({ skills = [] }) {

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
        Skills Detected
      </Typography>

      {skills.length === 0 ? (

        <Typography color="text.secondary">
          No skills detected.
        </Typography>

      ) : (

        <Box
          display="flex"
          flexWrap="wrap"
          gap={1.5}
        >

          {skills.map((skill, index) => (

            <Chip
              key={index}
              icon={<CheckCircleIcon />}
              label={skill}
              color="success"
              sx={{
                fontWeight: "bold",
                px: 1,
              }}
            />

          ))}

        </Box>

      )}

    </Paper>

  );

}

export default SkillsCard;