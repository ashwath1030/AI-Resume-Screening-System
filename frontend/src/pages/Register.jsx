import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authService";

import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  MenuItem,
  InputAdornment,
  IconButton,
  Alert,
  Avatar,
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import HowToRegIcon from "@mui/icons-material/HowToReg";

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "recruiter",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccess("");
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await register({
        full_name: form.full_name,
        email: form.email,
        password: form.password,
        role: form.role,
      });

      setSuccess("Registration Successful!");

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      console.log(err);

      setError(
        err.response?.data?.detail ||
          "Registration Failed"
      );
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#1565c0,#42a5f5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={15}
        sx={{
          width: 500,
          p: 5,
          borderRadius: 5,
          backdropFilter: "blur(10px)",
        }}
      >

        {/* Logo */}
        <Box
          sx={{
            display:"flex",
            justifyContent:"center",
            mb:2
          }}
        >
          <Avatar
            sx={{
              width:70,
              height:70,
              bgcolor:"#1565c0"
            }}
          >
            <HowToRegIcon fontSize="large"/>
          </Avatar>
        </Box>


        <Typography
          variant="h4"
          fontWeight="700"
          textAlign="center"
          color="#1565c0"
        >
          Create Account
        </Typography>


        <Typography
          color="text.secondary"
          textAlign="center"
          mb={4}
        >
          Join AI Resume Screening System
        </Typography>


        {success && (
          <Alert severity="success" sx={{ mb:2 }}>
            {success}
          </Alert>
        )}


        {error && (
          <Alert severity="error" sx={{ mb:2 }}>
            {error}
          </Alert>
        )}



        <Box
          component="form"
          onSubmit={handleSubmit}
        >

          <TextField
            fullWidth
            label="Full Name"
            name="full_name"
            value={form.full_name}
            onChange={handleChange}
            margin="normal"
            required
            sx={{
              "& .MuiOutlinedInput-root":{
                borderRadius:3
              }
            }}
            InputProps={{
              startAdornment:(
                <InputAdornment position="start">
                  <PersonIcon color="primary"/>
                </InputAdornment>
              )
            }}
          />


          <TextField
            fullWidth
            label="Email Address"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            margin="normal"
            required
            sx={{
              "& .MuiOutlinedInput-root":{
                borderRadius:3
              }
            }}
            InputProps={{
              startAdornment:(
                <InputAdornment position="start">
                  <EmailIcon color="primary"/>
                </InputAdornment>
              )
            }}
          />



          <TextField
            fullWidth
            select
            label="Select Role"
            name="role"
            value={form.role}
            onChange={handleChange}
            margin="normal"
            sx={{
              "& .MuiOutlinedInput-root":{
                borderRadius:3
              }
            }}
          >

            <MenuItem value="admin">
              Admin
            </MenuItem>

            <MenuItem value="hr">
              HR
            </MenuItem>

            <MenuItem value="recruiter">
              Recruiter
            </MenuItem>

          </TextField>



          <TextField
            fullWidth
            label="Password"
            name="password"
            type={
              showPassword
                ? "text"
                : "password"
            }
            value={form.password}
            onChange={handleChange}
            margin="normal"
            required
            sx={{
              "& .MuiOutlinedInput-root":{
                borderRadius:3
              }
            }}
            InputProps={{
              startAdornment:(
                <InputAdornment position="start">
                  <LockIcon color="primary"/>
                </InputAdornment>
              ),

              endAdornment:(
                <InputAdornment position="end">

                  <IconButton
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                  >
                    {
                      showPassword
                      ?
                      <VisibilityOff/>
                      :
                      <Visibility/>
                    }
                  </IconButton>

                </InputAdornment>
              )
            }}
          />



          <TextField
            fullWidth
            label="Confirm Password"
            name="confirmPassword"
            type={
              showPassword
              ?
              "text"
              :
              "password"
            }
            value={form.confirmPassword}
            onChange={handleChange}
            margin="normal"
            required
            sx={{
              "& .MuiOutlinedInput-root":{
                borderRadius:3
              }
            }}
          />



          <Button
            fullWidth
            variant="contained"
            type="submit"
            size="large"
            sx={{
              mt:3,
              py:1.5,
              borderRadius:3,
              fontWeight:"bold",
              fontSize:16,
              textTransform:"none",
              background:
                "linear-gradient(90deg,#1565c0,#42a5f5)",
              "&:hover":{
                background:
                "linear-gradient(90deg,#0d47a1,#1976d2)"
              }
            }}
          >
            Register Account
          </Button>



          <Button
            fullWidth
            variant="text"
            sx={{
              mt:2,
              textTransform:"none",
              fontWeight:600
            }}
            onClick={() => navigate("/")}
          >
            Already have an account? Login
          </Button>


        </Box>

      </Paper>

    </Box>
  );
}

export default Register;