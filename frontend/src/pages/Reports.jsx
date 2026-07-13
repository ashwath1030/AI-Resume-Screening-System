import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  Typography,
} from "@mui/material";

import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import TableChartIcon from "@mui/icons-material/TableChart";
import AssessmentIcon from "@mui/icons-material/Assessment";
import DescriptionIcon from "@mui/icons-material/Description";

import MainLayout from "../layout/MainLayout";
import { downloadPDF, downloadExcel } from "../services/reportService";

function Reports() {
  const handlePDF = async () => {
    try {
      const data = await downloadPDF();

      const url = window.URL.createObjectURL(
        new Blob([data])
      );

      const link = document.createElement("a");

      link.href = url;
      link.download = "candidate_report.pdf";

      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.log(error);
      alert("Failed to download PDF");
    }
  };

  const handleExcel = async () => {
    try {
      const data = await downloadExcel();

      const url = window.URL.createObjectURL(
        new Blob([data])
      );

      const link = document.createElement("a");

      link.href = url;
      link.download = "candidate_report.xlsx";

      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.log(error);
      alert("Failed to download Excel");
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
          Reports
        </Typography>

        <Typography sx={{ mt: 1 }}>
          Generate and download candidate ranking reports.
        </Typography>
      </Paper>

      <Grid container spacing={3}>

        {/* PDF Card */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              borderRadius: 4,
              boxShadow: "0 8px 20px rgba(0,0,0,.08)",
              transition: ".3s",
              "&:hover": {
                transform: "translateY(-5px)",
              },
            }}
          >
            <CardContent sx={{ textAlign: "center", p: 5 }}>

              <PictureAsPdfIcon
                sx={{
                  fontSize: 70,
                  color: "#e53935",
                  mb: 2,
                }}
              />

              <Typography
                variant="h5"
                fontWeight="bold"
                gutterBottom
              >
                PDF Report
              </Typography>

              <Typography
                color="text.secondary"
                mb={4}
              >
                Download a professional candidate ranking
                report in PDF format.
              </Typography>

              <Button
                variant="contained"
                color="error"
                size="large"
                startIcon={<DescriptionIcon />}
                onClick={handlePDF}
              >
                Download PDF
              </Button>

            </CardContent>
          </Card>
        </Grid>

        {/* Excel Card */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              borderRadius: 4,
              boxShadow: "0 8px 20px rgba(0,0,0,.08)",
              transition: ".3s",
              "&:hover": {
                transform: "translateY(-5px)",
              },
            }}
          >
            <CardContent sx={{ textAlign: "center", p: 5 }}>

              <TableChartIcon
                sx={{
                  fontSize: 70,
                  color: "#2e7d32",
                  mb: 2,
                }}
              />

              <Typography
                variant="h5"
                fontWeight="bold"
                gutterBottom
              >
                Excel Report
              </Typography>

              <Typography
                color="text.secondary"
                mb={4}
              >
                Export candidate ranking data in Excel
                format for analysis.
              </Typography>

              <Button
                variant="contained"
                color="success"
                size="large"
                startIcon={<AssessmentIcon />}
                onClick={handleExcel}
              >
                Download Excel
              </Button>

            </CardContent>
          </Card>
        </Grid>

      </Grid>

      {/* Information Card */}
      <Paper
        sx={{
          mt: 4,
          p: 3,
          borderRadius: 4,
          bgcolor: "#f8fafc",
        }}
      >
        <Typography
          variant="h6"
          fontWeight="bold"
          gutterBottom
        >
          Report Features
        </Typography>

        <Typography color="text.secondary">
          • AI-ranked candidate list<br />
          • Candidate scores and rankings<br />
          • Professional report format<br />
          • One-click PDF and Excel export
        </Typography>
      </Paper>

    </MainLayout>
  );
}

export default Reports;