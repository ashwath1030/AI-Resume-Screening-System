import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Badge,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
  Typography,
  Divider,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";

function Navbar() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);

  const notifications = [
  "📄 Resume uploaded successfully",
  "🤖 AI ranking completed",
  "📧 Interview email sent",
  "📊 Report generated",
];

  return (
    <AppBar
      position="fixed"
      elevation={1}
      sx={{
        left: "270px",
        width: "calc(100% - 270px)",
        bgcolor: "#fff",
        color: "#1e293b",
        borderBottom: "1px solid #e5e7eb",
        zIndex: 1200,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <TextField
  size="small"
  placeholder="Search candidates, jobs, resumes..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      const value = search.toLowerCase();

      if (value.includes("job")) {
        navigate("/jobs");
      } else if (value.includes("resume")) {
        navigate("/resume");
      } else if (value.includes("ranking")) {
        navigate("/ranking");
      } else if (value.includes("candidate")) {
        navigate("/candidates");
      } else if (value.includes("report")) {
        navigate("/reports");
      } else if (value.includes("dashboard")) {
        navigate("/dashboard");
      } else if (value.includes("profile")) {
        navigate("/profile");
      } else {
        alert("No matching page found.");
      }

      setSearch("");
    }
  }}
  sx={{
    width: 350,
    background: "#f8fafc",
    borderRadius: 2,
  }}
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <SearchIcon />
      </InputAdornment>
    ),
  }}
/>

        <Box display="flex" alignItems="center" gap={2}>
          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
            <Badge
              badgeContent={notifications.length}
              color="error"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            <Typography
              sx={{
                px: 2,
                py: 1,
                fontWeight: "bold",
              }}
            >
              Notifications
            </Typography>

            <Divider />

            {notifications.map((item, index) => (
              <MenuItem key={index}
    onClick={() => setAnchorEl(null)}
>
                {item}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;