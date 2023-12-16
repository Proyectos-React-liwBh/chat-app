const Spinner = () => {
  return (
    <div>
      <div className="row">
        <div className="d-flex flex-column justify-content-center align-items-center">
          <div className="loader">
            Loading
            <span></span>
          </div>
        </div>
        <small className="text-center mt-2">Por favor espere un momento...</small>
      </div>
    </div>
  );
};

export default Spinner;
