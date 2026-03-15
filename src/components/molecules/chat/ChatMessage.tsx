import { Avatar } from "@/components/atoms/Avatar";
import { Bubble } from "@/components/atoms/Bubble";
import { Text } from "@/components/atoms/Text";
import { cn } from "@/lib/utils";
import { ChatLoadingBubble } from "./ChatLoadingBubble";

export const ChatMessage = ({
  variant,
  children,
  blocks = false,
}: ChatMessageProps) => {
  const isUser = variant === "user";
  const isLoading = variant === "loading";

  if (isLoading) {
    return <ChatLoadingBubble />;
  }

  const content =
    typeof children === "string" ? (
      <Text variant="body" as="p" className="text-[#181D27]">
        {children}
      </Text>
    ) : (
      children
    );

  return (
    <div className={cn("flex gap-4 py-2", isUser && "justify-end")}>
      {!isUser && <Avatar variant="assistant" />}
      {blocks ? (
        content
      ) : (
        <Bubble variant={isUser ? "user" : "assistant"}>{content}</Bubble>
      )}
      {isUser && <Avatar variant="user" />}
    </div>
  );
};

type ChatMessageProps = {
  variant: "assistant" | "user" | "loading";
  children?: React.ReactNode;
  blocks?: boolean;
};
