'use client'

import { Button, Center, Container } from "@mantine/core";

const text = `Bạn đã từng nhận được tin nhắn kiểu Ê, cho tao mượn tiền chưa, nếu rồi, xin chúc mừng, bạn vừa unlock một achievement cực kỳ phổ biến trong cuộc sống văn phòng. Nhưng khoan, mượn bao nhiêu, khi nào trả. À, câu trả lời sẽ luôn là Tuần sau, mà tuần sau này đã bao giờ xuất hiện đâu.`

function TextToSpeak() {
   const speak = (text: string) => {
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(text);
   
      // Cải thiện tốc độ và giọng đọc
      utterance.lang = "vi-VN";
      utterance.rate = 1.0; // 0.1 - 10 (tốc độ nói)
      utterance.pitch = 1.2; // 0 - 2 (độ cao giọng nói)
      utterance.volume = 1.0; // 0 - 1 (âm lượng)
   
      // Chọn giọng nói cụ thể nếu có
      const voices = synth.getVoices().filter((v) => v.lang === "vi-VN");
      if (voices.length > 0) utterance.voice = voices[0];
   
      synth.speak(utterance);
   };
   

   return (
      <Container>
         <Center>
            <Button onClick={() => speak(text)}>🔊 Phát giọng nói</Button>
         </Center>
      </Container>
   );
}

export default TextToSpeak;
