import { Box, Tooltip, Typography } from "@mui/material";
import { useFieldValue } from "react-admin";

const Status = {
  Ongoing: { label: "Ongoing", color: "green" },
  Finished: { label: "Finished", color: "red" },
} as const;

export const GameStatus = () => {
  const gameState = useFieldValue({ source: "game_state" });

  const gameStateVal = JSON.parse(gameState);
  const status =
    gameStateVal.victoryState.player != null ||
    gameStateVal.victoryState?.isDraw
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
