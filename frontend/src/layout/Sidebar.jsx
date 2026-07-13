import { Link, useLocation } from "react-router-dom";
import {
  Box,
  Avatar,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import WorkIcon from "@mui/icons-material/Work";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import AssessmentIcon from "@mui/icons-material/Assessment";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import SmartToyIcon from "@mui/icons-material/SmartToy";

import LogoutButton from "../components/LogoutButton";
import { getRole } from "../utils/auth";

function Sidebar() {
  const role = getRole();
  const location = useLocation();

  const menuItemStyle = (path) => ({
    borderRadius: "12px",
    mb: 1,
    color: "#fff",
    backgroundColor:
      location.pathname === path ? "rgba(255,255,255,0.18)" : "transparent",
    transition: "0.3s",
    "&:hover": {
      backgroundColor: "rgba(255,255,255,0.15)",
      transform: "translateX(5px)",
    },
  });

  return (
    <Box
      sx={{
        width: 270,
        minHeight: "100vh",
        background: "linear-gradient(180deg,#0F172A,#1E3A8A)",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        overflowY: "auto",
        zIndex: 1300,
        }}
        >
      {/* Logo */}
      <Box sx={{ p: 3 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <SmartToyIcon />
          AI Resume
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: "#cbd5e1",
            mt: 0.5,
          }}
        >
          Screening System
        </Typography>
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,.15)" }} />

      {/* User Card */}
      <Box
        sx={{
          mx: 2,
          my: 3,
          p: 2,
          borderRadius: 3,
          background: "rgba(255,255,255,.08)",
          textAlign: "center",
        }}
      >
        <Avatar
          sx={{
            width: 60,
            height: 60,
            mx: "auto",
            mb: 1,
            bgcolor: "#2563eb",
          }}
        >
         
        </Avatar>

        <Typography fontWeight="bold">
          
        </Typography>

        <Typography
          variant="body2"
          color="#cbd5e1"
        >
          {role?.toUpperCase()}
        </Typography>
      </Box>

      {/* Menu */}
      <List sx={{ px: 2, flexGrow: 1 }}>
        <ListItemButton
          component={Link}
          to="/dashboard"
          sx={menuItemStyle("/dashboard")}
        >
          <ListItemIcon sx={{ color: "#fff" }}>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        {(role === "admin" || role === "hr") && (
          <ListItemButton
            component={Link}
            to="/jobs"
            sx={menuItemStyle("/jobs")}
          >
            <ListItemIcon sx={{ color: "#fff" }}>
              <WorkIcon />
            </ListItemIcon>
            <ListItemText primary="Jobs" />
          </ListItemButton>
        )}

        {(role === "admin" || role === "hr") && (
          <ListItemButton
            component={Link}
            to="/resume"
            sx={menuItemStyle("/resume")}
          >
            <ListItemIcon sx={{ color: "#fff" }}>
              <UploadFileIcon />
            </ListItemIcon>
            <ListItemText primary="Resume Upload" />
          </ListItemButton>
        )}

        <ListItemButton
          component={Link}
          to="/ranking"
          sx={menuItemStyle("/ranking")}
        >
          <ListItemIcon sx={{ color: "#fff" }}>
            <LeaderboardIcon />
          </ListItemIcon>
          <ListItemText primary="AI Ranking" />
        </ListItemButton>

        {(role === "admin" || role === "hr") && (
          <ListItemButton
            component={Link}
            to="/reports"
            sx={menuItemStyle("/reports")}
          >
            <ListItemIcon sx={{ color: "#fff" }}>
              <AssessmentIcon />
            </ListItemIcon>
            <ListItemText primary="Reports" />
          </ListItemButton>
        )}

        <ListItemButton
          component={Link}
          to="/profile"
          sx={menuItemStyle("/profile")}
        >
          <ListItemIcon sx={{ color: "#fff" }}>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItemButton>

        <ListItemButton
          component={Link}
          to="/settings"
          sx={menuItemStyle("/settings")}
        >
          <ListItemIcon sx={{ color: "#fff" }}>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItemButton>
      </List>

      {/* Logout */}
      <Box sx={{ p: 2 }}>
        <LogoutButton />
      </Box>
    </Box>
  );
}

export default Sidebar;