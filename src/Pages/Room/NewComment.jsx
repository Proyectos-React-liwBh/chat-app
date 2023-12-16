

const NewComment = () => {
  return (
    <div className="form-chat">
      <form className="d-flex align-items-center">
        <textarea
          className="form-control"
          placeholder="Escribe un comentario"
          rows="3"
        ></textarea>
        <button className="btn btn-dark ms-2">Enviar</button>
      </form>
    </div>
  )
}

export default NewComment