"use client";
import React, { useState } from "react";
import {
  Card,
  Typography,
  Stack,
  TextField,
  Grid,
  ToggleButton,
  Chip,
} from "@mui/material";
import { NormalizedSupplyItem } from "@/features/SupplyDepot/useFetchAllData";

interface SupplyRequirementListProps {
  supplies?: NormalizedSupplyItem[];
}

const SupplyRequirementList = ({ supplies }: SupplyRequirementListProps) => {
  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>(
    {}
  );
  const handleChange = (event: React.MouseEvent<HTMLElement>, id: string) => {
    const checked = event.target.value === "check";
    setSelectedItems((prev) => ({ ...prev, [id]: checked }));
  };
  //   const [selected, setSelected] = React.useState(false);
  return (
    <section aria-labelledby="station-info" className="space-y-6">
      <Card variant="outlined" sx={{ p: 2 }}>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          目前需求列表，可提供請點選並填寫數量
        </Typography>
        <Stack spacing={0} sx={{ maxHeight: "80dvh", overflow: "auto" }}>
          <Grid container spacing={1}>
            <Grid size={1}></Grid>
            <Grid size={8}>
              <Typography textAlign="center">需求</Typography>
            </Grid>
            <Grid size={3}>
              <Typography textAlign="center">可提供</Typography>
            </Grid>
          </Grid>
          <Stack spacing={1} sx={{ maxHeight: "70dvh", overflow: "auto" }}>
            {supplies?.map(
              ({ id, name, total_count, recieved_count, unit }) => (
                <Grid container spacing={1} key={id}>
                  <Grid size={2} alignItems="center" display="flex">
                    <Chip
                      label="已回報"
                      color="success"
                      size="small"
                      sx={{ fontSize: 10 }}
                    />
                  </Grid>
                  <Grid size={7}>
                    <ToggleButton
                      value="check"
                      selected={selectedItems?.[id] || false}
                      color="success"
                      fullWidth
                      size="small"
                      sx={{ fontSize: 14 }}
                      onChange={(e) => handleChange(e, id)}
                    >
                      {name} {recieved_count}/{total_count} {unit}
                    </ToggleButton>
                  </Grid>
                  <Grid size={3} alignItems="center" display="flex">
                    <TextField
                      id="stationName"
                      placeholder="數量"
                      variant="outlined"
                      size="small"
                      type="number"
                    />
                  </Grid>
                </Grid>
              )
            )}
          </Stack>
        </Stack>
      </Card>
    </section>
  );
};

export default SupplyRequirementList;
