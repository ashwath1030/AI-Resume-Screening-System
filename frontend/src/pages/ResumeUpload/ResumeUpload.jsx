import { useState } from "react";

import {
  Box,
  Button,
//   Chip,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";

import UploadFileIcon from "@mui/icons-material/UploadFile";
import DescriptionIcon from "@mui/icons-material/Description";
// import PsychologyIcon from "@mui/icons-material/Psychology";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import CandidateInfo from "../../components/resume/CandidateInfo";
import ResumeScore from "../../components/resume/ResumeScore";
import SkillsCard from "../../components/resume/SkillsCard";
// import RecommendationCard from "../../components/resume/RecommendationCard";
import ResumePreview from "../../components/resume/ResumePreview";
// import AnalysisCard from "../../components/resume/AnalysisCard";
// import MissingSkills from "../../components/resume/MissingSkills";

import MainLayout from "../../layout/MainLayout";
import ResumeDropzone from "../../components/resume/ResumeDropzone";

import { uploadResume } from "../../services/resumeService";

function ResumeUpload() {
  const [file, setFile] = useState(null);

  const [result, setResult] = useState(null);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a resume.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Maximum file size is 5 MB");
      return;
    }

    try {
      const response = await uploadResume(file);

      setResult(response);
    } catch (error) {
      console.log(error);
      alert("Upload Failed");
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
          Resume Upload
        </Typography>

        <Typography sx={{ mt: 1 }}>
          Upload a candidate resume for AI-based analysis.
        </Typography>
      </Paper>

      <Grid container spacing={3}>

        {/* Upload Card */}
        <Grid item xs={12} md={5}>

          <Paper
            sx={{
              p: 4,
              borderRadius: 4,
              height: "100%",
            }}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              gutterBottom
            >
              Upload Resume
            </Typography>

            <Divider sx={{ mb: 3 }} />

            <ResumeDropzone
              onFileSelect={setFile}
            />

            {file && (
              <Paper
                sx={{
                  mt: 3,
                  p: 2,
                  bgcolor: "#f8fafc",
                  borderRadius: 3,
                }}
              >
                <Box display="flex" gap={2}>
                  <DescriptionIcon color="primary" />

                  <Box>

                    <Typography fontWeight="bold">
                      {file.name}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      {(file.size / 1024).toFixed(2)} KB
                    </Typography>

                  </Box>
                </Box>
              </Paper>
            )}

            <Button
              fullWidth
              size="large"
              variant="contained"
              startIcon={<UploadFileIcon />}
              sx={{
                mt: 3,
                borderRadius: 2,
                py: 1.5,
              }}
              onClick={handleUpload}
            >
              Upload Resume
            </Button>

          </Paper>

        </Grid>

        {/* Result Card */}
        <Grid item xs={12} md={7}>

  {!result ? (

    <Paper
      sx={{
        p: 5,
        borderRadius: 4,
        minHeight: 500,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography color="text.secondary">
        Upload a resume to view AI Analysis
      </Typography>
    </Paper>

  ) : (

    <Grid container spacing={3}>

      <Grid item xs={12} md={6}>
        <CandidateInfo resume={result} />
      </Grid>

      <Grid item xs={12} md={6}>
        <ResumeScore score={result.score || 0} />
      </Grid>

      <Grid item xs={12}>
        <SkillsCard skills={result.skills || []} />
      </Grid>
      {/* <Grid item xs={12}>
        <AnalysisCard />
        </Grid> */}

      {/* <Grid item xs={12}>
        <RecommendationCard />
      </Grid> */}

      <Grid item xs={12}>
        <ResumePreview text={result.resume_text} />
      </Grid>

    </Grid>

  )}

</Grid>
      </Grid>

    </MainLayout>
  );
}

export default ResumeUpload;