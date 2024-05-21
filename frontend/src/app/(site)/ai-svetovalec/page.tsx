import { Chat } from "@/components/ChatBot/chat";
import { Metadata } from "next";
import { nanoid } from "@/lib/utils";
import { AI } from "@/lib/chat/actions";
// import { auth } from "@/auth";
import { Session } from "@/lib/types";
import { getMissingKeys } from "@/app/actions";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useUIState } from "ai/rsc";

export const metadata: Metadata = {
  title: "Career Compass - AI Svetovalec",
  description: "AI Svetovalec",
};

const AIChatPage = async () => {
  const id = nanoid();
  // const session = (await auth()) as Session;
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
