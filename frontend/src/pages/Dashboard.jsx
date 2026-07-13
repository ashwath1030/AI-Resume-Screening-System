import { useEffect, useState } from "react";

import { Box, Grid } from "@mui/material";

import MainLayout from "../layout/MainLayout";

import DashboardCards from "../components/dashboard/DashboardCards";
import DashboardChart from "../components/dashboard/DashboardChart";
import RecentCandidates from "../components/dashboard/RecentCandidates";
import RecentJobs from "../components/dashboard/RecentJobs";
import QuickActions from "../components/dashboard/QuickActions";
import DashboardHeader from "../components/dashboard/DashboardHeader";

import { getDashboardStats } from "../services/dashboardService";

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const data = await getDashboardStats();
      setDashboard(data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!dashboard) {
    return (
      <MainLayout>
        Loading Dashboard...
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Box>
        <DashboardHeader />
        <DashboardCards
          stats={{
            totalCandidates: dashboard.totalCandidates,
            totalJobs: dashboard.totalJobs,
            uploadedResumes: dashboard.totalResumes,
            topCandidate:
              dashboard.topCandidates.length > 0
                ? dashboard.topCandidates[0].score + "%"
                : "N/A",
          }}
        />

        {/* <DashboardChart data={dashboard.chartData} /> */}
        <DashboardChart
  data={[
    { month: "Jan", uploads: 5 },
    { month: "Feb", uploads: 9 },
    { month: "Mar", uploads: 12 },
    { month: "Apr", uploads: 18 },
    { month: "May", uploads: 15 },
  ]}
/>

        {/* Recent Candidates & Recent Jobs */}
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} md={8}>
            <RecentCandidates
              candidates={dashboard.topCandidates}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <RecentJobs
              jobs={dashboard.latestJobs}
            />
          </Grid>
        </Grid>

        {/* Quick Actions */}
        <Box sx={{ mt: 3 }}>
          <QuickActions />
        </Box>
      </Box>
    </MainLayout>
  );
}

export default Dashboard;