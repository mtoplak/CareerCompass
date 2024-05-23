"use client";
import { ChatList } from "@/components/ChatBot/chat-list";
import { ChatPanel } from "./chat-panel";
import { EmptyScreen } from "@/components/ChatBot/empty-screen";
import { Message } from "@/lib/chat/actions";
import { useLocalStorage } from "@/lib/hooks/use-local-storage";
import { useScrollAnchor } from "@/lib/hooks/use-scroll-anchor";
import { Session } from "@/lib/types";
import { useAIState, useUIState } from "ai/rsc";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Breadcrumb from "../Common/Breadcrumb";
import { api } from "@/constants";

export interface ChatProps extends React.ComponentProps<"div"> {
  initialMessages?: Message[];
  id?: string;
  session?: Session;
  missingKeys?: string[];
}

export function Chat({ id, missingKeys }: ChatProps) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useUIState();
  const [aiState] = useAIState();
  const { data: session } = useSession();

  const [_, setNewChatId] = useLocalStorage("newChatId", id);

  useEffect(() => {
    if (!session) return;
    const fetchMessages = async () => {
      try {
        const res = await fetch(`${api}/history/user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: session?.user?.email,
          }),
        });
        if (!res.ok) {
          if (res.status === 500) {
            return;
          }
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const messages = await res.json();
        const transformedMessages = messages.chat_history.map(
          (message: any) => ({
            id: message._id,
            spinner: null,
            display: message.content,
            role: message.role,
          }),
        );
        setMessages(transformedMessages);
      } catch (error: any) {
        toast.error("Failed to fetch messages:", error);
      }
    };

    fetchMessages();
  }, [session, setMessages]);

  useEffect(() => {
    setNewChatId(id);
  });

  useEffect(() => {
    (missingKeys ?? []).map((key) => {
      toast.error(`Missing ${key} environment variable!`);
    });
  }, [missingKeys]);

  const { messagesRef, scrollRef, visibilityRef, isAtBottom, scrollToBottom } =
    useScrollAnchor();

  return (
    <>
      {session?.user ? (
        <div
          className="group mt-20 w-full overflow-auto pl-0 peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px]"
          ref={scrollRef}
        >
          <div
            className={`pb-[40px] pt-4 ${messages.length < 1 && "pb-[200px]"}`}
            ref={messagesRef}
          >
            {messages.length > 0 && messages.length ? (
              <>
                <div className="mx-auto mb-4 max-w-2xl px-4">
                  <div className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-zinc-50 p-4 text-sm sm:p-8 sm:text-base">
                    <h1 className="text-2xl font-semibold tracking-tight dark:text-black sm:text-3xl">
                      Career Compass AI Svetovalec
                    </h1>
                  </div>
                </div>
                <ChatList
                  messages={messages}
                  isShared={false}
                  session={session}
                />
              </>
            ) : (
              <EmptyScreen />
            )}
            <div className="h-px w-full" ref={visibilityRef} />
          </div>
          <ChatPanel
            id={id}
            input={input}
            setInput={setInput}
            isAtBottom={isAtBottom}
            scrollToBottom={scrollToBottom}
          />
        </div>
      ) : (
        <>
          <Breadcrumb pageName="AI Svetovalec" />
          <div className=" mx-auto mb-10 mt-10 max-w-2xl px-4">
            <div className="flex flex-col gap-2 rounded-2xl bg-zinc-50 p-4 text-center text-sm sm:p-8 sm:text-base">
              <h1 className="inline-block max-w-fit text-2xl font-semibold tracking-tight dark:text-black sm:text-3xl">
                <Link href="/prijava">
                  Prijavite se za dostop do AI svetovalca!
                </Link>
              </h1>
            </div>
          </div>
        </>
      )}
    </>
  );
}
