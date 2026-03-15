import { Bubble } from "@/components/atoms/Bubble";
import { Text } from "@/components/atoms/Text";
import { ChatMessage } from "@/components/molecules/chat/ChatMessage";

export const ChatMessageList = () => (
  <div className="flex flex-1 flex-col gap-8 overflow-y-auto px-6 py-0">
    <ChatMessage variant="assistant">
      <Text variant="body" as="span">
        Hi! What filter would you like to apply to the training data? You can
        ask me things like{" "}
      </Text>
      <Text variant="bodySemibold" as="span">
        "show me only approved stocks"
      </Text>
      <Text variant="body" as="span">
        {" "}
        or "filter by high confidence patterns"
      </Text>
    </ChatMessage>
    <ChatMessage variant="loading" />
    <ChatMessage variant="user">
      <Text variant="body" as="span">
        scan for setups
      </Text>
    </ChatMessage>
    <ChatMessage variant="assistant" blocks>
      <div className="flex flex-1 flex-col gap-3 py-2">
        <Bubble variant="assistant">
          <Text variant="body" as="p" className="text-[#181D27]">
            Perfect! Opening the Scan for Setups canvas to find the best trading
            opportunities.
          </Text>
        </Bubble>
        <Bubble variant="assistant">
          <Text variant="body" as="p" className="text-[#181D27]">
            Shall I update your calendar and notify Sienna and the team?
          </Text>
        </Bubble>
      </div>
    </ChatMessage>
    <ChatMessage variant="user">
      <Text variant="body" as="span">
        Yes, but can we do the strategy session on Friday instead?
      </Text>
    </ChatMessage>
    <ChatMessage variant="loading" />
  </div>
);
