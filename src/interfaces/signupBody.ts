export interface SignupBody {
  name: string;
  password: string;
  passwordConfirmation?: string;
  cpf: string;
  birthday: string;
  cellphone: string;
  email: string;
  address: string;
  complement?: string;
  cep: string;
  state: string;
  city: string;
}
