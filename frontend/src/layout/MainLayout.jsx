import { Box, Toolbar } from "@mui/material";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

function MainLayout({ children }) {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />

      <Box
        sx={{
          ml: "270px",
          width: "calc(100% - 270px)",
          minHeight: "100vh",
          bgcolor: "#f4f7fe",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Navbar />

        <Toolbar />

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flex: 1,
            p: 3,
          }}
        >
          {children}
        </Box>

        {/* Footer */}
        <Footer />
      </Box>
    </Box>
  );
}

export default MainLayout;