"use client";
import { ChatList } from "@/components/ChatBot/chat-list";
import { ChatPanel } from "./chat-panel";
import { EmptyScreen } from "@/components/ChatBot/empty-screen";
import { useScrollAnchor } from "@/lib/hooks/use-scroll-anchor";
import { useUIState } from "ai/rsc";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Breadcrumb from "../Common/Breadcrumb";
import { api } from "@/constants";

export function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useUIState();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { data: session } = useSession();

  useEffect(() => {
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
    if (session) {
      fetchMessages();
    }
  }, [session]);

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
            className={`pt-4 ${messages.length < 1 ? "pb-[300px]" : "pb-[40px]"}`}
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
                  isLoading={isLoading}
                />
              </>
            ) : (
              <EmptyScreen />
            )}
            <div className="h-px w-full" ref={visibilityRef} />
          </div>
          <ChatPanel
            input={input}
            setInput={setInput}
            isAtBottom={isAtBottom}
            scrollToBottom={scrollToBottom}
            setIsLoading={setIsLoading}
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
