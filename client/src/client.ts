import 'normalize.css'
import './styles/global.css'
import 'highlight.js/styles/github.css'
import 'github-markdown-css'
import * as sapper from '@sapper/app'

sapper.start({
  target: document.querySelector('#sapper'),
})
