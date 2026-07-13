import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { useState, useEffect } from "react";

export default function EmailDialog({
  open,
  onClose,
  candidate,
  onSend,
}) {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
  if (candidate) {
    setSubject("Interview Invitation");

    setBody(
`Dear ${candidate.candidate_name},

Congratulations!

Based on our AI Resume Screening System, your profile has been shortlisted.

AI Match Score : ${candidate.score}%

We would like to invite you for the next interview round.

Regards,
HR Team`
    );
  }
}, [candidate]);
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Send Email</DialogTitle>

      <DialogContent>

        <TextField
          margin="normal"
          label="To"
          fullWidth
          value={candidate?.email || ""}
          disabled
        />

        <TextField
          margin="normal"
          label="Subject"
          fullWidth
          value={subject}
          onChange={(e)=>setSubject(e.target.value)}
        />

        <TextField
          margin="normal"
          label="Message"
          multiline
          rows={8}
          fullWidth
          value={body}
          onChange={(e)=>setBody(e.target.value)}
        />

      </DialogContent>

      <DialogActions>

        <Button
          onClick={onClose}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={() => {
  if (!candidate) return;

  onSend({
    email: candidate.email,
    subject,
    body,
  });
}}
        >
          Send
        </Button>

      </DialogActions>

    </Dialog>
  );
}