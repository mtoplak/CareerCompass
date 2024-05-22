import { Chat } from "@/components/ChatBot/chat";
import { Metadata } from "next";
import { nanoid } from "@/lib/utils";
import { AI } from "@/lib/chat/actions";
import { getMissingKeys } from "@/app/actions";
import { TooltipProvider } from "@/components/ui/tooltip";

export const metadata: Metadata = {
  title: "Career Compass - AI Svetovalec",
  description: "AI Svetovalec",
};

const AIChatPage = async () => {
  const id = nanoid();
  const missingKeys = await getMissingKeys();

  return (
    <main>
      <TooltipProvider>
        <AI initialAIState={{ chatId: id, interactions: [], messages: [] }}>
          <Chat id={id} missingKeys={missingKeys} />
        </AI>
      </TooltipProvider>
    </main>
  );
};

export default AIChatPage;
