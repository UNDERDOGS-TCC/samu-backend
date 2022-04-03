export const signupParamsValidator = (body: any): Error | null => {
  const fields = ['email', 'password', 'passwordConfirmation'];

  if (!body) return new Error(`Missing body`);

  for (const field of fields) {
    if (!body[field]) return new Error(`Missing field: ${field}`);
  }

  return null;
};
