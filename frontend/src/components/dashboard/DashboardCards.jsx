import { Grid } from "@mui/material";

import DashboardCard from "./DashboardCard";

import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import WorkIcon from "@mui/icons-material/Work";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

function DashboardCards({ stats }) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} lg={3}>
        <DashboardCard
          title="Candidates"
          value={stats.totalCandidates}
          subtitle="Registered Candidates"
          color="#2563EB"
          icon={<PeopleAltIcon />}
        />
      </Grid>

      <Grid item xs={12} sm={8} lg={5}>
        <DashboardCard
          title="Jobs"
          value={stats.totalJobs}
          subtitle="Available Jobs"
          color="#10B981"
          icon={<WorkIcon />}
        />
      </Grid>

      <Grid item xs={12} sm={6} lg={3}>
        <DashboardCard
          title="Uploaded Resumes"
          value={stats.uploadedResumes}
          subtitle="Resume Database"
          color="#F59E0B"
          icon={<UploadFileIcon />}
        />
      </Grid>

      <Grid item xs={12} sm={6} lg={3}>
        <DashboardCard
          title="Top Candidate"
          value={stats.topCandidate}
          subtitle="Highest Match Score"
          color="#8B5CF6"
          icon={<EmojiEventsIcon />}
        />
      </Grid>
    </Grid>
  );
}

export default DashboardCards;