import { UIState } from "@/lib/chat/actions";
import { Session } from "@/lib/types";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { BotCard, BotMessage, UserMessage } from "../stocks/message";

export interface ChatList {
  messages: UIState;
  session?: any;
  isShared: boolean;
}

export function ChatList({ messages, session, isShared }: ChatList) {
  return messages.length ? (
    <div className="relative mx-auto grid max-w-2xl auto-rows-max gap-8 px-4">
      {!isShared && !session ? (
        <>
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
        </>
      ) : null}
      {messages.map((message) => (
        <div key={message.id}>
          {message.role === "user" ? (
            <UserMessage>
              {message.spinner}
              {message.display}
            </UserMessage>
          ) : (
            <BotCard>
              {message.spinner}
              {message.display}
            </BotCard>
          )}
        </div>
      ))}
    </div>
  ) : null;
}
