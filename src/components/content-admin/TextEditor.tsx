import { Link, RichTextEditor } from "@mantine/tiptap";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { Transaction } from "@tiptap/pm/state";
import { Content, Editor, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
type Props = {
   value: Content | undefined;
   onUpdate?: ((props: { editor: Editor; transaction: Transaction }) => void) | undefined;
};

export default function TextEditor({ value, onUpdate }: Props) {
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
      extensions: extensions,
      content: value,
      onUpdate: onUpdate,
   });

   return (
      <RichTextEditor editor={editor}>
         <RichTextEditor.Toolbar sticky stickyOffset={60}>
            <RichTextEditor.ControlsGroup>
               <RichTextEditor.Bold />
               <RichTextEditor.Italic />
               <RichTextEditor.Underline />
               <RichTextEditor.Strikethrough />
               <RichTextEditor.ClearFormatting />
               <RichTextEditor.Highlight />
               <RichTextEditor.Code />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
               <RichTextEditor.H1 />
               <RichTextEditor.H2 />
               <RichTextEditor.H3 />
               <RichTextEditor.H4 />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
               <RichTextEditor.Blockquote />
               <RichTextEditor.Hr />
               <RichTextEditor.BulletList />
               <RichTextEditor.OrderedList />
               <RichTextEditor.Subscript />
               <RichTextEditor.Superscript />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
               <RichTextEditor.Link />
               <RichTextEditor.Unlink />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
               <RichTextEditor.AlignLeft />
               <RichTextEditor.AlignCenter />
               <RichTextEditor.AlignJustify />
               <RichTextEditor.AlignRight />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
               <RichTextEditor.Undo />
               <RichTextEditor.Redo />
            </RichTextEditor.ControlsGroup>
         </RichTextEditor.Toolbar>

         <RichTextEditor.Content />
      </RichTextEditor>
   );
}
