import {inject} from '@loopback/core';
import {genSalt, hash} from 'bcryptjs';

interface PasswordHasher<T = string> {
  hashPassword(password: T): Promise<T>;
}

export class BcryptHasher implements PasswordHasher<string> {
  @inject('rounds')
  public readonly rounds: number;
  // round = 10;
  async hashPassword(password: string) {
    const salt = await genSalt(this.rounds);
    return hash(password, salt);
  }
}
