import mongodb from '../config/mongodb';

const FIELDS = [
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

export const signupParamsValidator = async (
  body: any,
): Promise<Error | null> => {
  if (!body) return new Error(`Missing body`);

  for (const field of FIELDS) {
    if (!body[field]) return new Error(`Missing field: ${field}`);
  }

  const usersCollection = await mongodb.getCollection('users');
  const userExists = await usersCollection.findOne({email: body.email});

  if (userExists) return new Error(`User already exists`);

  if (body.password !== body.passwordConfirmation) {
    return new Error(`Passwords don't match`);
  }

  return null;
};
