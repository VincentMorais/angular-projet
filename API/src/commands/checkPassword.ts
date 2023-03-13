import bcrypt from 'bcrypt';

const CheckPassword = async (passwordInput: string, passwordHash: string) => {
  const check = await bcrypt.compare(passwordInput, passwordHash);

  return check;
};

export default CheckPassword;
