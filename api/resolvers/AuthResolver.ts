import { Arg, Mutation, Resolver } from 'type-graphql';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import { UserModel } from '../entity/User';
import { AuthInput } from '../types/AuthInput';
import { UserResponse } from '../types/UserResponse';

@Resolver()
export class AuthResolver {
  @Mutation(() => UserResponse)
  async register(
    @Arg('input') { email, password }: AuthInput
  ): Promise<UserResponse> {
    // 1. Check for existing user email
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw new Error('Email already in use');
    }

    if (!email || !password) {
      throw new Error('email and password is required');
    }

    // 2. Create new user with hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({ email, password: hashedPassword });

    await user.save();

    // 3. Store user id on the token payload
    const payload = {
      id: user.id,
    };

    const token = jwt.sign(
      payload,
      process.env.SESSION_SECRET || '7fyecf782fdehf'
    );

    return { user, token };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg('input') { email, password }: AuthInput
  ): Promise<UserResponse> {
    const user = await UserModel.findOne({ email });

    if (!email || !password) {
      throw new Error('email and password is required');
    }

    if (!user) {
      throw new Error();
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      throw new Error('Invalid login');
    }

    // Store user id on the token Payload
    const payload = {
      id: user.id,
    };

    const token = jwt.sign(
      payload,
      process.env.SESSION_SECRET || '7fyecf782fdehf'
    );

    return { user, token };
  }
}
