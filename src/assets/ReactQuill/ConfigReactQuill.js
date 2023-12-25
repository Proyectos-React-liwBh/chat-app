import { Quill } from "react-quill";
import quillEmoji from "react-quill-emoji";
import "react-quill-emoji/dist/quill-emoji.css";

Quill.register(
    {
      "formats/emoji": quillEmoji.EmojiBlot,
      "modules/emoji-toolbar": quillEmoji.ToolbarEmoji,
      "modules/emoji-shortname": quillEmoji.ShortNameEmoji,
      //"modules/emoji-textarea": quillEmoji.TextAreaEmoji,
    },
    true
  );

  export const modules = {
    toolbar: [
      [{ font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
        { align: ["right", "center", "justify"] },
        { color: [true] },
      ],
      ["link", "code-block"],
      ["emoji", { 'emoji-toolbar': { compact: true },'emoji-shortname': true,  }],
      ["clean"],
    ],
    "emoji-toolbar": true,
    "emoji-shortname": true,
    //"emoji-textarea": false,
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };

  export const formats = [
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "align",
    "color",
    "emoji",
    "link",
    "code-block",
    "clean",
  ];