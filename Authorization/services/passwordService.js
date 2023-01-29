import bcrypt from "bcrypt";

class PasswordService {
  async hashPasword(password) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
  }

  async validatePassword(password, passwordHash) {
    return await bcrypt.compare(password, passwordHash);
  }
}

const passwordService = new PasswordService();
export default passwordService;
