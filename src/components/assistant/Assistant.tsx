/** An openai powered Assistant Chat component */
import {
  Alert,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemText,
  useTheme,
} from "@mui/material";
import React, {
  HTMLAttributes,
  RefObject,
  useEffect,
  useState,
  useCallback,
} from "react";
import { configs } from "../../configurations";
import CloseIcon from "@mui/icons-material/Close";
import Markdown from "../Markdown";
import ChatBox from "./ChatBox";
import { ChatDispatcherContext } from "./Dispatcher";
import SmartToyTwoToneIcon from "@mui/icons-material/SmartToyTwoTone";

interface AssistantProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  beforeRequest?: (request: ChatRequest) => void;
  onResponseSuccess?: (request: ChatRequest, response: string) => void;
  onResponseFailed?: (error: unknown) => void;
}

interface AssistantState {
  messages: Message[];
  isLoading: boolean;
  isChatOpen: boolean;
}

interface Message {
  role: string;
  content: string;
}

interface ChatRequest {
  messages: Message[];
}

const Assistant: React.FC<AssistantProps> = (props: AssistantProps) => {
  const themeContext = useTheme();
  if (themeContext === null) {
    throw new Error("Header must be used within a MUI Theme");
  }

  const [state, setState] = useState<AssistantState>({
    messages: [
      {
        role: "assistant",
        content: configs.assistant.intro,
      },
    ],
    isLoading: false,
    isChatOpen: false,
  });

  const openChat = (question?: string) => {
    if (question !== undefined) {
      // TODO
    }
    setState((prev) => ({ ...prev, isChatOpen: true }));
    scrollToBottom();
  };

  const submitQuestion = useCallback(
    async (question: string): Promise<string> => {
      if (question === undefined || question === "") {
        throw new Error("The question cannot not be empty");
      }

      const request: ChatRequest = {
        messages: [...state.messages, { role: "user", content: question }],
      };

      props.beforeRequest?.(request);
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, { role: "user", content: question }],
        isLoading: true,
      }));
      try {
        const response = await fetch(
          new URL(`${String(configs.api)}/chat-about-josh`),
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(request),
          }
        );

        const body = await response.text();

        if (!response.ok) {
          throw new Error(
            `server responded with error status: ${response.status}, body: ${body}`
          );
        }

        setState((prev) => ({
          ...prev,
          messages: [...prev.messages, { role: "assistant", content: body }],
          isLoading: false,
        }));
        props.onResponseSuccess?.(request, body);
        return body;
      } catch (error) {
        const errorWrapped = new Error(
          `Error submitting question: ${String(error)}`
        );
        console.log(`Error calling api: ${errorWrapped.message}`);
        setState((prev) => ({
          ...prev,
          messages: [
            ...prev.messages,
            {
              role: "assistant",
              content:
                "Oops.. Josh's assistant is not available right now. Please try again later.",
            },
          ],
          isLoading: false,
        }));
        props.onResponseFailed?.(errorWrapped);
        throw errorWrapped;
      }
    },
    [state]
  );

  const closeChat = () => {
    setState((prev) => ({ ...prev, isLoading: false }));
    setState((prev) => ({ ...prev, isChatOpen: false }));
  };

  const dialogContentRef: RefObject<HTMLDivElement> = React.createRef();

  // Function to scroll to the bottom
  function scrollToBottom() {
    // const element = document.getElementById("AssistantDialogContent");
    // if (element !== undefined && element !== null) {
    //   element.scrollTop = element.scrollHeight;
    // }
    if (
      dialogContentRef.current !== undefined &&
      dialogContentRef.current !== null
    ) {
      dialogContentRef.current.scrollTop =
        dialogContentRef.current.scrollHeight;
    }
    // this.dialogContentRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // Effect to run when the component mounts or when count changes
  useEffect(() => {
    scrollToBottom();
  }, []);

  return (
    <ChatDispatcherContext.Provider
      value={{
        openChat,
        submitQuestion,
      }}
    >
      <Dialog
        fullScreen={Boolean(
          window.innerWidth < themeContext.breakpoints.values.sm
        )}
        open={state.isChatOpen}
        onClose={closeChat}
        aria-labelledby="form-dialog-title"
        style={{ height: "100%" }}
      >
        <DialogTitle id="form-dialog-title">
          Questions? Ask my assistant
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={closeChat}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent
          ref={dialogContentRef}
          style={{ paddingBottom: "0px", paddingTop: "0px" }}
        >
          {/* <DialogContentText>Hello</DialogContentText> */}
          {state.messages.length > 0 && (
            <List>
              {state.messages.map((message, index) => (
                <ListItem
                  key={index}
                  style={{ paddingBottom: "0px", paddingTop: "0px" }}
                >
                  {message.role === "user" && (
                    <ListItemText
                      disableTypography
                      primary="You"
                      secondary={
                        <Alert severity="info" icon={false}>
                          <Markdown content={message.content} />
                        </Alert>
                      }
                    />
                  )}
                  {message.role === "assistant" && (
                    <ListItemText
                      disableTypography
                      style={{ padding: "0px 0px 0px 0px" }}
                      primary={
                        <span>
                          <SmartToyTwoToneIcon fontSize="small" /> Assistant
                        </span>
                      }
                      secondary={
                        <Alert severity="success" icon={false}>
                          <Markdown content={message.content} />
                        </Alert>
                      }
                    />
                  )}
                </ListItem>
              ))}
              {state.isLoading && (
                <ListItem
                  key={999}
                  style={{ paddingBottom: "0px", paddingTop: "0px" }}
                >
                  <ListItemText
                    disableTypography
                    style={{ padding: "0px 0px 0px 0px" }}
                    primary={
                      <span>
                        <SmartToyTwoToneIcon fontSize="small" /> Assistant
                      </span>
                    }
                    secondary={
                      <Alert severity="success" icon={false}>
                        <CircularProgress />
                      </Alert>
                    }
                  />
                </ListItem>
              )}
            </List>
          )}
        </DialogContent>
        <DialogActions>
          <ChatBox
            style={{ width: "800px", padding: "10px 20px 10px 10px" }}
            label="Powered by OpenAI"
            placeholder="Does Josh know GoLang..?"
          />
        </DialogActions>
      </Dialog>
      {props.children}
    </ChatDispatcherContext.Provider>
  );
};

export default Assistant;
