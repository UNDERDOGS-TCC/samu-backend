export interface User {
  _id?: string;
  name: string;
  password?: string;
  cpf: string;
  birthday: string;
  cellphone: string;
  email: string;
  address: string;
  cep: string;
  state: string;
  city: string;
  complement?: string;
  imageUri?: string;
}
