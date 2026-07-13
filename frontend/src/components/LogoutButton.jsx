import { Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/", { replace: true });
  };

  return (
    <Button
      fullWidth
      variant="contained"
      startIcon={<LogoutIcon />}
      onClick={handleLogout}
      sx={{
        mt: 2,
        py: 1.4,
        borderRadius: 3,
        textTransform: "none",
        fontWeight: 600,
        fontSize: 15,
        background: "linear-gradient(135deg,#E53935,#D32F2F)",
        boxShadow: "0 8px 20px rgba(229,57,53,0.30)",
        transition: "all .3s ease",

        "&:hover": {
          background: "linear-gradient(135deg,#D32F2F,#C62828)",
          transform: "translateY(-2px)",
          boxShadow: "0 12px 24px rgba(229,57,53,0.40)",
        },

        "&:active": {
          transform: "scale(0.98)",
        },
      }}
    >
      Logout
    </Button>
  );
}

export default LogoutButton;