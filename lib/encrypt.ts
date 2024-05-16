import bcrypt from "bcrypt";

const encrypt = async (password: string) => {

  try {
    const encrpytedPassword = await bcrypt.hash(password, 10);
    return encrpytedPassword
  } catch (error) {
    console.log('failed to encrypt password', error);
  }
}

const verify = async (password: string, encryptedPassword: string) => {
  const isMatch = await bcrypt.compare(password, encryptedPassword);
  if (isMatch) {
    return true
  } else {
    return false
  }
}

export { encrypt as default, verify };
