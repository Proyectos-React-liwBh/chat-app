const Spinner = () => {
  return (
    <div>
      <div className="row py-5">
        <div className="d-flex flex-column justify-content-center align-items-center">
          <div className="loader">
            Loading
            <span></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
