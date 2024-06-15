// formRegex.ts
// export const regexPatterns = {
//   firstName: /^[A-Za-z]+$/,
//   lastName: /^[A-Za-z]+$/,
//   email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//   password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
//   phoneNumber: /^\+?\d{1,3}[- ]?\d{3}[- ]?\d{3}[- ]?\d{4}$/,
//   location: /^[A-Za-z\s]+$/, 
// };

const phoneNumber = /^\+?\d{1,3}[- ]?\d{3}[- ]?\d{3}[- ]?\d{4}$/;


export{
  phoneNumber,
}
