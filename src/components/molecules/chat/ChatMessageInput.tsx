"use client";

import * as React from "react";

import { Label } from "@/components/atoms/Label";
import { Textarea } from "@/components/atoms/Textarea";

export const ChatMessageInput = () => {
  const [value, setValue] = React.useState("");

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.target.value);
    },
    [],
  );

  return (
    <Label
      htmlFor="chat-message-input"
      className="flex flex-1 cursor-text flex-col"
    >
      <div className="relative flex min-h-[88px] flex-1 flex-col rounded-xl border border-[#D5D7DA] bg-white px-[14px] py-3 shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]">
        <Textarea
          id="chat-message-input"
          value={value}
          onChange={handleChange}
          placeholder="Ask me anything..."
          rows={3}
          className="min-h-0"
          aria-label="Message"
        />
      </div>
    </Label>
  );
};
