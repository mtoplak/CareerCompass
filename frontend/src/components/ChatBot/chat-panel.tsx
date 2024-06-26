import { PromptForm } from "./prompt-form";
import { ButtonScrollToBottom } from "@/components/ChatBot/button-scroll-to-bottom";
import { useUIState } from "ai/rsc";
import type { AI } from "@/lib/chat/actions";
import { nanoid } from "nanoid";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction } from "react";
import { api } from "@/constants";

export interface ChatPanelProps {
  readonly input: string;
  readonly setInput: (value: string) => void;
  readonly isAtBottom: boolean;
  readonly scrollToBottom: () => void;
  readonly setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export function ChatPanel({
  input,
  setInput,
  isAtBottom,
  scrollToBottom,
  setIsLoading,
}: ChatPanelProps) {
  const [messages, setMessages] = useUIState<typeof AI>();
  const { data: session } = useSession();
  const email = session?.user?.email;

  const exampleMessages = [
    {
      heading: "Kako filtrirati podjetja",
      subheading:
        "na strani Career Compass, da najdem podjetja iz avtomobilske industrije?",
      message: `Kako filtrirati podjetja na strani Career Compass, da najdem podjetja iz avtomobilske industrije?`,
    },
    {
      heading: "Kje se naj zaposlim?",
      subheading: "Ravno sem kon\u010dal/-a srednjo turisti\u010dno šolo.",
      message:
        "Kje se naj zaposlim? Ravno sem kon\u010dal srednjo turisti\u010dno šolo.",
    },
  ];

  const submitUserMessage = async (message: string, email: string) => {
    try {
      const response = await fetch(`${api}/ai`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: message,
          userEmail: email,
        }),
      });

      const botResponse = await response.text();

      const chatResponse = {
        id: nanoid(),
        role: "assistant",
        display: botResponse,
      };

      return chatResponse;
    } catch (error) {
      console.error("Error fetching bot response:", error);
    }
  };

  return (
    <div className="inset-x-0 bottom-0 mb-12 w-full duration-300 ease-in-out peer-[[data-state=open]]:group-[]:lg:pl-[250px] peer-[[data-state=open]]:group-[]:xl:pl-[300px]">
      <ButtonScrollToBottom
        isAtBottom={isAtBottom}
        scrollToBottom={scrollToBottom}
      />

      <div className="mx-auto sm:max-w-2xl sm:px-4">
        <div className="mb-4 grid gap-2 px-4 sm:grid-cols-2 sm:gap-4 sm:px-0">
          {messages.length === 0 &&
            exampleMessages.map((example, index) => (
              <div
                key={example.heading}
                className={cn(
                  "cursor-pointer rounded-2xl bg-zinc-50 p-4 text-zinc-950 transition-colors hover:bg-zinc-100 sm:p-6",
                  index > 1 && "hidden md:block",
                )}
                onClick={async () => {
                  setIsLoading(true);
                  setMessages((currentMessages) => [
                    ...currentMessages,
                    {
                      id: nanoid(),
                      display: <>{example.message}</>,
                      role: "user",
                    },
                  ]);

                  try {
                    const responseMessage: any = await submitUserMessage(
                      example.message,
                      email as string,
                    );

                    setMessages((currentMessages) => [
                      ...currentMessages,
                      responseMessage,
                    ]);
                  } catch {
                    toast(
                      <div className="text-red-600">
                        You have reached your message limit! Please try again
                        later, or{" "}
                        <a
                          className="underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          deploy your own version
                        </a>
                        .
                      </div>,
                    );
                  } finally {
                    setIsLoading(false);
                  }
                }}
              >
                <div className="font-medium">{example.heading}</div>
                <div className="text-sm text-zinc-800">
                  {example.subheading}
                </div>
              </div>
            ))}
        </div>

        <div className="grid gap-4 sm:pb-4">
          <PromptForm
            input={input}
            setInput={setInput}
            setIsLoading={setIsLoading}
          />
        </div>
      </div>
    </div>
  );
}
