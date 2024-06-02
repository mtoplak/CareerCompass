export const maxDuration = 30;
import { Chat } from "@/components/ChatBot/chat";
import { Metadata } from "next";
import { nanoid } from "@/lib/utils";
import { AI } from "@/lib/chat/actions";
import { TooltipProvider } from "@/components/ui/tooltip";

export const metadata: Metadata = {
  title: "Career Compass - AI Svetovalec",
  description: "AI Svetovalec",
};

const AIChatPage = async () => {
  const id = nanoid();

  return (
    <main>
      <TooltipProvider>
        <AI initialAIState={{ chatId: id, interactions: [], messages: [] }}>
          <Chat id={id} />
        </AI>
      </TooltipProvider>
    </main>
  );
};

export default AIChatPage;
