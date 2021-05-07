import 'normalize.css'
import './styles/global.css'
import * as sapper from '@sapper/app'

sapper.start({
  target: document.querySelector('#sapper'),
})
