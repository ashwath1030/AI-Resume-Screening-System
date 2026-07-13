import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import PersonIcon from "@mui/icons-material/Person";

import MainLayout from "../layout/MainLayout";
import { getCandidate } from "../services/candidateService";

function CandidateDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [candidate, setCandidate] = useState(null);

  useEffect(() => {
    loadCandidate();
  }, []);

  const loadCandidate = async () => {
    try {
      const data = await getCandidate(id);
      setCandidate(data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!candidate) {
    return (
      <MainLayout>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="70vh"
        >
          <CircularProgress />
        </Box>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ mb: 3 }}
      >
        Back
      </Button>

      <Grid container spacing={3}>
        {/* Left Profile Card */}
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              borderRadius: 4,
              textAlign: "center",
              p: 3,
              boxShadow: "0 10px 25px rgba(0,0,0,.08)",
            }}
          >
            <Avatar
              sx={{
                width: 120,
                height: 120,
                mx: "auto",
                mb: 2,
                bgcolor: "#2563EB",
                fontSize: 42,
              }}
            >
              {candidate.name.charAt(0)}
            </Avatar>

            <Typography variant="h5" fontWeight="bold">
              {candidate.name}
            </Typography>

            <Typography color="text.secondary" mb={2}>
              Candidate ID #{candidate.id}
            </Typography>

            <Chip
              color="success"
              label="Available"
            />

            <Divider sx={{ my: 3 }} />

            <Stack spacing={2} alignItems="flex-start">

              <Box display="flex" alignItems="center" gap={1}>
                <EmailIcon color="primary" />
                <Typography>{candidate.email}</Typography>
              </Box>

              <Box display="flex" alignItems="center" gap={1}>
                <PhoneIcon color="primary" />
                <Typography>{candidate.phone}</Typography>
              </Box>

            </Stack>
          </Card>
        </Grid>

        {/* Right Details */}
        <Grid item xs={12} md={8}>
          <Card
            sx={{
              borderRadius: 4,
              boxShadow: "0 10px 25px rgba(0,0,0,.08)",
            }}
          >
            <CardContent>

              <Typography
                variant="h5"
                fontWeight="bold"
                mb={3}
              >
                Candidate Information
              </Typography>

              <Divider sx={{ mb: 3 }} />

              <Grid container spacing={3}>

                <Grid item xs={12} sm={6}>
                  <Box display="flex" gap={2}>
                    <PersonIcon color="primary" />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Full Name
                      </Typography>

                      <Typography fontWeight="bold">
                        {candidate.name}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Box display="flex" gap={2}>
                    <EmailIcon color="primary" />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Email
                      </Typography>

                      <Typography fontWeight="bold">
                        {candidate.email}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Box display="flex" gap={2}>
                    <PhoneIcon color="primary" />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Phone
                      </Typography>

                      <Typography fontWeight="bold">
                        {candidate.phone}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Box display="flex" gap={2}>
                    <SchoolIcon color="primary" />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Education
                      </Typography>

                      <Typography fontWeight="bold">
                        {candidate.education}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Box display="flex" gap={2}>
                    <WorkIcon color="primary" />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Experience
                      </Typography>

                      <Typography fontWeight="bold">
                        {candidate.experience}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

              </Grid>

            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </MainLayout>
  );
}

export default CandidateDetails;