import asteroide from "../assets/Image/asteroide.png";
import asteroide2 from "../assets/Image/asteroide2.png";
import asteroide3 from "../assets/Image/asteroide3.png";

const Asteroids = () => {
  return (
    <div className="">
      <img src={asteroide} alt="Asteroide" className="asteroid first" />
      <img src={asteroide2} alt="Asteroide" className="asteroid second" />
      <img src={asteroide3} alt="Asteroide" className="asteroid third " />
    </div>
  );
};

export default Asteroids;
