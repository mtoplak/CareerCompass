import { Chat } from "@/components/ChatBot/chat";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";
import { nanoid } from "@/lib/utils";
import { AI } from "@/lib/chat/actions";
// import { auth } from "@/auth";
import { Session } from "@/lib/types";
import { getMissingKeys } from "@/app/actions";
import { TooltipProvider } from "@/components/ui/tooltip";

export const metadata: Metadata = {
  title: "Career Compass - AI Svetovalec",
  description: "AI Svetovalec",
};

const CompaniesPage = async () => {
  const id = nanoid();
  // const session = (await auth()) as Session;
  const missingKeys = await getMissingKeys();

  return (
    <main>
      <TooltipProvider>
        <Breadcrumb pageName="AI Svetovalec" />
        <AI initialAIState={{ chatId: id, interactions: [], messages: [] }}>
          <Chat id={id} missingKeys={missingKeys} />
        </AI>
      </TooltipProvider>
    </main>
  );
};

export default CompaniesPage;
