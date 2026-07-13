import { useDropzone } from "react-dropzone";

import {
  Box,
  Paper,
  Typography,
} from "@mui/material";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DescriptionIcon from "@mui/icons-material/Description";

function ResumeDropzone({ onFileSelect }) {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
        ".docx",
      ],
    },

    maxFiles: 1,

    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0]);
      }
    },
  });

  return (
    <Paper
      {...getRootProps()}
      elevation={0}
      sx={{
        p: 5,
        textAlign: "center",
        borderRadius: 4,
        cursor: "pointer",
        border: "2px dashed",
        borderColor: isDragActive ? "#1565C0" : "#90CAF9",
        backgroundColor: isDragActive ? "#E3F2FD" : "#FAFBFC",
        transition: "all .3s ease",

        "&:hover": {
          borderColor: "#1565C0",
          backgroundColor: "#F4F8FF",
          transform: "translateY(-3px)",
          boxShadow: "0 10px 25px rgba(0,0,0,.08)",
        },
      }}
    >
      <input {...getInputProps()} />

      <Box
        sx={{
          width: 90,
          height: 90,
          borderRadius: "50%",
          bgcolor: "#E3F2FD",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mx: "auto",
          mb: 3,
        }}
      >
        <CloudUploadIcon
          sx={{
            fontSize: 50,
            color: "#1565C0",
          }}
        />
      </Box>

      <Typography
        variant="h5"
        fontWeight="bold"
        gutterBottom
      >
        {isDragActive
          ? "Drop your resume here"
          : "Drag & Drop Resume"}
      </Typography>

      <Typography
        color="text.secondary"
        sx={{ mb: 3 }}
      >
        or click anywhere to browse your files
      </Typography>

      <Box
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: 1,
          px: 3,
          py: 1,
          borderRadius: 3,
          bgcolor: "#F5F5F5",
        }}
      >
        <DescriptionIcon
          sx={{
            color: "#1976D2",
          }}
        />

        <Typography variant="body2">
          Supported: PDF, DOC, DOCX
        </Typography>
      </Box>

      <Typography
        variant="caption"
        display="block"
        color="text.secondary"
        sx={{ mt: 3 }}
      >
        Maximum file size: 5 MB
      </Typography>
    </Paper>
  );
}

export default ResumeDropzone;