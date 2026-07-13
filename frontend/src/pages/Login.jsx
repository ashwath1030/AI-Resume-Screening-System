import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
  Avatar,
  Divider,
} from "@mui/material";

import {
  Visibility,
  VisibilityOff,
  LockOutlined,
} from "@mui/icons-material";

import { login } from "../services/authService";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login({
        email,
        password,
      });

      localStorage.setItem("token", response.access_token);
      localStorage.setItem("role", response.role);

      alert("Login Successful");

      navigate("/dashboard");
    } catch (error) {
      alert("Invalid Email or Password");
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#1565C0,#42A5F5,#90CAF9)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={12}
          sx={{
            borderRadius: 5,
            overflow: "hidden",
          }}
        >
          {/* Top Section */}
          <Box
            sx={{
              bgcolor: "#1565C0",
              color: "#fff",
              textAlign: "center",
              py: 5,
            }}
          >
            <Avatar
              sx={{
                bgcolor: "#fff",
                color: "#1565C0",
                width: 70,
                height: 70,
                mx: "auto",
                mb: 2,
              }}
            >
              <LockOutlined fontSize="large" />
            </Avatar>

            <Typography variant="h4" fontWeight="bold">
              Welcome Back
            </Typography>

            <Typography sx={{ mt: 1 }}>
              AI Resume Screening System
            </Typography>
          </Box>

          {/* Form */}
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ p: 4 }}
          >
            <Typography
              variant="h6"
              fontWeight={600}
              mb={3}
            >
              Sign in to your account
            </Typography>

            <TextField
              label="Email Address"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              label="Password"
              fullWidth
              margin="normal"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                    >
                      {showPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{
                mt: 4,
                py: 1.5,
                borderRadius: 2,
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              Login
            </Button>
            <Typography
  align="center"
  sx={{ mt: 3 }}
>
  Don't have an account?{" "}
  <Link
    to="/register"
    style={{
      color: "#1976d2",
      textDecoration: "none",
      fontWeight: "bold",
    }}
  >
    Create Account
  </Link>
</Typography>

            <Divider sx={{ my: 3 }} />

            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
            >
              AI Resume Screening & Candidate Ranking System
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default Login;