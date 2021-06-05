import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from "@material-ui/core";
import groupBy from "lodash/groupBy";
import { Close } from "@material-ui/icons";
import React, { useState } from "react";
import countryJson from "./constants/country.json";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (polygons: string[]) => void;
}

const LocationSettingsDialog = ({ open, onClose, onSubmit }: Props) => {
  const [cityName, setCityName] = useState<string | null>(null);
  const [selection, setSelection] = useState<string[]>([]);

  const groups = groupBy(countryJson.maps, "city");

  const handleCitySelect = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCityName(event.target.value as string);
  };

  const handleSelectionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const code = event.target.name;
    if (selection.includes(code)) {
      setSelection((prev) => prev.filter((v) => v !== code));
    } else {
      setSelection((prev) => [...prev, code]);
    }
  };

  const city = cityName ? groups[cityName] : null;

  const handleSubmit = () => {
    const polygons = countryJson.maps
      .filter((v) => selection.includes(v.code))
      .map((v) => v.polygon[0]);
    onSubmit(polygons);
  };

  return (
    <Dialog onClose={onClose} open={open} maxWidth="md" fullWidth>
      <DialogTitle>Set backup account</DialogTitle>
      <DialogContent>
        <Box display="flex" justifyContent="space-between">
          <TextField
            sx={{ minWidth: 160 }}
            value={cityName}
            onChange={handleCitySelect}
            select
          >
            {Object.keys(groups).map((cityName) => (
              <MenuItem value={cityName}>{cityName}</MenuItem>
            ))}
          </TextField>
          <Box display="flex">
            <Button sx={{ mr: 1.25 }} variant="contained" disableElevation>
              전체선택
            </Button>
            <Button variant="outlined">선택해제</Button>
          </Box>
        </Box>
        <Grid
          container
          spacing={0}
          sx={{
            borderLeft: "1px solid",
            borderTop: "1px solid",
            borderColor: (theme) => theme.palette.divider,
          }}
        >
          {city &&
            city.map(({ code, country }) => (
              <Grid
                item
                xs={4}
                sx={{
                  borderRight: "1px solid",
                  borderBottom: "1px solid",
                  borderColor: (theme) => theme.palette.divider,
                  px: 2,
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selection.includes(code)}
                      onChange={handleSelectionChange}
                      name={code}
                      color="primary"
                    />
                  }
                  label={country}
                />
              </Grid>
            ))}

          <Grid item></Grid>
        </Grid>
        <Typography>선택 지역</Typography>
        <Grid
          container
          spacing={0}
          sx={{
            borderLeft: "1px solid",
            borderTop: "1px solid",
            borderColor: (theme) => theme.palette.divider,
          }}
        >
          {selection &&
            selection.map((v) => (
              <Grid
                item
                xs={4}
                sx={{
                  borderRight: "1px solid",
                  borderBottom: "1px solid",
                  borderColor: (theme) => theme.palette.divider,
                  px: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {v}
                <IconButton>
                  <Close />
                </IconButton>
              </Grid>
            ))}
        </Grid>
        <Box display="flex" justifyContent="center" py={3.75}>
          <Button
            onClick={handleSubmit}
            sx={{ marginLeft: "auto", marginRight: "auto", width: 180 }}
            variant="contained"
            disableElevation
          >
            지역 선택 완료
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default LocationSettingsDialog;
