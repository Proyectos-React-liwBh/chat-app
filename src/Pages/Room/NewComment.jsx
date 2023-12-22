/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ErrorForm from "../../Components/ErrorForm";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineClear } from "react-icons/ai";
import { BiSend } from "react-icons/bi";

const NewComment = ({ room }) => {
  const dispatch = useDispatch();

  const [content, setContent] = useState("");
  const [validations, setValidations] = useState("");
  const { token } = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();

    //validar que el contenido no este vacio
    if (!content.trim()) {
      setValidations("El contenido no puede estar vacio!");
      return;
    }

    console.log({ content, room_id: room.id, token });
    alert(JSON.stringify({ content, room_id: room.id, token }, null, 2));

    //enviar el comentario al servidor
    //dispatch( createComment({ token, comment }));

    //reseteo el valor del textarea
    setContent("");
  };

  useEffect(() => {
    if (validations && content.trim() !== "") {
      setValidations("");
    }
  }, [content, validations]);

  const handleClearContent = () => {
    setContent(""); // Reset the content state
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
        { color: [] },
      ],
      ["link"],
      ["clean"],
    ],
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
    "link",
    "clean",
  ];

  return (
    <div className="row py-3 rounded">
      <form onSubmit={handleSubmit} className="w-100">
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
            />

            <button
              onClick={handleClearContent}
              className="btn border-0 bg-transparent react-quill-clear"
              type="button"
            >
              <AiOutlineClear className="react-quill-clear-icon"/>
            </button>
            <button
              className="btn border-0 react-quill-send"
              type="submit"
            >
              <BiSend className="fs-4 react-quill-send-icon"/>
            </button>
          </div>

          {validations && (
            <div className="text-center">
              <ErrorForm message={validations} />
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default NewComment;
