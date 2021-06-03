import { Box, Button, TextField } from "@material-ui/core";
import { Search } from "@material-ui/icons";

const SearchBar = () => {
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
      }}
    >
      <TextField
        size="small"
        sx={{
          width: 400,
          background: "white",
          mr: "10px",
        }}
        variant="filled"
        placeholder="hmm.."
        InputProps={{
          sx: {
            "& .MuiInputBase-input.MuiFilledInput-input": {
              paddingTop: "14px",
            },
          },
          endAdornment: <Search />,
          disableUnderline: true,
        }}
      ></TextField>
      <Button
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
