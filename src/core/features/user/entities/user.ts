import { compare, hash } from 'bcryptjs';
import { JWT_SECRET } from '../../../utils/constants';

export interface UserProps {
  id?: string;
  name: string;
  email: string;
  password?: string;
}

export default class User implements UserProps {
  id?: string;
  name!: string;
  email!: string;
  password?: string;

  constructor({ id, name, email, password }: UserProps) {
    Object.assign(this, {
      id,
      name,
      email,
      password
    });
  }

  async comparePasswords(candidatePassword: string) {
    if (!this.password) return false;
    return await compare(candidatePassword + JWT_SECRET, this.password);
  }

  async hashPassword() {
    if (this.password &&
      !this.password.includes('$2a$12$') &&
      this.password.length < 60
    ) {
      this.password = await hash(this.password + JWT_SECRET, 12);
    }
  }
}
