export const isValidName = (name: string): boolean => {
    // Permite letras, acentos y espacios
    const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    return nameRegex.test(name.trim()) && name.length <= 255;
  };
  
  export const allowOnlyNumbers = (value: string) => {
    return value.replace(/\D/g, '');
  };
  
  
  export const isValidAddress = (address: string): boolean => {
    return address.length <= 255;
  };
  