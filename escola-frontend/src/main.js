import './style.css'
import { setupCounter } from './counter.js'
import Common from "./js/common.js";

const btnLogin = document.querySelector('#btnLogin');
const inputs = document.querySelectorAll('input');

btnLogin.addEventListener('click', e => {
  e.preventDefault();

  const data = {};

  inputs.forEach(input => {
      const name = input.name;
      data[name] = input.value;
  });

  Common.login(data, () => {
      window.location.href = './src/views/student.html';
  });
});
