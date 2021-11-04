import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class RegisterController {
  public async registerView({ view }) {
    return view.render('auth/register')
  }

  public async register({ auth, request, response }: HttpContextContract) {
    const userSchema = schema.create({
      name: schema.string({ trim: true }, [rules.maxLength(50)]),
      email: schema.string({ trim: true }, [rules.unique({ table: 'users', column: 'email' })]),
      password: schema.string({}, [rules.minLength(6), rules.confirmed('password_confirmation')]),
    })

    await request.validate({
      schema: userSchema,
      messages: {
        required: '{{ field }} field is required',
        minLength: '{{field}} must be at least {{ options.minLength }} characters',
      },
    })
    const user = await User.create(request.except(['password_confirmation']))
    await auth.use('web').login(user)

    return response.redirect().toPath('/')
  }
}
