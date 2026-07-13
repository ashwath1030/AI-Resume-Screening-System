import {
  Avatar,
  Box,
  Chip,
  IconButton,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
 import { useNavigate } from "react-router-dom";

import VisibilityIcon from "@mui/icons-material/Visibility";

function RecentCandidates({ candidates }) {
    const navigate = useNavigate();
  return (
    <Paper
      sx={{
        p: 3,
        mt: 3,
        borderRadius: 4,
        boxShadow: "0 10px 25px rgba(0,0,0,.08)",
      }}
    >
      <Typography
        variant="h5"
        fontWeight="bold"
        mb={3}
      >
        Latest Candidates
      </Typography>

      <Table>

        <TableHead>
          <TableRow>
            <TableCell><b>Candidate</b></TableCell>
            <TableCell><b>Score</b></TableCell>
            <TableCell><b>Status</b></TableCell>
            <TableCell align="center"><b>Action</b></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>

          {(candidates || []).map((candidate) => (

            <TableRow
              key={candidate.candidateId}
              hover
            >
              <TableCell>

                <Box
                  display="flex"
                  alignItems="center"
                  gap={2}
                >

                  <Avatar
                    sx={{
                      bgcolor: "#2563EB",
                    }}
                  >
                    {candidate.candidateId}
                  </Avatar>

                  <Box>

                    <Typography fontWeight="bold">
                      Candidate #{candidate.candidateId}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      Resume Uploaded
                    </Typography>

                  </Box>

                </Box>

              </TableCell>

              <TableCell width={220}>

                <Typography
                  fontWeight="bold"
                  mb={1}
                >
                  {candidate.score}%
                </Typography>

                <LinearProgress
                  variant="determinate"
                  value={candidate.score}
                  sx={{
                    height: 8,
                    borderRadius: 5,
                  }}
                />

              </TableCell>

              <TableCell>

                <Chip
                  label={
                    candidate.score >= 80
                      ? "Excellent"
                      : candidate.score >= 60
                      ? "Good"
                      : "Average"
                  }
                  color={
                    candidate.score >= 80
                      ? "success"
                      : candidate.score >= 60
                      ? "warning"
                      : "error"
                  }
                />

              </TableCell>

            <TableCell align="center">
  <Tooltip title="View Candidate">
    <IconButton
      color="primary"
      onClick={() => navigate(`/candidate/${candidate.candidateId}`)}
    >
      <VisibilityIcon />
    </IconButton>
  </Tooltip>
</TableCell> 

            

            </TableRow>

          ))}

        </TableBody>

      </Table>

    </Paper>
  );
}

export default RecentCandidates;