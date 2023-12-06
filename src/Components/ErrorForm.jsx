/* eslint-disable react/prop-types */
import { BiErrorCircle } from "react-icons/bi";

const ErrorForm = ({message}) => {
  return (
    <div className=" m-0 small error_form">
    {message} <BiErrorCircle />
  </div>
  )
}

export default ErrorForm