import { Box, Tooltip, Typography } from "@mui/material";
import { useFieldValue } from "react-admin";

const Status = {
  Ongoing: { label: "Ongoing", color: "#4CAF50" },
  Finished: { label: "Finished", color: "#9E9E9E" },
} as const;

export const GameStatus = () => {
  const gameState = useFieldValue({ source: "game_state" });

  const status =
    gameState.victoryState.player != null || gameState.victoryState?.isDraw
      ? Status.Finished
      : Status.Ongoing;

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
