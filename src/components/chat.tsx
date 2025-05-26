"use client";

import { useAssistantStream } from "@/hooks/use-assistant-stream";
import { useState } from "react";
import { Markdown } from "./markdown/markdown";
import { useScrollToBottom } from "@/hooks/use-scroll-to-bottom";
import { MultimodalInput } from "./multimodal-input";
import { PreviewMessage, ThinkingMessage } from "./message";
import { Message } from "ai";

export function Chat() {
   const { sendMessage, abort } = useAssistantStream();
   const [input, setInput] = useState("");
   const [assistantTyping, setAssistantTyping] = useState("");
   const [isTyping, setIsTyping] = useState(false);
   const [messagesContainerRef, messagesEndRef] = useScrollToBottom<HTMLDivElement>();
   const [messages, setMessages] = useState<Message[]>([]);

   const handleSend = () => {
      // const url = `http://localhost:8000/api/chats/e05e5b71-3c96-4ee7-a19e-9993085392b2/messages`; // có thể generate UUID hoặc lấy từ context
      const url = `http://localhost:8000/api/chats/stream`;

      setMessages((prev) => [...prev, { role: "user", content: input, id: "1" }]);
      setInput("");
      setAssistantTyping("");
      setIsTyping(true);

      sendMessage({
         url,
         message: "example python code",
         onChunk: (id, chunks) => {
            console.log(chunks);
            setAssistantTyping(chunks);
         },
         onDone: (id, chunks: string) => {
            console.log({ id, chunks });
            setMessages((prev) => [...prev, { role: "assistant", content: chunks, id: id }]);
            setAssistantTyping("");
            setIsTyping(false);
         },
         onError: (error) => {
            console.error("Stream error:", error);
            setIsTyping(false);
         },
      });
   };

   return (
      <div className="flex flex-col min-w-0 h-[calc(100dvh-52px)] bg-background">
         <div className="flex-1 basis-auto overflow-y-hidden">
            <div className="overflow-y-scroll h-full">
               <div ref={messagesContainerRef} className="flex flex-col min-w-0 gap-6 flex-1 pt-4 w-full md:max-w-3xl mx-auto ">
                  {messages.map((m, i) => (
                     <PreviewMessage key={i} message={m} chatId="demo-chat" isLoading={false} />
                  ))}

                  {isTyping && (
                     <>
                        <PreviewMessage message={{ role: "assistant", content: assistantTyping, id: "0" }} chatId="demo-chat" isLoading={true} />
                        <ThinkingMessage />
                     </>
                  )}

                  <div ref={messagesEndRef} className="shrink-0 min-w-[24px] min-h-[24px]" />
               </div>
            </div>
         </div>

         <form className="flex mx-auto pb-4 md:pb-6 gap-2 w-full md:max-w-3xl">
           <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 w-full py-2 px-4 rounded-md bg-input text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
           />
           <button
              type="button"
              onClick={handleSend}
              disabled={isTyping}
              className="flex items-center justify-center w-12 h-12 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
           />
         </form>
      </div>
   );
}
