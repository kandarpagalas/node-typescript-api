import bcryptjs from 'bcryptjs'
import { Encrypter } from './bcrypt-adapter-protocols'

export class BcryptAdapter implements Encrypter {
  private readonly salt: number
  constructor (salt: number) {
    this.salt = salt
  }

  async encrypt (value: string): Promise<string> {
    const hash = await bcryptjs.hash(value, this.salt)
    return hash
  }
}
