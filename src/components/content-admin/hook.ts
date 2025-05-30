import Image from "@tiptap/extension-image";
import { Link } from "@mantine/tiptap";
import Highlight from "@tiptap/extension-highlight";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useState } from "react";

export function useRichTextEditor(initialContent?: string) {
   const [content, setContent] = useState(initialContent);
   const [editorKey, setEditorKey] = useState(Date.now());

   const extensions = [
      StarterKit,
      Underline,
      Link,
      Superscript,
      Subscript,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Image.configure({ inline: false, allowBase64: true }),
   ];

   const editor = useEditor({
      extensions,
      content: content || "",
   });

   useEffect(() => {
      if (editor) {
         editor.commands.setContent(content || "");
      }
   }, [content, editor]);

   const resetEditor = () => {
      setContent("");
      setEditorKey(Date.now()); // force rebuild
   };

   return { editor, setContent, resetEditor, editorKey };
}
