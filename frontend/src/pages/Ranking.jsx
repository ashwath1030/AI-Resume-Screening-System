import { useState, useEffect } from "react";

import {
  Avatar,
  Box,
  Button,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import PersonIcon from "@mui/icons-material/Person";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import EmailIcon from "@mui/icons-material/Email";
import EmailDialog from "../components/EmailDialog";
import { sendEmail } from "../services/emailService";

import MainLayout from "../layout/MainLayout";

import { rankCandidates } from "../services/rankingService";
import { getJobs } from "../services/jobService";

function Ranking() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState("");
  const [result, setResult] = useState([]);
  const [selectedCandidate,setSelectedCandidate]=useState(null);

const [openEmail,setOpenEmail]=useState(false);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const data = await getJobs();
      setJobs(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRanking = async () => {
    if (!selectedJob) {
      alert("Please select a job");
      return;
    }

    try {
      const response = await rankCandidates(selectedJob);
      setResult(response);
    } catch (error) {
      console.log(error);
      alert("Ranking Failed");
    }
  }; const handleSendEmail = async (data) => {
  try {
    await sendEmail(data);

    alert("Email sent successfully");

    setOpenEmail(false);
  } catch (error) {
    console.log(error);
    alert("Failed to send email");
  }
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
          AI Candidate Ranking
        </Typography>

        <Typography sx={{ mt: 1 }}>
          Select a job and rank candidates using AI.
        </Typography>
      </Paper>

      {/* Selection Card */}
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 4,
          mb: 3,
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={8}>
            <FormControl fullWidth>
              <InputLabel>Select Job</InputLabel>

              <Select
                value={selectedJob}
                label="Select Job"
                onChange={(e) =>
                  setSelectedJob(e.target.value)
                }
              >
                {jobs.map((job) => (
                  <MenuItem
                    key={job.id}
                    value={job.id}
                  >
                    {job.title} - {job.company}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={4}>
            <Button
              fullWidth
              size="large"
              variant="contained"
              startIcon={<WorkspacePremiumIcon />}
              onClick={handleRanking}
              sx={{
                height: 56,
                borderRadius: 2,
                fontWeight: "bold",
              }}
            >
              Rank Candidates
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Results */}
      {result.length > 0 && (
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 4,
          }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            mb={3}
          >
            Ranking Results
          </Typography>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow
                  sx={{
                    bgcolor: "#f4f7fb",
                  }}
                >
                  <TableCell>
                    <strong>Rank</strong>
                  </TableCell>

                  <TableCell>
                    <strong>Candidate</strong>
                  </TableCell>

                  <TableCell>
                    <strong>Score</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Action</strong>
                  </TableCell>
                
                </TableRow>
              </TableHead>

              <TableBody>
                {result.map((candidate, index) => (
                  <TableRow
                    key={index}
                    hover
                  >
                    <TableCell>
                      <Chip
                        color={
                          index === 0
                            ? "warning"
                            : "primary"
                        }
                        icon={
                          index === 0 ? (
                            <EmojiEventsIcon />
                          ) : (
                            <TrendingUpIcon />
                          )
                        }
                        label={`#${index + 1}`}
                      />
                    </TableCell>

                    <TableCell>
                      <Box
                        display="flex"
                        alignItems="center"
                        gap={2}
                      >
                        <Avatar
                          sx={{
                            bgcolor: "#1976d2",
                          }}
                        >
                          <PersonIcon />
                        </Avatar>

                        <Typography fontWeight={600}>
                          {candidate.candidate_name}
                        </Typography>
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Chip
                        color="success"
                        label={`${candidate.score}%`}
                      />
                    </TableCell>
                          <TableCell>
  <Button
    variant="contained"
    color="success"
    startIcon={<EmailIcon />}
    onClick={() => {
      setSelectedCandidate(candidate);
      setOpenEmail(true);
    }}
  >
    Send Email
  </Button>
</TableCell>
                    
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    <EmailDialog
  open={openEmail}
  candidate={selectedCandidate}
  onClose={() => setOpenEmail(false)}
  onSend={handleSendEmail}
/>
    </MainLayout>
  );
}

export default Ranking;