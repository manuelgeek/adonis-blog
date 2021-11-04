import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { inspect } from 'util'
import { schema, rules } from '@ioc:Adonis/Core/Validator';

export default class LoginController {
  public async loginView({ view }) {
    return view.render('auth/login')
  }

  public async register({ request }: HttpContextContract) {
    const userSchema = schema.create({
      name: schema.string({ trim: true }, [
        rules.maxLength(50),
      ]),
      email: schema.string({ trim: true }, [rules.unique({ table: 'users', column: 'email' })]),
      password: schema.string({}, [rules.minLength(8)])
    });
    console.log(request.all())
    inspect(request.all())
  }


  public async login({ request }: HttpContextContract) {
    const userSchema = schema.create({
      name: schema.string({ trim: true }, [
        rules.maxLength(50),
      ]),
      email: schema.string({ trim: true }, [rules.unique({ table: 'users', column: 'email' })]),
      password: schema.string({}, [rules.minLength(8)])
    });
    console.log(request.all())
    inspect(request.all())
  }
}
