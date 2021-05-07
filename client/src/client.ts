import 'normalize.css'
import './node_modules/styles/global.css'
import * as sapper from '@sapper/app'

sapper.start({
  target: document.querySelector('#sapper'),
})
