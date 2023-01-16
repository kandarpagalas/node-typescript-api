import { httpResponse, httpRequest } from '../protocols/http'
import { MissingParamError, InvalidParamError } from '../errors'
import { badRequest, serverError } from '../helpers/http-helper'
import { Controller } from '../protocols/controller'
import { EmailValidator } from '../protocols/EmailValidator'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: httpRequest): httpResponse {
    try {
      const { body } = httpRequest
      const requiredFields: string[] = [
        'name',
        'email',
        'password',
        'passwordConfirmation'
      ]

      for (const field of requiredFields) {
        if (!body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { email } = body
      if (!this.emailValidator.isValid(email)) {
        return badRequest(new InvalidParamError('email'))
      }
    } catch (error) {
      return serverError()
    }

    return {
      statusCode: 200,
      body: {}
    }
  }
}
