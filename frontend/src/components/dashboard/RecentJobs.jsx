import {
  Avatar,
  Box,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";

import WorkIcon from "@mui/icons-material/Work";
import BusinessIcon from "@mui/icons-material/Business";

function RecentJobs({ jobs }) {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        mt: 3,
        borderRadius: 3,
        border: "1px solid #e0e0e0",
        height: "100%",
      }}
    >
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6" fontWeight={700}>
          Recent Jobs
        </Typography>

        <Chip
          label={`${jobs.length} Jobs`}
          color="primary"
          size="small"
        />
      </Box>

      <Divider sx={{ mb: 2 }} />

      <List disablePadding>
        {jobs.map((job, index) => (
          <Box key={index}>
            <ListItem
              sx={{
                px: 1,
                py: 1.5,
                borderRadius: 2,
                transition: "0.3s",
                "&:hover": {
                  bgcolor: "#f5f7fb",
                },
              }}
            >
              <ListItemAvatar>
                <Avatar
                  sx={{
                    bgcolor: "primary.main",
                    width: 46,
                    height: 46,
                  }}
                >
                  <WorkIcon />
                </Avatar>
              </ListItemAvatar>

              <ListItemText
                primary={
                  <Typography fontWeight={600}>
                    {job.title}
                  </Typography>
                }
                secondary={
                  <Box
                    display="flex"
                    alignItems="center"
                    gap={0.5}
                    mt={0.5}
                  >
                    <BusinessIcon
                      sx={{
                        fontSize: 16,
                        color: "text.secondary",
                      }}
                    />
                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      {job.company}
                    </Typography>
                  </Box>
                }
              />
            </ListItem>

            {index !== jobs.length - 1 && (
              <Divider sx={{ ml: 7 }} />
            )}
          </Box>
        ))}
      </List>
    </Paper>
  );
}

export default RecentJobs;