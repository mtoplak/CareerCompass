"use client";
import Textarea from "react-textarea-autosize";
import { useActions, useUIState } from "ai/rsc";
import { type AI } from "@/lib/chat/actions";
import { Button } from "@/components/ui/button";
import { IconArrowElbow, IconPlus } from "@/components/ui/icons";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEnterSubmit } from "@/lib/hooks/use-enter-submit";
import { nanoid } from "nanoid";
import { toast } from "sonner";
import { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { api } from "@/constants";

export function PromptForm({
  input,
  setInput,
  setIsLoading,
}: {
  input: string;
  setInput: (value: string) => void;
  setIsLoading: (value: boolean) => void;
}) {
  const { formRef, onKeyDown } = useEnterSubmit();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { submitUserMessage } = useActions();
  const [_, setMessages] = useUIState<typeof AI>();
  const { data: session } = useSession();
  const email = session?.user?.email;

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleDeleteHistory = async () => {
    try {
      await fetch(`${api}/history/remove`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });
      setMessages([]);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={async (e: any) => {
        e.preventDefault();

        if (window.innerWidth < 600) {
          e.target["message"]?.blur();
        }
        setIsLoading(true);

        const value = input.trim();
        setInput("");
        if (!value) return;

        setMessages((currentMessages) => [
          ...currentMessages,
          {
            id: nanoid(),
            display: <>{value}</>,
            role: "user",
          },
        ]);

        try {
          const responseMessage = await submitUserMessage(value, email);
          setMessages((currentMessages) => [
            ...currentMessages,
            responseMessage,
          ]);
        } catch {
          toast(
            <div className="text-red-600">
              You have reached your message limit! Please try again later, or{" "}
              deploy your own version.
            </div>,
          );
        } finally {
          setIsLoading(false);
        }
      }}
    >
      <div className="relative flex max-h-60 w-full grow flex-col overflow-hidden bg-zinc-100 px-12 sm:rounded-full sm:px-12">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="bg-background absolute left-4 top-[14px] size-8 rounded-full p-0 sm:left-4"
              onClick={handleDeleteHistory}
            >
              <IconPlus />
              <span className="sr-only">Nov pogovor</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Nov pogovor</TooltipContent>
        </Tooltip>
        <Textarea
          ref={inputRef}
          tabIndex={0}
          onKeyDown={onKeyDown}
          placeholder="Pošlji sporočilo."
          className="min-h-[60px] w-full resize-none bg-transparent px-4 py-[1.3rem] placeholder:text-zinc-900 focus-within:outline-none sm:text-sm"
          autoFocus
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          name="message"
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="absolute right-4 top-[13px] sm:right-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="submit"
                size="icon"
                disabled={input === ""}
                className="rounded-full bg-transparent text-zinc-950 shadow-none hover:bg-zinc-200"
              >
                <IconArrowElbow />
                <span className="sr-only">Pošlji sporočilo</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Pošlji sporočilo</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </form>
  );
}
