import { useEffect, useState } from "react";

import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Chip,
} from "@mui/material";

import WorkIcon from "@mui/icons-material/Work";
import BusinessIcon from "@mui/icons-material/Business";
import DescriptionIcon from "@mui/icons-material/Description";
import PsychologyIcon from "@mui/icons-material/Psychology";
import TimelineIcon from "@mui/icons-material/Timeline";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";

import MainLayout from "../layout/MainLayout";

import {
  getJobs,
  createJob,
  deleteJob,
  updateJob,
} from "../services/jobService";

function Jobs() {
  const [jobs, setJobs] = useState([]);

  // Add Job
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState("");

  // Edit Job
  const [editingJob, setEditingJob] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editCompany, setEditCompany] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editExperience, setEditExperience] = useState("");
  const [editSkills, setEditSkills] = useState("");

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    const data = await getJobs();
    setJobs(data);
  };

  const handleAddJob = async () => {
    if (
      !title ||
      !company ||
      !description ||
      !experience ||
      !skills
    ) {
      alert("Please fill all fields");
      return;
    }

    await createJob({
      title,
      company,
      description,
      experience,
      skills,
    });

    setTitle("");
    setCompany("");
    setDescription("");
    setExperience("");
    setSkills("");

    loadJobs();
  };

  const handleDeleteJob = async (id) => {
    if (!window.confirm("Delete this job?")) return;

    await deleteJob(id);
    loadJobs();
  };

  const handleEditClick = (job) => {
    setEditingJob(job);

    setEditTitle(job.title);
    setEditCompany(job.company);
    setEditDescription(job.description);
    setEditExperience(job.experience);
    setEditSkills(job.skills);
  };

  const handleUpdateJob = async () => {
    await updateJob(editingJob.id, {
      title: editTitle,
      company: editCompany,
      description: editDescription,
      experience: editExperience,
      skills: editSkills,
    });

    setEditingJob(null);

    loadJobs();
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
        <Typography
          variant="h4"
          fontWeight="bold"
        >
          Job Management
        </Typography>

        <Typography sx={{ mt: 1 }}>
          Create, edit and manage job openings.
        </Typography>

        <Chip
          label={`${jobs.length} Active Jobs`}
          sx={{
            mt: 2,
            bgcolor: "rgba(255,255,255,.18)",
            color: "#fff",
            fontWeight: "bold",
          }}
        />
      </Paper>

      {/* Add Job */}

      <Card
        sx={{
          mb: 4,
          borderRadius: 4,
          boxShadow: "0 8px 25px rgba(0,0,0,.08)",
        }}
      >
        <CardContent>

          <Typography
            variant="h5"
            fontWeight="bold"
            mb={3}
          >
            Add New Job
          </Typography>

          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={3}>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Job Title"
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                InputProps={{
                  startAdornment:<WorkIcon sx={{mr:1,color:"#1976d2"}}/>
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Company"
                value={company}
                onChange={(e)=>setCompany(e.target.value)}
                InputProps={{
                  startAdornment:<BusinessIcon sx={{mr:1,color:"#1976d2"}}/>
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Experience"
                value={experience}
                onChange={(e)=>setExperience(e.target.value)}
                InputProps={{
                  startAdornment:<TimelineIcon sx={{mr:1,color:"#1976d2"}}/>
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Skills"
                value={skills}
                onChange={(e)=>setSkills(e.target.value)}
                InputProps={{
                  startAdornment:<PsychologyIcon sx={{mr:1,color:"#1976d2"}}/>
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={5}
                label="Job Description"
                value={description}
                onChange={(e)=>setDescription(e.target.value)}
                InputProps={{
                  startAdornment:<DescriptionIcon sx={{mr:1,mt:1,color:"#1976d2"}}/>
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                size="large"
                startIcon={<AddCircleIcon />}
                onClick={handleAddJob}
                sx={{
                  borderRadius:2,
                  px:4,
                  py:1.5,
                  fontWeight:"bold"
                }}
              >
                Add Job
              </Button>
            </Grid>

          </Grid>

        </CardContent>
      </Card>
          {/* Jobs Table */}

      <Card
        sx={{
          borderRadius: 4,
          boxShadow: "0 8px 25px rgba(0,0,0,.08)",
        }}
      >
        <CardContent>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
          >
            <Typography
              variant="h5"
              fontWeight="bold"
            >
              Available Jobs
            </Typography>

            <Chip
              color="primary"
              label={`${jobs.length} Jobs`}
            />
          </Box>

          <Divider sx={{ mb: 3 }} />

          <TableContainer component={Paper} elevation={0}
            sx={{ overflowX: "auto",borderRadius: 3,}} >
            <Table>

              <TableHead>
  <TableRow sx={{ bgcolor: "#f5f7fb" }}>
    <TableCell sx={{ width: 60 }}><strong>ID</strong></TableCell>
    <TableCell sx={{ width: 180 }}><strong>Job</strong></TableCell>
    <TableCell sx={{ width: 160 }}><strong>Company</strong></TableCell>
    <TableCell sx={{ width: 120 }}><strong>Experience</strong></TableCell>
    <TableCell sx={{ width: 220 }}><strong>Skills</strong></TableCell>
    <TableCell sx={{ minWidth: 250 }}><strong>Description</strong></TableCell>
    <TableCell sx={{ width: 170 }} align="center">
      <strong>Actions</strong>
    </TableCell>
  </TableRow>
</TableHead>

              <TableBody>

                {jobs.map((job) => (

                  <TableRow
                    key={job.id}
                    hover
                    sx={{
                      "& td": {
                        verticalAlign: "top",
                      },
                    }}
                  >

                    <TableCell>
                      {job.id}
                    </TableCell>

                    <TableCell>

                      <Box>

                        <Typography
                          fontWeight="bold"
                        >
                          {job.title}
                        </Typography>

                      </Box>

                    </TableCell>

                    <TableCell>

                      <Chip
                        icon={<BusinessIcon />}
                        label={job.company}
                        color="info"
                        variant="outlined"
                      />

                    </TableCell>

                    <TableCell>

                      <Chip
                        color="secondary"
                        label={job.experience}
                      />

                    </TableCell>

                    <TableCell>

                      <Box sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 0.5,
                        maxWidth: 220,
                        }}
                        >
                        {job.skills
                          ?.split(",")
                          .map((skill, index) => (

                            <Chip
  key={index}
  label={skill.trim()}
  size="small"
  color="success"
  sx={{
    maxWidth: 95,
    "& .MuiChip-label": {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
  }}
/>

                          ))}
                      </Box>

                    </TableCell>

                    <TableCell sx={{ maxWidth: 250 }}>
  <Typography
    variant="body2"
    sx={{
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "-webkit-box",
      WebkitLineClamp: 2,
      WebkitBoxOrient: "vertical",
    }}
  >
    {job.description}
  </Typography>
</TableCell>

                    <TableCell align="center">

                      <Box
                        display="flex"
                        justifyContent="center"
                        gap={1}
                      >

                        <Button
                          variant="contained"
                          color="primary"
                          startIcon={<EditIcon />}
                          onClick={() =>
                            handleEditClick(job)
                          }
                          sx={{
                            borderRadius: 2,
                            textTransform: "none",
                          }}
                        >
                          Edit
                        </Button>

                        <Button
                          variant="contained"
                          color="error"
                          startIcon={<DeleteIcon />}
                          onClick={() =>
                            handleDeleteJob(job.id)
                          }
                          sx={{
                            borderRadius: 2,
                            textTransform: "none",
                          }}
                        >
                          Delete
                        </Button>

                      </Box>

                    </TableCell>

                  </TableRow>

                ))}

              </TableBody>

            </Table>

          </TableContainer>

        </CardContent>

      </Card>

          {/* Edit Dialog */}

      <Dialog
        open={editingJob !== null}
        onClose={() => setEditingJob(null)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle
          sx={{
            bgcolor: "#1565C0",
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          Edit Job
        </DialogTitle>

        <DialogContent sx={{ pt: 3 }}>

          <Grid container spacing={3} sx={{ mt: 1 }}>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Job Title"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <WorkIcon
                      sx={{
                        mr: 1,
                        color: "#1976d2",
                      }}
                    />
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Company"
                value={editCompany}
                onChange={(e) => setEditCompany(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <BusinessIcon
                      sx={{
                        mr: 1,
                        color: "#1976d2",
                      }}
                    />
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Experience"
                value={editExperience}
                onChange={(e) => setEditExperience(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <TimelineIcon
                      sx={{
                        mr: 1,
                        color: "#1976d2",
                      }}
                    />
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Skills"
                value={editSkills}
                onChange={(e) => setEditSkills(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <PsychologyIcon
                      sx={{
                        mr: 1,
                        color: "#1976d2",
                      }}
                    />
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={5}
                label="Job Description"
                value={editDescription}
                onChange={(e) =>
                  setEditDescription(e.target.value)
                }
                InputProps={{
                  startAdornment: (
                    <DescriptionIcon
                      sx={{
                        mr: 1,
                        mt: 1,
                        color: "#1976d2",
                      }}
                    />
                  ),
                }}
              />
            </Grid>

          </Grid>

        </DialogContent>

        <DialogActions sx={{ p: 3 }}>

          <Button
            variant="outlined"
            onClick={() => setEditingJob(null)}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={handleUpdateJob}
            sx={{
              borderRadius: 2,
              px: 3,
            }}
          >
            Update Job
          </Button>

        </DialogActions>

      </Dialog>

    </MainLayout>
  );
}

export default Jobs;