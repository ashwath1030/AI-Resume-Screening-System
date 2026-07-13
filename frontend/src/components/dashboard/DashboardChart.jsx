import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import {
  Paper,
  Typography,
  Box,
  Chip,
} from "@mui/material";

import TrendingUpIcon from "@mui/icons-material/TrendingUp";

function DashboardChart({ data }) {

  const growth =
    data && data.length >= 2
      ? (
          ((data[data.length - 1].uploads -
            data[data.length - 2].uploads) /
            data[data.length - 2].uploads) *
          100
        ).toFixed(1)
      : 0;

  return (
    <Paper
      sx={{
        mt: 4,
        p: 3,
        borderRadius: 4,
        boxShadow: "0 10px 25px rgba(0,0,0,.08)",
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Box>
          <Typography
            variant="h5"
            fontWeight="bold"
          >
            Resume Upload Analytics
          </Typography>

          <Typography
            color="text.secondary"
            variant="body2"
          >
            Monthly Resume Uploads
          </Typography>
        </Box>

        <Chip
          icon={<TrendingUpIcon />}
          label={`+${growth}%`}
          color="success"
        />
      </Box>

      <ResponsiveContainer
        width="100%"
        height={350}
      >
        <BarChart data={data}>
          <CartesianGrid
            strokeDasharray="4 4"
            vertical={false}
          />

          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
          />

          <YAxis
            tickLine={false}
            axisLine={false}
          />

          <Tooltip />

          <Bar
            dataKey="uploads"
            radius={[8, 8, 0, 0]}
            fill="#2563EB"
          />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
}

export default DashboardChart;