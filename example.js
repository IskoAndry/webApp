



const getRow = document.querySelector('#row')
const getModalBackdrop = document.querySelector('#backdrop')
const getProgress = document.querySelector('#progress')
const getModal = document.querySelector('#modal')
const getForm = document.querySelector('#form')

getRow.addEventListener('click', openCard)
getModalBackdrop.addEventListener('click', closeModal)
getModal.addEventListener('change', toggleTech)
getForm.addEventListener('submit', createTech)

const APP_TITLE = document.title 
const LS_KEY = 'MY_TECHS'

// const technologies = [
//   {
//     title: "HTML",
//     description: "HyperText Markup Language - стандартный язык разметки для создания веб-страниц",
//     type: "html",
//     done: true,
//   },
//   {
//     title: "CSS",
//     description: "Cascading Style Sheets - язык стилей для описания внешнего вида HTML-документов",
//     type: "css",
//     done: true
//   },
//   {
//     title: "JavaScript",
//     description: "Язык программирования для создания интерактивных веб-страниц",
//     type: "js",
//     done: true
//   },
//   {
//     title: "Git",
//     description: "Система контроля версий для отслеживания изменений в коде",
//     type: "git",
//     done: false
//   },
//   {
//     title: "React",
//     description: "JavaScript-библиотека для создания пользовательских интерфейсов",
//     type: "react",
//     done: false
//   },
//   {
//     title: "TypeScript",
//     description: "Типизированное надмножество JavaScript, добавляющее статическую типизацию",
//     type: "ts",
//     done: false
//   },
//   {
//     title: "SASS/SCSS",
//     description: "Препроцессор CSS, добавляющий переменные, вложенность, миксины и другие возможности",
//     type: "SASS/SCSS",
//     done: false
//   },
//   {
//     title: "Vite",
//     description: "Сборщик модулей для JavaScript-приложений",
//     type: "vite",
//     done: false
//   },
//   {
//     title: "Bootstrap",
//     description: "Популярный CSS-фреймворк для создания адаптивных веб-сайтов",
//     type: "bootstrap",
//     done: false
//   },
//   {
//     title: "Redux",
//     description: "Библиотека для управления состоянием JavaScript-приложений",
//     type: "redux",
//     done: false
//   },
//   {
//     title: "REST API",
//     description: "Архитектурный стиль для создания веб-сервисов",
//     type: "restApi",
//     done: false
//   },
//   {
//     title: "Node.js",
//     description: "Среда выполнения JavaScript на стороне сервера",
//     type: "Node",
//     done: false
//   }
// ];

// console.log(technologies)
const technologies = getState()

function openCard(event){
  const data = event.target.dataset
  const tech = technologies.find(t => t.type === data.type )
  if(!tech) return
    
  openModal(toModal(tech), tech.title)
}

function toModal(tech){
const checked = tech.done ? 'checked' : ''

  return `
    <h2>${tech.title}</h2>
    <p>${tech.description}</p>
	<hr>
	<div>
		<input type="checkbox" id="done" ${checked} data-type="${tech.type}">
		<label for="done">Выучил</label>
	</div>
  `
}

function toggleTech(e){
  const type = e.target.dataset.type
  const tech = technologies.find(t => t.type === type )
  tech.done = e.target.checked

saveState()
  init()
}

function openModal(html, title = APP_TITLE){
  document.title = `${title} | ${APP_TITLE}`
  getModal.innerHTML = html
  const modal = document.querySelector('.modal')
  getModal.classList.add('open')
}

function closeModal() {
  document.title = APP_TITLE
  getModal.classList.remove('open') 
  // console.log('2222')     
}

function init(){
  renderCards()
  renderProgress()
  
}

function renderProgress(){
  const percent = computerProgrPercent()

  let background
  if(percent <=30){
    background = 'red'
  }else if((percent > 30 && percent < 70)){
    background = 'orange'
  }else{
    background = 'green'
  }
  
  getProgress.style.background = background
  getProgress.style.width = percent + ' %'
  getProgress.textContent = percent ? percent + '%' : '0%'
}

function computerProgrPercent(){

  if(technologies.length === 0){
    return 0
  }

  let doneCount = 0
  for(let i = 0; i<technologies.length; i++){
    if(technologies[i].done === true) doneCount++
  }
    return (100 * doneCount / technologies.length).toFixed(0)

}

function renderCards(){
  if(technologies.length === 0){
    getRow.innerHTML = '<p class="empty> Технологий пока нет. Добавте технологию </p>'
  }else{
//     let html = ''
// for(let i=0; i<technologies.length; i++){
//   const tech = technologies[i]
//   html += toCard(tech)
// }
// getRow.innerHTML = html

    getRow.innerHTML = technologies.map(toCard).join('')

  }
}

function toCard(tech){
  // let doneClass = ''

  // if(tech.done){
  //   doneClass = 'done'
  // }else{
  //   doneClass = ''
  // }

  doneClass = tech.done ? 'done' : ''

  return `<div class="card ${doneClass}" data-type='${tech.type}'> <h3 data-type='${tech.type}'>${tech.title}</h3> </div>  `
}

function isInvalid(title, discription){
  return !title.value || !discription.value
}

function createTech(e){
  e.preventDefault()

  const {title, discription} = e.target

  if(isInvalid(title, discription)){  
    if(!title.value) title.classList.add('invalid')
    if(!discription.value) discription.classList.add('invalid')

    setTimeout(()=>{
      title.classList.remove('invalid')
      discription.classList.remove('invalid')
    }, 2000)

    return 
  }

  const newTech = {
    title: title.value,
    description: discription.value, // Здесь исправлено с discription на description
    done: false,
    type: title.value.toLowerCase()
  }
  technologies.push(newTech)
  title.value = ''
  discription.value = ''
  saveState()
  init()
}

function saveState(){
  localStorage.setItem(LS_KEY, JSON.stringify(technologies))
}
function getState(){
  const row = localStorage.getItem(LS_KEY)
  return row ? JSON.parse(row) : []
}


init()