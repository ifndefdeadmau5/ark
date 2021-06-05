import { Box, TextField } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import Button from "./Button";

interface Props {
  onLocationSettingClick: () => void;
}

const SearchBar = ({ onLocationSettingClick }: Props) => {
  return (
    <Box
      sx={{
        position: "absolute",
        marginLeft: "auto",
        marginRight: "auto",
        top: 0,
        left: 0,
        right: 0,
        pt: 2,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <TextField
        size="small"
        sx={{
          width: 400,
          background: "white",
          mr: "10px",
          borderRadius: "5px",
          border: "1px solid #CCCCCC",
          boxShadow: (theme) => theme.shadows[1],
        }}
        variant="filled"
        placeholder="서울특별시 강남구 강남대로 396"
        InputProps={{
          sx: {
            "& .MuiInputBase-input.MuiFilledInput-input": {
              paddingTop: "11px",
              paddingBottom: "7px",
              fontSize: 12,
            },
            "&.MuiInputBase-root.MuiFilledInput-root.Mui-focused": {
              backgroundColor: "white",
            },
            backgroundColor: "white",
          },
          endAdornment: <Search />,
          disableUnderline: true,
        }}
      />
      <Button
        onClick={onLocationSettingClick}
        sx={{
          backgroundColor: "white",
          color: "black",
          borderRadius: "5px",
          border: "1px solid #CCCCCC",
        }}
        color="inherit"
        variant="contained"
      >
        지역 설정
      </Button>
    </Box>
  );
};

export default SearchBar;
