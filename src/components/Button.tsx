import { Button as MuiButton, ButtonProps } from "@material-ui/core";

const Button = (props: ButtonProps) => {
  const { sx, ...rest } = props;
  return (
    <MuiButton
      sx={{
        height: 38,
        borderRadius: "2px",
        ...sx,
      }}
      {...rest}
    />
  );
};

export default Button;
