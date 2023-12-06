
// Validación de Correo Electrónico
export const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

// Validación de Número Entero
export const integerRegex = /^\d+$/;

// Validación de Número Decimal
export const decimalRegex = /^\d+(\.\d+)?$/;

// Validación de Número de Teléfono (Formato Internacional)
export const phoneRegex = /^\+\d{1,3}-\d{6,14}$/;

// Validación de URL
export const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;

// Validación de Código Postal (para EE. UU.)
export const zipCodeRegex = /^\d{5}(-\d{4})?$/;

// Validación de Fecha en Formato MM/DD/AAAA
export const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;

// Validación de Tarjeta de Crédito (Número de 16 Dígitos)
export const creditCardRegex = /^\d{16}$/;

// Validación de Nombre (Solo Letras y Espacios)
export const nameRegex = /^[a-zA-ZÁáÉéÍíÓóÚúÑñ\s]+$/;

// Validación de Contraseña (Al menos una Mayúscula, una Minúscula y un Número, Longitud entre 8 y 20)
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,16}$/;

// Validación de Texto Alfabético (Solo Letras, Puede Contener Espacios)
export const alphabeticTextRegex = /^[a-zA-ZáéíóúÁÉÍÓÚ\s]+$/;

// Validación de Dirección (Letras, Números, Espacios y Caracteres Especiales)
export const addressRegex = /^[a-zA-Z0-9\s\-.,#]+$/;

// Validación de Código Alfanumérico (Letras Mayúsculas y Números, Longitud 6)
export const alphanumericCodeRegex = /^[A-Z0-9]{6}$/;

// Validación de Texto con Letras, Números, Espacios y Algunos Caracteres Especiales
export const textRegex = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]+[^,.\-/()¿?¡!]*$/;
