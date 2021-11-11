import Mail from '@ioc:Adonis/Addons/Mail'
import { EventsList } from '@ioc:Adonis/Core/Event'
import Route from '@ioc:Adonis/Core/Route'

export default class User {
  public async onNewUser(user: EventsList['new:user']) {
    // send email to the new user
    // console.log(user)
    await Mail.sendLater((message) => {
      message.htmlView('emails/welcome', {
        user,
        url: Route.makeUrl('login')
      })
        .from('test@app.com')
        .to(user.email)
        .subject('Welcome Onboard!')
    })
  }
}
