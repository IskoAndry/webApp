


const getModal = document.querySelector('#modal')
const getRow = document.querySelector('#row')
const getModalBackdrop = document.querySelector('#backdrop')

getRow.addEventListener('click', openCard)
getModalBackdrop.addEventListener('click', closeModal)

const technologies = [
  {
    title: "HTML",
    description: "HyperText Markup Language - стандартный язык разметки для создания веб-страниц",
    type: "html",
    done: false
  },
  {
    title: "CSS",
    description: "Cascading Style Sheets - язык стилей для описания внешнего вида HTML-документов",
    type: "css",
    done: false
  },
  {
    title: "JavaScript",
    description: "Язык программирования для создания интерактивных веб-страниц",
    type: "js",
    done: false
  },
  {
    title: "Git",
    description: "Система контроля версий для отслеживания изменений в коде",
    type: "git",
    done: false
  },
  {
    title: "React",
    description: "JavaScript-библиотека для создания пользовательских интерфейсов",
    type: "react",
    done: false
  },
  {
    title: "TypeScript",
    description: "Типизированное надмножество JavaScript, добавляющее статическую типизацию",
    type: "ts",
    done: false
  },
  {
    title: "SASS/SCSS",
    description: "Препроцессор CSS, добавляющий переменные, вложенность, миксины и другие возможности",
    type: "css",
    done: false
  },
  {
    title: "Vite",
    description: "Сборщик модулей для JavaScript-приложений",
    type: "vite",
    done: false
  },
  {
    title: "Bootstrap",
    description: "Популярный CSS-фреймворк для создания адаптивных веб-сайтов",
    type: "css",
    done: false
  },
  {
    title: "Redux",
    description: "Библиотека для управления состоянием JavaScript-приложений",
    type: "js",
    done: false
  },
  {
    title: "REST API",
    description: "Архитектурный стиль для создания веб-сервисов",
    type: "web",
    done: false
  },
  {
    title: "Node.js",
    description: "Среда выполнения JavaScript на стороне сервера",
    type: "js",
    done: false
  }
];

console.log(technologies)

function openCard(){
    getModal.classList.add('open')
    console.log('1111')
}

function closeModal() {
  getModal.classList.remove('open') 
  console.log('2222')     
}

let html = ''
for(let i=0; i<technologies.length; i++){
  const tech = technologies[i]
  html +=`
  <div class="card">
    <h3>${tech.title}</h3>
  </div>
  `
}
getRow.innerHTML = html