import { useState, useEffect } from "react";
import {
  getProfile,
  updateProfile,
} from "../services/profileService";

import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import BadgeIcon from "@mui/icons-material/Badge";

import MainLayout from "../layout/MainLayout";

function Profile() {
  const [editMode, setEditMode] = useState(false);

  const [user, setUser] = useState({
    fullName: "",
    email: "",
    phone: "",
    role: "",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await getProfile();
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      await updateProfile({
        full_name: user.fullName,
        email: user.email,
      });

      alert("Profile Updated Successfully");
      setEditMode(false);
    } catch (error) {
      console.log(error);
      alert("Failed to update profile");
    }
  };

  return (
    <MainLayout>
      <Box>

        {/* Header */}
        <Paper
          elevation={0}
          sx={{
            p: 4,
            mb: 3,
            borderRadius: 4,
            background: "linear-gradient(135deg,#1565C0,#42A5F5)",
            color: "#fff",
          }}
        >
          <Typography variant="h4" fontWeight="bold">
            My Profile
          </Typography>

          <Typography sx={{ mt: 1, opacity: .9 }}>
            Manage your personal information and account details.
          </Typography>
        </Paper>

        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 4,
          }}
        >
          <Grid container spacing={5}>

            {/* Left Panel */}
            <Grid item xs={12} md={4}>

              <Stack
                spacing={2}
                alignItems="center"
              >
                <Avatar
                  sx={{
                    width: 140,
                    height: 140,
                    bgcolor: "#1565C0",
                    fontSize: 48,
                    fontWeight: "bold",
                  }}
                >
                  {user.fullName
                    ? user.fullName.charAt(0).toUpperCase()
                    : "U"}
                </Avatar>

                <Typography
                  variant="h5"
                  fontWeight="bold"
                >
                  {user.fullName}
                </Typography>

                <Chip
                  label={user.role || "User"}
                  color="primary"
                />

                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<CloudUploadIcon />}
                >
                  Upload Photo

                  <input
                    hidden
                    type="file"
                    accept="image/*"
                  />
                </Button>

              </Stack>

            </Grid>

            {/* Right Panel */}
            <Grid item xs={12} md={8}>

              <Typography
                variant="h6"
                fontWeight="bold"
                mb={2}
              >
                Personal Information
              </Typography>

              <Divider sx={{ mb: 3 }} />

              <TextField
                fullWidth
                label="Full Name"
                name="fullName"
                value={user.fullName}
                onChange={handleChange}
                disabled={!editMode}
                sx={{ mb: 3 }}
              />

              <TextField
                fullWidth
                label="Email"
                name="email"
                value={user.email}
                disabled
                sx={{ mb: 3 }}
                InputProps={{
                  startAdornment: (
                    <EmailIcon
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
                label="Phone"
                name="phone"
                value={user.phone}
                onChange={handleChange}
                disabled={!editMode}
                sx={{ mb: 3 }}
                InputProps={{
                  startAdornment: (
                    <PhoneIcon
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
                label="Role"
                value={user.role}
                disabled
                sx={{ mb: 4 }}
                InputProps={{
                  startAdornment: (
                    <BadgeIcon
                      sx={{
                        mr: 1,
                        color: "#1976d2",
                      }}
                    />
                  ),
                }}
              />

              {!editMode ? (
                <Button
                  variant="contained"
                  startIcon={<EditIcon />}
                  onClick={() => setEditMode(true)}
                  sx={{
                    px: 4,
                    py: 1.3,
                    borderRadius: 2,
                  }}
                >
                  Edit Profile
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<SaveIcon />}
                  onClick={handleSave}
                  sx={{
                    px: 4,
                    py: 1.3,
                    borderRadius: 2,
                  }}
                >
                  Save Changes
                </Button>
              )}

            </Grid>

          </Grid>
        </Paper>

      </Box>
    </MainLayout>
  );
}

export default Profile;