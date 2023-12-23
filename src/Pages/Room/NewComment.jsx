/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import quillEmoji from "react-quill-emoji";
import "react-quill-emoji/dist/quill-emoji.css";
import "react-quill/dist/quill.snow.css";
import ErrorForm from "../../Components/ErrorForm";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineClear } from "react-icons/ai";
import { BiSend } from "react-icons/bi";
import {
  createComment,
  editComment,
  setCommentCurrent,
} from "../../Redux/CommentSlice";
import DOMPurify from "dompurify";

const NewComment = ({ room }) => {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const [validations, setValidations] = useState("");
  const { token } = useSelector((state) => state.user);
  const { loading, commentCurrent } = useSelector((state) => state.comment);

  Quill.register(
    {
      "formats/emoji": quillEmoji.EmojiBlot,
      "modules/emoji-toolbar": quillEmoji.ToolbarEmoji,
      "modules/emoji-textarea": quillEmoji.TextAreaEmoji,
      "modules/emoji-shortname": quillEmoji.ShortNameEmoji,
    },
    true
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    //validar que el contenido no este vacio
    if (
      /^\s*$/.test(content) ||
      content.trim() === "<p><br></p>" ||
      content.length === 0 ||
      loading
    ) {
      setValidations("El contenido no puede estar vacio!");
      return;
    }

    const cleanedContent = DOMPurify.sanitize(content);
    const comment = { content: cleanedContent, room_id: room.id };

    //console.log(comment);
    //alert(JSON.stringify(comment, null, 2));
    //enviar el comentario al servidor
    if (commentCurrent) {
      dispatch(
        editComment({ token, comment: { ...comment, id: commentCurrent.id } })
      );

      dispatch(setCommentCurrent(null));
    } else {
      //enviar el comentario al servidor
      dispatch(createComment({ token, comment }));
    }

    //reseteo el valor del textarea
    setContent("");
  };

  useEffect(() => {
    if (validations !== "" && content.trim() !== "") {
      setValidations("");
    }
  }, [content, validations]);

  useEffect(() => {
    if (commentCurrent) {
      setContent(commentCurrent.content);
    }

    //console.log(commentCurrent)
  }, [commentCurrent]);

  const handleClearContent = () => {
    setContent(""); // Reset the content state
    dispatch(setCommentCurrent(null));
  };

  const modules = {
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
      ["emoji", { 'emoji-shortname': true, 'emoji-toolbar': { compact: true } }],
      ["clean"],
    ],
    "emoji-toolbar": true,
    "emoji-textarea": false,
    "emoji-shortname": true,
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };

  const formats = [
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

  return (
    <div className="row py-3 rounded">
      <form onSubmit={(e) => handleSubmit(e)} className="w-100">
        <div className="pb-5">
          <div className="container-react-quill">
            <ReactQuill
              theme="snow"
              value={content}
              style={{ height: "100px" }}
              modules={modules}
              formats={formats}
              placeholder="Escribe un comentario..."
              onChange={setContent}
              required
            />

            <button
              onClick={handleClearContent}
              className="btn border-0 bg-transparent react-quill-clear"
              type="button"
            >
              <AiOutlineClear className="react-quill-clear-icon" />
            </button>

            <button className="btn border-0 react-quill-send" type="submit">
              <BiSend className="fs-4 react-quill-send-icon" />
            </button>
          </div>
        </div>

        {validations !== "" ? (
          <div className="text-center text-danger">
            <ErrorForm className="bg-black" message={validations} />
          </div>
        ) : null}
      </form>
    </div>
  );
};

export default NewComment;
