import { useState } from "react";

import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  FormControlLabel,
  Grid,
  Paper,
  Switch,
  TextField,
  Typography,
} from "@mui/material";

import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import SaveIcon from "@mui/icons-material/Save";
import EmailIcon from "@mui/icons-material/Email";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import StorageIcon from "@mui/icons-material/Storage";

import MainLayout from "../layout/MainLayout";

function Settings() {
  const [darkMode, setDarkMode] = useState(false);

  const [emailNotifications, setEmailNotifications] = useState(true);

  const [rankingAlerts, setRankingAlerts] = useState(true);

  const handleSave = () => {
    alert("Settings Saved Successfully");
  };

  return (
    <MainLayout>

      {/* Header */}
      <Paper
        elevation={0}
        sx={{
          p: 4,
          mb: 3,
          borderRadius: 4,
          background:
            "linear-gradient(135deg,#1565C0,#42A5F5)",
          color: "#fff",
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          Settings
        </Typography>

        <Typography sx={{ mt: 1 }}>
          Configure your application preferences.
        </Typography>
      </Paper>

      <Grid container spacing={3}>

        {/* Notifications */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              borderRadius: 4,
              boxShadow: "0 8px 20px rgba(0,0,0,.08)",
              height: "100%",
            }}
          >
            <CardContent>

              <Box
                display="flex"
                alignItems="center"
                gap={1}
                mb={2}
              >
                <NotificationsActiveIcon color="primary" />

                <Typography
                  variant="h6"
                  fontWeight="bold"
                >
                  Notifications
                </Typography>
              </Box>

              <Divider sx={{ mb: 2 }} />

              <FormControlLabel
                control={
                  <Switch
                    checked={emailNotifications}
                    onChange={(e) =>
                      setEmailNotifications(e.target.checked)
                    }
                  />
                }
                label={
                  <Box display="flex" alignItems="center" gap={1}>
                    <EmailIcon fontSize="small" />
                    Email Notifications
                  </Box>
                }
              />

              <FormControlLabel
                control={
                  <Switch
                    checked={rankingAlerts}
                    onChange={(e) =>
                      setRankingAlerts(e.target.checked)
                    }
                  />
                }
                label={
                  <Box display="flex" alignItems="center" gap={1}>
                    <LeaderboardIcon fontSize="small" />
                    Ranking Alerts
                  </Box>
                }
              />

              <FormControlLabel
                control={
                  <Switch
                    checked={darkMode}
                    onChange={(e) =>
                      setDarkMode(e.target.checked)
                    }
                  />
                }
                label="Dark Mode"
              />

            </CardContent>
          </Card>
        </Grid>

        {/* System */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              borderRadius: 4,
              boxShadow: "0 8px 20px rgba(0,0,0,.08)",
              height: "100%",
            }}
          >
            <CardContent>

              <Box
                display="flex"
                alignItems="center"
                gap={1}
                mb={2}
              >
                <SettingsApplicationsIcon color="primary" />

                <Typography
                  variant="h6"
                  fontWeight="bold"
                >
                  System Information
                </Typography>
              </Box>

              <Divider sx={{ mb: 3 }} />

              <TextField
                fullWidth
                label="Backend URL"
                value="http://127.0.0.1:8000"
                disabled
                sx={{ mb: 3 }}
                InputProps={{
                  startAdornment: (
                    <StorageIcon
                      sx={{
                        mr: 1,
                        color: "#1976d2",
                      }}
                    />
                  ),
                }}
              />

              <TextField
                fullWidth
                label="Application Version"
                value="1.0.0"
                disabled
              />

            </CardContent>
          </Card>
        </Grid>

      </Grid>

      {/* Save Button */}
      <Box
        display="flex"
        justifyContent="flex-end"
        mt={4}
      >
        <Button
          variant="contained"
          size="large"
          startIcon={<SaveIcon />}
          onClick={handleSave}
          sx={{
            px: 5,
            py: 1.5,
            borderRadius: 2,
            fontWeight: "bold",
          }}
        >
          Save Settings
        </Button>
      </Box>

    </MainLayout>
  );
}

export default Settings;