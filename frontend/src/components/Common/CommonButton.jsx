import Button from "@mui/material/Button";

export default function CommonButton({
  children,
  color = "primary",
  variant = "contained",
  height = "40px",
  width = "120px",
  borderRadius = "5px",
  onClick,
  ...props
}) {
  return (
    <Button
      variant={variant}
      color={color}
      onClick={onClick}
      sx={{
        height,
        width,
        borderRadius,
        fontSize: "16px",
        textTransform: "none",
        minWidth: 0, 
        padding: "5px",
        ...props.sx,
      }}
    >
      {children}
    </Button>
  );
}
