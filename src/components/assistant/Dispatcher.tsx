import React, { ComponentType, useContext } from "react";

const ChatDispatcherContext =
  React.createContext<ChatDispatcherStateInterface | null>(null);

interface ChatDispatcherStateInterface {
  // submit a question to the AI assistant and get a response back from any component
  submitQuestion: (question: string) => Promise<string>;
  // open the chat modal showing chat history with AI assistant
  openChat: (question?: string) => void;
}

interface WithChatDispatcherProps {
  chatDispatcher: ChatDispatcherStateInterface;
}

const withChatDispatcher = <P extends WithChatDispatcherProps>(
  Component: ComponentType<P>,
  context = ChatDispatcherContext
): ComponentType<Omit<P, keyof WithChatDispatcherProps>> => {
  return function WithChatDispatcher(props): React.JSX.Element {
    return (
      <context.Consumer>
        {(
          chatDispatcher: ChatDispatcherStateInterface | null
        ): React.JSX.Element => (
          <Component {...(props as P)} chatDispatcher={chatDispatcher} />
        )}
      </context.Consumer>
    );
  };
};

const useChatDispatcher = (
  context = ChatDispatcherContext
): ChatDispatcherStateInterface =>
  useContext(context) as ChatDispatcherStateInterface;

export { ChatDispatcherContext, useChatDispatcher, withChatDispatcher };

export type { ChatDispatcherStateInterface };
