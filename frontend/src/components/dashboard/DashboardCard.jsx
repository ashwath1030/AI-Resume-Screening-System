import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
} from "@mui/material";

function DashboardCard({
  title,
  value,
  icon,
  color,
  subtitle,
}) {
  return (
    <Card
      sx={{
        borderRadius: 4,
        overflow: "hidden",
        transition: "0.3s",
        cursor: "pointer",
        boxShadow: "0 10px 25px rgba(0,0,0,.08)",

        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 18px 35px rgba(0,0,0,.15)",
        },
      }}
    >
      <Box
        sx={{
          height: 6,
          background: color,
        }}
      />

      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Typography
              variant="body2"
              color="text.secondary"
            >
              {title}
            </Typography>

            <Typography
              variant="h4"
              fontWeight="bold"
              mt={1}
            >
              {value}
            </Typography>

            <Typography
              variant="caption"
              color="text.secondary"
            >
              {subtitle}
            </Typography>
          </Box>

          <Avatar
            sx={{
              bgcolor: color,
              width: 58,
              height: 58,
            }}
          >
            {icon}
          </Avatar>
        </Box>
      </CardContent>
    </Card>
  );
}

export default DashboardCard;