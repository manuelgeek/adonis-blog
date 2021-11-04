import View from '@ioc:Adonis/Core/View'
import Env from '@ioc:Adonis/Core/Env'

View.global('app_name', function () {
  return Env.get('APP_NAME')
})
