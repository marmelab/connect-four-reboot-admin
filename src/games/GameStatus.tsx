import { Box, Tooltip, Typography } from "@mui/material";
import { useFieldValue } from "react-admin";

const Status = {
  Ongoing: { label: "Ongoing", color: "#4CAF50" },
  Finished: { label: "Finished", color: "#9E9E9E" },
} as const;

export const statusChoices = Object.entries(Status).map(([key, value]) => ({
  id: key,
  name: value.label,
}));

export const GameStatus = () => {
  const gameStatus = useFieldValue({ source: "_game_status" });

  const status =
    gameStatus === Status.Finished.label ? Status.Finished : Status.Ongoing;

  return (
    <>
      <Tooltip title={status.label} placement="top">
        <Box display="flex" alignItems="center">
          <Box
            width={10}
            height={10}
            borderRadius="50%"
            bgcolor={status.color}
            marginRight={1}
          />
          <Typography variant="body2">{status.label}</Typography>
        </Box>
      </Tooltip>
    </>
  );
};
