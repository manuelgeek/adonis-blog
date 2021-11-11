/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/
import Event from '@ioc:Adonis/Core/Event'

declare module '@ioc:Adonis/Core/Event' {
  interface EventsList {
    'new:user': { id: number; email: string }
  }
}

// Event.on('new:user', (user) => {
//   console.log(user)
// })

Event.on('new:user', 'User.onNewUser')
