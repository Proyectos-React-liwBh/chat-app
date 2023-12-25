/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { modules, formats } from "../../assets/ReactQuill/ConfigReactQuill";
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
import TimerChat from "./TimerChat";

const NewComment = ({ room }) => {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const [validations, setValidations] = useState("");
  const { token } = useSelector((state) => state.user);
  const [comment, setComment] = useState(false);
  const { loading, commentCurrent } = useSelector((state) => state.comment);

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

    const cleanedContent = DOMPurify.sanitize(
      content.replace(/<p><br\s*\/?><\/p>\s*$/, "")
    );
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
      setComment(true);
    }

    //reseteo el valor del textarea
    setContent("");
  };

  const handleClearContent = () => {
    setContent(""); // Reset the content state
    dispatch(setCommentCurrent(null));
  };

  const handlePressEnter = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      //remover de contenten el parrafo vacio
      const cleanedContent = content.replace(/<p><br\s*\/?><\/p>\s*$/, "");
      setContent(cleanedContent);
      //enviar el comentario al servidor
      handleSubmit(e);
    }
  };

  useEffect(() => {
    if (comment) {
      setTimeout(() => {
        setComment(false);
      }, 8000);
    }
  }, [comment]);

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

  return (
    <div className="row py-3 rounded">
      <h5 className="text-center">Nuevo comentario</h5>
      <hr />
      {comment && <TimerChat maxMinutes={0} maxSeconds={8} />}
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
              onKeyDown={handlePressEnter}
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
