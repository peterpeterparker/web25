import './style.css'
import { sayHello } from './greet.js'

document.querySelector('#app').innerHTML = `
  <div>
    <div class="card">
      <button id="greet" type="button">Greet</button>
    </div>
  </div>
`

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#greet").addEventListener("click", sayHello)
}, {once: true})
