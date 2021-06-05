import { Box, Button, TextField } from "@material-ui/core";
import { Search } from "@material-ui/icons";

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
          boxShadow: (theme) => theme.shadows[1],
        }}
        variant="filled"
        placeholder="hmm.."
        InputProps={{
          sx: {
            "& .MuiInputBase-input.MuiFilledInput-input": {
              paddingTop: "11px",
            },
          },
          endAdornment: <Search />,
          disableUnderline: true,
        }}
      ></TextField>
      <Button
        onClick={onLocationSettingClick}
        sx={{
          backgroundColor: "white",
          color: "black",
          height: 38,
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
