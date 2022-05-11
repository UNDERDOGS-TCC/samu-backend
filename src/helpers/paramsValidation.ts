import mongodb from '../config/mongodb';

export const signupParamsValidator = async (
  body: any,
): Promise<Error | null> => {
  const SIGNUP_FIELDS = [
    'name',
    'password',
    'passwordConfirmation',
    'cpf',
    'birthday',
    'cellphone',
    'email',
    'address',
    'cep',
    'state',
    'city',
  ];

  if (!body) return new Error('Dados faltando');

  for (const field of SIGNUP_FIELDS) {
    if (!body[field])
      return new Error(`O seguinte campo está faltando: ${field}`);
  }

  const usersCollection = await mongodb.getCollection('users');
  const emailExists = await usersCollection.findOne({email: body.email});
  const cpfExists = await usersCollection.findOne({cpf: body.cpf});

  if (emailExists ?? cpfExists) return new Error('O usuário já existe');

  if (body.password !== body.passwordConfirmation) {
    return new Error('As senhas não são iguais');
  }

  return null;
};

export const updateParamsValidator = (body: any): Error | null => {
  const UPDATE_FIELDS = [
    'cellphone',
    'email',
    'address',
    'cep',
    'state',
    'city',
  ];

  if (!body) return new Error('Missing body');

  for (const field of UPDATE_FIELDS) {
    if (!body[field]) return new Error(`Missing field: ${field}`);
  }

  return null;
};
