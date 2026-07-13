import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Box,
  Divider,
} from "@mui/material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

function RecommendationCard({
  recommendations = [],
  missingSkills = [],
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
        gutterBottom
      >
        AI Recommendation
      </Typography>

      <Divider sx={{ mb: 2 }} />

      {recommendations.length === 0 ? (

        <Typography color="text.secondary">
          AI recommendations will appear after resume analysis.
        </Typography>

      ) : (

        <List>

          {recommendations.map((item, index) => (

            <ListItem key={index}>

              <ListItemIcon>
                <CheckCircleIcon color="success" />
              </ListItemIcon>

              <ListItemText primary={item} />

            </ListItem>

          ))}

        </List>

      )}

      <Divider sx={{ my: 2 }} />

      <Typography
        variant="subtitle1"
        fontWeight="bold"
        gutterBottom
      >
        Missing Skills
      </Typography>

      {missingSkills.length === 0 ? (

        <Typography color="text.secondary">
          No missing skills detected.
        </Typography>

      ) : (

        <Box
          display="flex"
          gap={1}
          flexWrap="wrap"
        >

          {missingSkills.map((skill, index) => (

            <Chip
              key={index}
              icon={<WarningAmberIcon />}
              label={skill}
              color="warning"
            />

          ))}

        </Box>

      )}

    </Paper>

  );

}

export default RecommendationCard;