/* eslint-disable max-classes-per-file */
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../userModel';

export interface IAuthUser extends Omit<IUser, 'password'> {
  token?: string;
}

export const generateToken = (id: any) => jwt.sign({ _id: id }, process.env.JWT_SECRET, {
  expiresIn: '1h',
});

export class AlreadyExistsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AlreadyExistsError';
  }
}

export const createUser = async (
  name: string,
  email: string,
  password: string,
): Promise<IAuthUser> => {
  const user = await User.findOne({ email });
  if (user) {
    throw new AlreadyExistsError('User already exists');
  }

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser :IUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  return {
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    token: generateToken(newUser._id),
  };
};

export class InvalidCredentialsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidCredentialsError';
  }
}

export class UserNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UserNotFoundError';
  }
}

export const authenticateUser = async (
  email: string,
  password: string,
): Promise<IAuthUser> => {
  const user: IUser = await User.findOne({ email });
  if (!user) {
    throw new UserNotFoundError('User not found');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new InvalidCredentialsError('Invalid credentials');
  }
  const authUser: IAuthUser = { ...user, token: generateToken(user._id) };
  return authUser;
};
