import CloseIcon from "@mui/icons-material/Close";
import { Alert, AlertTitle, Backdrop, CircularProgress } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import React from "react";

interface LoadableContentProps {
  isLoading: boolean;
  isSuccess?: boolean;
  isError?: boolean;
  successMessage?: string;
  errorMessage?: string;
  onClose?: () => void;
  fullScreen?: boolean;
  children?: React.ReactNode;
}

const LoadableContent = (props: LoadableContentProps) => (
  <div style={{ position: "relative" }}>
    {props.children}
    <Backdrop
      open={
        props.isLoading ||
        Boolean(props.isError) ||
        Boolean(props.isSuccess) ||
        false
      }
      style={{
        zIndex: 9999,
        flexDirection: "column",
        position:
          props.fullScreen === undefined || props.fullScreen
            ? "fixed"
            : "absolute",
      }}
    >
      {props.isLoading && <CircularProgress variant="indeterminate" />}
      <Collapse in={props.isError}>
        <Alert
          variant="filled"
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={props.onClose}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          <AlertTitle>Oops!</AlertTitle>
          {props.errorMessage !== undefined
            ? props.errorMessage
            : "Something went wrong"}
        </Alert>
      </Collapse>
      <Collapse in={props.isSuccess}>
        <Alert
          variant="filled"
          severity="success"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={props.onClose}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          <AlertTitle>Sent!</AlertTitle>
          {props.successMessage}
        </Alert>
      </Collapse>
    </Backdrop>
  </div>
);

export default LoadableContent;
