// @ts-nocheck

/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import "server-only";

import {
  createAI,
  createStreamableUI,
  getMutableAIState,
  getAIState,
  createStreamableValue,
} from "ai/rsc";
import { nanoid, sleep } from "@/lib/utils";
import {
  SpinnerMessage,
  UserMessage,
  BotCard,
  BotMessage,
} from "@/components/message/message";
import { Chat } from "../types";
import { CheckIcon, SpinnerIcon } from "@/components/ui/icons";
import { api } from "@/constants";

async function submitUserMessage(content: string, email: string) {
  "use server";

  const aiState = getMutableAIState();

  aiState.update({
    ...aiState.get(),
    messages: [
      ...aiState.get().messages,
      {
        id: nanoid(),
        role: "user",
        content: `${aiState.get().interactions.join("\n\n")}\n\n${content}`,
      },
    ],
  });

  const history = aiState.get().messages.map((message) => ({
    role: message.role,
    content: message.content,
  }));

  const spinnerStream = createStreamableUI(<SpinnerMessage />);
  const messageStream = createStreamableUI(content);

  spinnerStream.update(<SpinnerMessage />);

  try {
    const response = await fetch(`${api}/ai`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: content,
        userEmail: email,
      }),
    });

    const botResponse = await response.text();

    aiState.update({
      ...aiState.get(),
      messages: [
        ...aiState.get().messages,
        {
          id: nanoid(),
          role: "assistant",
          content: botResponse,
        },
      ],
    });
    spinnerStream.done(null);
    messageStream.update(botResponse);
    const chatResponse = {
      id: nanoid(),
      role: "assistant",
      display: botResponse,
    };

    return chatResponse;
  } catch (error) {
    console.error("Error fetching bot response:", error);
  }
}

export async function requestCode() {
  "use server";

  const aiState = getMutableAIState();

  aiState.done({
    ...aiState.get(),
    messages: [
      ...aiState.get().messages,
      {
        role: "assistant",
        content:
          "A code has been sent to user's phone. They should enter it in the user interface to continue.",
      },
    ],
  });

  const ui = createStreamableUI(
    <div className="animate-spin">
      <SpinnerIcon />
    </div>,
  );

  (async () => {
    await sleep(2000);
    ui.done();
  })();

  return {
    status: "requires_code",
    display: ui.value,
  };
}

export async function validateCode() {
  "use server";

  const aiState = getMutableAIState();

  const status = createStreamableValue("in_progress");
  const ui = createStreamableUI(
    <div className="flex flex-col items-center justify-center gap-3 p-6 text-zinc-500">
      <div className="animate-spin">
        <SpinnerIcon />
      </div>
      <div className="text-sm text-zinc-500">
        Please wait while we fulfill your order.
      </div>
    </div>,
  );

  (async () => {
    await sleep(2000);

    ui.done(
      <div className="flex flex-col items-center justify-center gap-3 p-4 text-center text-emerald-700">
        <CheckIcon />
        <div>Payment Succeeded</div>
        <div className="text-sm text-zinc-600">
          Thanks for your purchase! You will receive an email confirmation
          shortly.
        </div>
      </div>,
    );

    aiState.done({
      ...aiState.get(),
      messages: [
        ...aiState.get().messages.slice(0, -1),
        {
          role: "assistant",
          content: "The purchase has completed successfully.",
        },
      ],
    });

    status.done("completed");
  })();

  return {
    status: status.value,
    display: ui.value,
  };
}

export type Message = {
  role: "user" | "assistant" | "system" | "function" | "data" | "tool";
  content: string;
  id?: string;
  name?: string;
  display?: {
    name: string;
    props: Record<string, any>;
  };
};

export type AIState = {
  chatId: string;
  interactions?: string[];
  messages: Message[];
};

export type UIState = {
  id: string;
  display: React.ReactNode;
  spinner?: React.ReactNode;
  attachments?: React.ReactNode;
  role?: string;
}[];

export const AI = createAI<AIState, UIState>({
  actions: {
    submitUserMessage,
    requestCode,
    validateCode,
  },
  initialUIState: [],
  initialAIState: { chatId: nanoid(), interactions: [], messages: [] },
  unstable_onGetUIState: async () => {
    "use server";

    if (session && session.user) {
      const aiState = getAIState();

      if (aiState) {
        const uiState = getUIStateFromAIState(aiState);
        return uiState;
      }
    } else {
      return;
    }
  },
  unstable_onSetAIState: async ({ state }) => {
    "use server";

    if (session && session.user) {
      const { chatId, messages } = state;

      const createdAt = new Date();
      const userId = session.user.id as string;
      const path = `/chat/${chatId}`;
      const title = messages[0].content.substring(0, 100);

      const chat: Chat = {
        id: chatId,
        title,
        userId,
        createdAt,
        messages,
        path,
      };
    } else {
      return;
    }
  },
});

export const getUIStateFromAIState = (aiState: Chat) => {
  return aiState.messages
    .filter((message) => message.role !== "system")
    .map((message, index) => ({
      id: `${aiState.chatId}-${index}`,
      display:
        message.role === "assistant" ? (
          message.display?.name === "showFlights" ? (
            <BotCard>aaa</BotCard>
          ) : message.display?.name === "showSeatPicker" ? (
            <BotCard>aaa</BotCard>
          ) : message.display?.name === "showHotels" ? (
            <BotCard>aaa</BotCard>
          ) : message.content === "The purchase has completed successfully." ? (
            <BotCard>aaa </BotCard>
          ) : message.display?.name === "showBoardingPass" ? (
            <BotCard>aaa</BotCard>
          ) : message.display?.name === "listDestinations" ? (
            <BotCard>aaa</BotCard>
          ) : (
            <BotMessage content={message.content} />
          )
        ) : message.role === "user" ? (
          <UserMessage showAvatar>{message.content}</UserMessage>
        ) : (
          <BotMessage content={message.content} />
        ),
    }));
};
