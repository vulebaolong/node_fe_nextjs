import { useRef } from "react";

export interface Annotation {
   [key: string]: any;
}

export interface TextBlock {
   type: "text";
   text: {
      value: string;
      annotations: Annotation[];
   };
}

export interface DeltaPayload {
   content?: TextBlock[];
   role?: "assistant" | "user" | null;
}

export interface ThreadMessageDelta {
   id: string;
   delta: DeltaPayload;
   object: "thread.message.delta";
}

export interface ThreadMessage {
   id: string;
   assistant_id: string;
   attachments: any[]; 
   completed_at: number | null;
   content: TextBlock[];
   created_at: number;
   incomplete_at: number | null;
   incomplete_details: any | null;
   metadata: Record<string, any>;
   object: "thread.message";
   role: "assistant" | "user";
   run_id: string;
   status: "in_progress" | "completed" | "incomplete" | "failed";
   thread_id: string;
}

export interface OpenAIEvent<T = any> {
   event:
      | "thread.message.created"
      | "thread.message.delta"
      | "thread.message.completed"
      | "thread.message.in_progress"
      | "thread.run.created"
      | "thread.run.in_progress"
      | "thread.run.completed"
      | "thread.run.step.created"
      | "thread.run.step.completed";
   data: T;
}

type OnChunkCallback = (messageId: string, chunks: string) => void;
type OnDoneCallback = (messageId: string, chunks: string) => void;
type OnErrorCallback = (error: any) => void;

type TDataSendMessage = {
   url: string;
   message: string;
   onChunk: OnChunkCallback;
   onDone?: OnDoneCallback;
   onError?: OnErrorCallback;
};

export function useAssistantStream() {
   const controllerRef = useRef<AbortController | null>(null);

   const sendMessage = async ({ url, message, onChunk, onDone, onError }: TDataSendMessage) => {
      try {
         const controller = new AbortController();
         controllerRef.current = controller;

         const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ messages: message }),
            signal: controller.signal,
         });

         if (!res.body) throw new Error("Không nhận được stream từ server.");

         const reader = res.body.getReader();
         const decoder = new TextDecoder("utf-8");
         let buffer = "";
         let chunks = "";
         let messageId = "";

         while (true) {
            const { value, done } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });

            const parts = buffer.split("\n\n");
            buffer = parts.pop() || "";

            for (const part of parts) {
               if (!part.startsWith("data: ")) continue;

               const jsonStr = part.slice(6); // Remove "data: "
               if (jsonStr === "[DONE]") {
                  if (onDone && messageId) onDone(messageId, chunks);
                  return;
               }

               try {
                  const parsed: OpenAIEvent<ThreadMessageDelta> = JSON.parse(jsonStr);
                  // Nếu là delta hoặc created → lấy message id
                  if (parsed.event === "thread.message.delta" || parsed.event === "thread.message.created") {
                     if (!messageId && parsed.data?.id) {
                        messageId = parsed.data.id;
                     }
                  }

                  // Xử lý text trong delta
                  if (parsed.event === "thread.message.delta" && parsed.data?.delta?.content) {
                     parsed.data.delta.content.forEach((block: TextBlock) => {
                        if (block.type === "text") {
                           chunks += block.text.value;
                           onChunk(messageId, chunks);
                        }
                     });
                  }
               } catch (err) {
                  console.error("SON parse error:", err);
               }
            }
         }

         if (onDone && messageId) onDone(messageId, chunks);
      } catch (error) {
         if ((error as any).name !== "AbortError") {
            onError?.(error);
         }
      }
   };

   const abort = () => {
      controllerRef.current?.abort();
   };

   return { sendMessage, abort };
}
