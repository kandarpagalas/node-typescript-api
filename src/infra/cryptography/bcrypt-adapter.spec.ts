import bcryptjs from 'bcryptjs'
import { BcryptAdapter } from './bcrypt-adapter'

// jest.mock('bcryptjs', () => ({
//   async hash (): Promise<string> {
//     return await new Promise(resolve => { resolve('hash') })
//   }
// }))

describe('Bcrypt Adapter', () => {
  it('should call bcrypt with correct values', async () => {
    const salt = 12
    const sut = new BcryptAdapter(salt)
    const hashSpy = jest.spyOn(bcryptjs, 'hash')

    await sut.encrypt('any_value')

    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })

  it('should return a hash on success', async () => {
    const salt = 12
    const sut = new BcryptAdapter(salt)

    jest.spyOn(bcryptjs, 'hash').mockImplementation(async () => {
      return await new Promise(resolve => { resolve('hash') })
    })

    const hash = await sut.encrypt('any_value')

    expect(hash).toBe('hash')
  })
})
