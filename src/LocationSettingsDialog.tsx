import {
  Box,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  IconButton,
  LinearProgress,
  MenuItem,
  TextField,
  Typography,
} from "@material-ui/core";
import { CheckBoxOutlined, Close } from "@material-ui/icons";
import React, { useEffect, useRef, useState } from "react";
import Button from "./components/Button";

interface Props {
  onClose: () => void;
  onSubmit: (polygons: string[]) => void;
}

const cityNames = [
  "서울특별시",
  "부산광역시",
  "대구광역시",
  "인천광역시",
  "광주광역시",
  "대전광역시",
  "울산광역시",
  "세종특별자치시",
  "경기도",
  "강원도",
  "충청북도",
  "충청남도",
  "전라북도",
  "전라남도",
  "경상북도",
  "경상남도",
  "제주특별자치도",
];

type City = {
  city: string;
  country: string;
  code: string;
  polygon: string[];
};

const LocationSettingsDialog = ({ onClose, onSubmit }: Props) => {
  const [cityName, setCityName] = useState<string | null>("");
  const [cities, setCities] = useState<City[]>([]);
  const [selection, setSelection] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);
  const jsonRef = useRef<{ maps: City[] }>();
  const selectionCodes = selection.map((v) => v.code);

  useEffect(() => {
    setLoading(true);
    import("./constants/country.json").then((module) => {
      jsonRef.current = module.default;
      setLoading(false);
    });
  }, []);

  const handleCitySelect = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCityName(event.target.value as string);
    setCities(
      jsonRef.current?.maps.filter(
        (v: City) => v.city === (event.target.value as string)
      ) ?? []
    );
  };

  const handleSelectionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const code = event.target.name;
    if (selectionCodes.includes(code)) {
      setSelection((prev) => prev.filter((v) => v.code !== code));
    } else {
      const found = cities.find((v) => v.code === code);
      setSelection((prev) => [...prev, found!]);
    }
  };

  const handleSubmit = () => {
    const polygons = selection.map((v) => v.polygon[0]);
    onSubmit(polygons);
  };

  const selectAll = () => {
    if (cities) {
      setSelection([...cities]);
    }
  };
  const unselectAll = () => {
    setSelection([]);
  };

  const handleDelete = (code: string) => () => {
    setSelection((prev) => prev.filter((v) => v.code !== code));
  };

  return (
    <Dialog
      sx={{
        "& .MuiDialog-paper": {
          maxWidth: 800,
          border: "1px solid #bdbdbd",
          boxShadow: "0px 3px 6px #00000029",
          color: "#999999",
        },
      }}
      hideBackdrop
      onClose={onClose}
      open
      fullWidth
    >
      <DialogTitle
        sx={{
          color: "#121212",
          "& .MuiTypography-root": { fontSize: 18 },
          pl: "21px",
        }}
      >
        {loading ? "지역 정보를 로딩중입니다..." : "지역 설정"}
      </DialogTitle>
      <DialogContent sx={{ p: 0 }} dividers>
        {loading && <LinearProgress />}
        <Box
          sx={{
            opacity: loading ? 0.3 : 1,
            pointerEvents: loading ? "none" : "auto",
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            px={2.75}
            py={1.75}
          >
            <TextField
              margin="none"
              variant="standard"
              sx={{
                minWidth: 160,
                "& .MuiSelect-select.MuiInputBase-input.MuiInput-input": {
                  fontSize: 14,
                },
              }}
              value={cityName}
              onChange={handleCitySelect}
              select
            >
              {cityNames.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </TextField>
            <Box display="flex">
              <Button
                onClick={selectAll}
                sx={{ mr: 1.25, width: 120 }}
                variant="contained"
                disableElevation
              >
                전체선택
              </Button>
              <Button
                variant="outlined"
                onClick={unselectAll}
                sx={{ width: 120 }}
                disabled={selection.length === 0}
              >
                선택해제
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              borderTop: (theme) => `1px solid ${theme.palette.divider}`,
              display: "flex",
              justifyContent: "space-between",
              p: (theme) => theme.spacing(1.25, 2.5),
              backgroundColor: "#f4f4f4",
              opacity: 0.66,
              fontSize: 14,
            }}
          >
            {cityName ?? "지역을 선택해주세요"}
          </Box>
          <Grid
            container
            spacing={0}
            sx={{
              borderTop: "1px solid",
              borderColor: (theme) => theme.palette.divider,
              marginBottom: "-1px",
            }}
          >
            {cities &&
              cities.map(({ code, country }: City) => (
                <Grid
                  key={code}
                  item
                  xs={4}
                  sx={{
                    backgroundColor: "white",
                    borderRight: "1px solid",
                    "&:nth-of-type(3n)": {
                      borderRight: "0",
                    },
                    borderBottom: "1px solid",
                    borderColor: (theme) => theme.palette.divider,
                    px: 2,
                  }}
                >
                  <FormControlLabel
                    sx={{
                      "& .MuiFormControlLabel-label": { fontSize: 14 },
                    }}
                    control={
                      <Checkbox
                        sx={{
                          "& .MuiSvgIcon-root": {
                            fill: (theme) =>
                              selectionCodes.includes(code)
                                ? theme.palette.primary.main
                                : "#999999",
                          },
                        }}
                        checkedIcon={<CheckBoxOutlined />}
                        checked={selectionCodes.includes(code)}
                        onChange={handleSelectionChange}
                        name={code}
                        color="primary"
                      />
                    }
                    label={country}
                  />
                </Grid>
              ))}
          </Grid>
        </Box>
        {selection.length > 0 && (
          <>
            <Box
              sx={{
                borderTop: (theme) => `1px solid ${theme.palette.divider}`,
                p: (theme) => theme.spacing(3.75, 2.5, 1.25),
              }}
            >
              <Typography sx={{ fontSize: 14, color: "#333333" }}>
                선택 지역
              </Typography>
            </Box>

            <Grid
              container
              spacing={0}
              sx={{
                borderTop: "1px solid",
                borderColor: (theme) => theme.palette.divider,
              }}
            >
              {selection &&
                selection.map(({ country, code }) => (
                  <Grid
                    key={code}
                    item
                    xs={4}
                    sx={{
                      borderRight: "1px solid",
                      borderBottom: "1px solid",
                      borderColor: (theme) => theme.palette.divider,
                      px: 2.5,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      "&:nth-of-type(3n)": {
                        borderRight: "0",
                      },
                      fontSize: 14,
                    }}
                  >
                    {country}
                    <IconButton
                      onClick={handleDelete(code)}
                      sx={{ px: 0, py: 1.25 }}
                    >
                      <Close style={{ width: "0.8em", height: "0.8em" }} />
                    </IconButton>
                  </Grid>
                ))}
            </Grid>
          </>
        )}
        <Box
          display="flex"
          justifyContent="center"
          py={3.75}
          sx={{
            borderTop: (theme) => `1px solid ${theme.palette.divider}`,
            marginTop: "-1px",
          }}
        >
          <Button
            onClick={handleSubmit}
            sx={{ marginLeft: "auto", marginRight: "auto", width: 180 }}
            variant="contained"
            disabled={selection.length === 0}
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
