/** ChatBox is a simple text input box where users input their question and get a response for AI assistant */
import ArrowCircleUpOutlinedIcon from "@mui/icons-material/ArrowCircleUpOutlined";
import SmartToyTwoToneIcon from "@mui/icons-material/SmartToyTwoTone";
import { InputAdornment, Popover, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import React, { HTMLAttributes } from "react";
import { ChatDispatcherContext } from "./Dispatcher";
import { configs } from "../../configurations";

interface ChatBoxProps extends HTMLAttributes<HTMLDivElement> {
  shouldOpenChat?: boolean;
  label?: string;
  placeholder?: string;
  beforeSubmit?: (question: string) => void;
  onSuccess?: (response: string) => void;
  onFailed?: (error: unknown) => void;
}

interface ChatBoxState {
  question: string;
  isLoading: boolean;
  isFailed: boolean;
  isButtonHovered: boolean;
  popoverEl: HTMLElement | null;
}

class ChatBox extends React.Component<ChatBoxProps, ChatBoxState> {
  static contextType = ChatDispatcherContext;

  context!: React.ContextType<typeof ChatDispatcherContext>;

  constructor(props: ChatBoxProps) {
    super(props);
    this.state = {
      question: "",
      isLoading: false,
      isFailed: false,
      isButtonHovered: false,
      popoverEl: null,
    };
  }

  handleQuestionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ question: event.target.value });
  };

  handleSend = async () => {
    if (this.state.question === undefined || this.state.question === "") {
      if (this.props.shouldOpenChat === true) {
        this.context?.openChat(this.state.question);
      }
      return;
    }

    this.props.beforeSubmit?.(this.state.question);

    if (this.props.shouldOpenChat === true) {
      this.context?.openChat(this.state.question);
    }

    try {
      this.setState({ question: "" });
      const response = await this.context?.submitQuestion(this.state.question);
      this.props.onSuccess?.(response ?? "");
    } catch (error) {
      this.props.onFailed?.(error);
    }
  };

  handleMouseEnterButton = () => {
    this.setState({ isButtonHovered: true });
  };

  handleMouseLeaveButton = () => {
    this.setState({ isButtonHovered: false });
  };

  handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({ popoverEl: event.currentTarget });
  };

  handlePopoverClose = () => {
    this.setState({ popoverEl: null });
  };

  render() {
    const { shouldOpenChat, beforeSubmit, onSuccess, onFailed, ...rest } =
      this.props;

    const isPopoverOpen = Boolean(this.state.popoverEl);

    return (
      <div {...rest}>
        <TextField
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              this.handleSend().catch(() => {});
            }
          }}
          margin="none"
          id="question"
          // hiddenLabel
          label={this.props.label ?? "Questions? Ask my assistant"}
          focused
          // placeholder="Powered by OpenAI.."
          // placeholder="Can Josh code GoLang..?"
          placeholder={this.props.placeholder ?? "Powered by OpenAI.."}
          // variant="filled"
          size="small"
          autoComplete="off"
          style={{
            minWidth: "25vw",
          }}
          fullWidth
          multiline
          color="secondary"
          value={this.state.question}
          onChange={this.handleQuestionChange}
          InputProps={{
            endAdornment: (
              <InputAdornment
                position="end"
                onMouseEnter={this.handleMouseEnterButton}
                onMouseLeave={this.handleMouseLeaveButton}
              >
                <ArrowCircleUpOutlinedIcon
                  style={
                    this.state.isButtonHovered
                      ? { transform: "scale(1.3)", cursor: "pointer" }
                      : {}
                  }
                  onClick={() => {
                    this.handleSend().catch(() => {});
                  }}
                />
              </InputAdornment>
            ),
            startAdornment: (
              <InputAdornment position="start">
                <span
                  style={{ display: "flex" }}
                  aria-owns={isPopoverOpen ? "mouse-over-popover" : undefined}
                  aria-haspopup="true"
                  onMouseEnter={this.handlePopoverOpen}
                  onMouseLeave={this.handlePopoverClose}
                >
                  <SmartToyTwoToneIcon />
                </span>
                <Popover
                  id="mouse-over-popover"
                  sx={{
                    pointerEvents: "none",
                  }}
                  open={isPopoverOpen}
                  anchorEl={this.state.popoverEl}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  onClose={this.handlePopoverClose}
                  disableRestoreFocus
                >
                  <Typography style={{ padding: "15px" }}>
                    {String(configs.assistant.intro)}
                  </Typography>
                </Popover>
              </InputAdornment>
            ),
          }}
        />
      </div>
    );
  }
}

export default ChatBox;
