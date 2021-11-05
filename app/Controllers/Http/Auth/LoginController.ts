import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, ValidationException } from '@ioc:Adonis/Core/Validator'

export default class LoginController {
  public async loginView({ view }) {
    return view.render('auth/login')
  }

  public async login({ auth, request, response }: HttpContextContract) {
    const userSchema = schema.create({
      email: schema.string({ trim: true }),
      password: schema.string(),
    })
    await request.validate({ schema: userSchema })

    const email = request.input('email')
    const password = request.input('password')

    try {
      await auth.use('web').attempt(email, password)
      response.redirect('/')
    } catch {
      throw new ValidationException(true, { email: ['Invalid email or password'] })
    }
  }

  public async logout({ auth, response }: HttpContextContract) {
    await auth.use('web').logout()
    response.redirect('/login')
  }
}
