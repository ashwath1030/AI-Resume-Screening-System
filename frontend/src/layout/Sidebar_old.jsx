import { Link } from "react-router-dom";

import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import WorkIcon from "@mui/icons-material/Work";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import AssessmentIcon from "@mui/icons-material/Assessment";
import PersonIcon from "@mui/icons-material/Person";
import LogoutButton from "../components/LogoutButton";
import SettingsIcon from "@mui/icons-material/Settings";
import { getRole } from "../utils/auth";

function Sidebar() {
  const role = getRole();

  return (
    <div
      style={{
        width: "240px",
        backgroundColor: "#1976d2",
        color: "white",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <h2>AI Resume</h2>
      <hr />

      <List>
        <ListItemButton component={Link} to="/dashboard">
          <ListItemIcon>
            <DashboardIcon style={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary="Dashboard" style={{ color: "white" }} />
        </ListItemButton>

        {(role === "admin" || role === "hr") && (
  <ListItemButton component={Link} to="/jobs">
    <ListItemIcon>
      <WorkIcon style={{ color: "white" }} />
    </ListItemIcon>
    <ListItemText primary="Jobs" style={{ color: "white" }} />
  </ListItemButton>
)}
        {(role === "admin" || role === "hr") && (
        <ListItemButton component={Link} to="/resume">
          <ListItemIcon>
            <UploadFileIcon style={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary="Resume Upload" style={{ color: "white" }} />
        </ListItemButton>
        )}

        <ListItemButton component={Link} to="/ranking">
          <ListItemIcon>
            <LeaderboardIcon style={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary="Ranking" style={{ color: "white" }} />
        </ListItemButton>

        {(role === "admin" || role === "hr") && (
        <ListItemButton component={Link} to="/reports">
          <ListItemIcon>
            <AssessmentIcon style={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary="Reports" style={{ color: "white" }} />
        </ListItemButton>
        )}
        <ListItemButton component={Link} to="/profile">
          <ListItemIcon>
            <PersonIcon style={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary="Profile" style={{ color: "white" }} />
        </ListItemButton>
        <ListItemButton component={Link} to="/settings">
  <ListItemIcon>
    <SettingsIcon style={{ color: "white" }} />
  </ListItemIcon>
  <ListItemText
    primary="Settings"
    style={{ color: "white" }}
  />
</ListItemButton>
      </List>
       {/* Logout Button */}
      <div style={{ marginTop: "30px" }}>
        <LogoutButton />
      </div>
    </div>
  );
}

export default Sidebar;