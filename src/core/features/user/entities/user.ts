
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
}
