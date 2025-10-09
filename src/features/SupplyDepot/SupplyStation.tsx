"use client";
import React from "react";
import { Card, TextField, Typography, Stack } from "@mui/material";

const SupplyStation = () => {
  return (
    <section aria-labelledby="station-info" className="space-y-6">
      <Card variant="outlined" sx={{ p: 2 }}>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          物資站資訊
        </Typography>
        <Stack spacing={2}>
          <TextField
            id="stationName"
            label="名稱"
            placeholder="例：光復里物資站"
            variant="outlined"
            size="small"
            margin="dense"
            required
          />
          <TextField
            id="stationPhone"
            label="電話"
            placeholder="例：0912345678"
            variant="outlined"
            size="small"
            margin="dense"
            required
          />
          <TextField
            id="stationAddress"
            label="地址"
            placeholder="例：花蓮縣光復鄉…"
            variant="outlined"
            size="small"
            margin="dense"
            required
          />
        </Stack>
      </Card>
    </section>
  );
};

export default SupplyStation;
