import { IoCalendarSharp } from "react-icons/io5";
import { ImFileText } from "react-icons/im";
import { FaUser } from "react-icons/fa";
import { MdOutlineRoomPreferences } from "react-icons/md";


const CardNotification = () => {
  return (
    <li className="text-white p-1 mx-2 ">
        <div className="d-flex flex-column bg-card-notifications p-2 text-start border rounded">
            <span className="fw-bold"><FaUser className="text-white me-2"/> liwbh</span>
            <span className="small fw-bold"><MdOutlineRoomPreferences className="text-white me-2" />Programacion en Python</span>
            <span className="fst-italic small"><ImFileText className="text-white me-2"/> Nuevo comentario</span>
            <span className="small"><IoCalendarSharp className="text-white me-2"/>6/12/2023</span>
        </div>
    </li>
  )
}

export default CardNotification