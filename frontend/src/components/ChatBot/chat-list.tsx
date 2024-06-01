import { UIState } from "@/lib/chat/actions";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import {
  BotCard,
  SpinnerMessage,
  SystemMessage,
  UserMessage,
} from "../message/message";
import { useEffect, useRef } from "react";
import { spinner } from "../message/spinner";

export interface ChatList {
  messages: UIState;
  session?: any;
  isShared: boolean;
  isLoading: boolean;
}

export function ChatList({ messages, session, isShared, isLoading }: ChatList) {
  const messageContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const scrollToBottom = () => {
      if (messageContainerRef.current) {
        messageContainerRef.current.scrollTop =
          messageContainerRef.current.scrollHeight;
      }
    };

    scrollToBottom();
  }, [messages]);

  return (
    messages.length && (
      <div className="relative mx-auto grid max-w-2xl auto-rows-max gap-8 px-4">
        {!isShared && !session && (
          <div className="group relative flex items-start md:-ml-12">
            <div className="bg-background flex size-[25px] shrink-0 select-none items-center justify-center rounded-lg border shadow-sm">
              <ExclamationTriangleIcon />
            </div>
            <div className="ml-5 flex-1 space-y-2 overflow-hidden px-1">
              <p className="text-muted-foreground leading-normal">
                Prosimo,{" "}
                <Link href="/prijava" className="underline underline-offset-4">
                  prijavite
                </Link>{" "}
                ali{" "}
                <Link
                  href="/registracija"
                  className="underline underline-offset-4"
                >
                  registrirajte se,
                </Link>{" "}
                da boste videli svojo zgodovino pogovorov!
              </p>
            </div>
          </div>
        )}
        <div
          ref={messageContainerRef}
          className="message-container grid max-h-96 min-h-[500px] auto-rows-max gap-8 overflow-y-auto"
        >
          {messages.length > 0 &&
            messages.map((message) => (
              <div key={message.id} className="flex items-center">
                {message && message.role === "user" ? (
                  <UserMessage>{message.display}</UserMessage>
                ) : message && message.role === "assistant" ? (
                  <BotCard>{message.display}</BotCard>
                ) : (
                  <SpinnerMessage />
                )}
              </div>
            ))}
          {isLoading && (
            <div className="flex items-center">
              <BotCard>
                <div className="ml-4 flex h-[24px] flex-1 flex-row items-center space-y-2 overflow-hidden px-1">
                  {spinner}
                </div>
              </BotCard>
            </div>
          )}
        </div>
      </div>
    )
  );
}
