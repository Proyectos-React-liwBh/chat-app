/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { RiErrorWarningLine } from "react-icons/ri";
import { MdDelete } from "react-icons/md";

/* Inicio del componente */
const Dropzone = ({ setImage, image, nombreAtributo }) => {
  const [styleDropzone, setStyleDropzone] = useState("baseStyle");
  const [dropError, setDropError] = useState({
    error: false,
    message: "",
  });

  const onDropRejected = (fileRejections) => {
    setStyleDropzone("baseStyle rejectStyle");
    // Tamaño máximo permitido en bytes (1MB)
    const maxSize = 1000000;
    // Formatos de imagen válidos
    const validFormats = ["image/jpeg", "image/png", "image/jpg", "image/webp"];

    const acceptedFiles = [];
    const rejectedFiles = [];

    fileRejections.forEach((rejection) => {
      const isTooLarge = rejection.file.size > maxSize;
      const isInvalidFormat = !validFormats.includes(rejection.file.type);

      if (isTooLarge || isInvalidFormat) {
        rejectedFiles.push(rejection.file);
      } else {
        acceptedFiles.push(rejection.file);
      }
    });

    //seteo de error maximo de imagenes
    if (acceptedFiles.length > 1) {
      setDropError({
        error: true,
        message: "Solo se pueden subir una imágen.",
      });
    }

    if (rejectedFiles.length > 0) {
      let errorMessage = "";

      rejectedFiles.forEach((file) => {
        if (file.size > maxSize) {
          errorMessage += `El archivo "${file.name}" supera el tamaño máximo permitido.\n`;
        }

        if (!validFormats.includes(file.type)) {
          errorMessage += `El archivo "${file.name}" tiene un formato no válido.\n`;
        }
      });

      setDropError({
        error: true,
        message: errorMessage,
      });
    }
  };

  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles.length > 1) {
      setDropError({
        error: true,
        message: "Solo se pueden subir una imágen.",
      });

      return;
    }

    setStyleDropzone("baseStyle focusedStyle");
    const validImage = [];
    const invalidImage = [];

    const file = acceptedFiles[0];

    const image = new Image();
    image.src = URL.createObjectURL(file);

    await new Promise((resolve) => {
      image.onload = () => {
        if (image.width === 800 && image.height === 600) {
          validImage.push({
            ...file,
            preview: URL.createObjectURL(file),
          });
        } else {
          invalidImage.push(file);
        }

        resolve();
      };
    });

    // imagen inválida, no respeta el tamaño 800x600
    if (invalidImage.length > 0) {
      setDropError({
        error: true,
        editar: true,
        message:
          "Las dimensiones de la imágen no son válidas (deben ser 800x600).",
      });

      return;
    }

    //convertir imagen a base64
    handleUrl(validImage[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpg": [],
      "image/jpeg": [],
      "image/png": [],
      "image/web": [],
    },
    maxSize: 1000000,
    maxFiles: 5,
    onDrop,
    onDropRejected,
  });

  // Función para convertir el archivo de imagen a base64
  const convertImageToBase64 = async (file) => {
    try {
      const response = await fetch(file.preview);
      const blob = await response.blob();

      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
          resolve(reader.result);
        };

        reader.onerror = (error) => {
          reject(error);
        };

        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error("Error al convertir la imagen en base64:", error);
      return null;
    }
  };

  const handleUrl = async (imageFile) => {
    try {
      const base64Image = await convertImageToBase64(imageFile);
      //console.log(base64Image); // imagen en formato base64
      setImage(nombreAtributo, base64Image);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteImage = () => {
    setImage(nombreAtributo, "");
  };

  //reseteo de error
  useEffect(() => {
    if (dropError.error) {
      setTimeout(() => {
        setDropError({
          error: false,
          message: "",
        });
      }, 5000);
    }
  }, [dropError.error]);

  //reseteo de estilo
  useEffect(() => {
    setTimeout(() => {
      setStyleDropzone("baseStyle");
    }, 5000);
  }, [styleDropzone]);

  return (
    <>
      <div className="">
        {/* input del dropzone */}
        <div {...getRootProps()} className={styleDropzone}>
          <input {...getInputProps()} />
          <p className="text-white">
            Arrastre y suelte la imagen aquí, o haga clic para seleccionar la
            imagen
          </p>
        </div>

        {/* Mensaje de aviso */}
        {dropError.error && (
          <p className="error_dropzone">
            {dropError.message} <RiErrorWarningLine />
          </p>
        )}

        {dropError.editar && (
          <div className="text-center pt-3">
            <a
              href="https://www.fotor.com/es/features/crop.html"
              className="text-decoration-none text-center bg-light py-2 px-4 rounded shadow"
              target="_blank"
              rel="noopener noreferrer"
            >
              Si desea editar la imagen, <strong>haga clic aquí</strong>
            </a>
          </div>
        )}

        {/* vista previa de la imagen */}
        <div className="previo_image_dropzone">
          {image && (
            <div className="dropzone-image-container">
              <img src={image} width={200} height={200} alt={"vista previa"} />
              <button
                type="button"
                className="rounded-1 py-1 d-flex justify-content-center align-content-center border-0  dropzone-delete-button"
                onClick={() => handleDeleteImage()}
              >
                <MdDelete className="" />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dropzone;
