const todosBox = document.querySelector(".todos_box")
const addButton = document.querySelector('.custom_button')
const inputText = document.querySelector(".input_text")
const deleteAllTask = document.querySelector('.buttonCustomDelete')
const customInput = document.querySelector('.custom_input')

let allTask = JSON.parse(localStorage.getItem('arrTodos')) || []

const addElement = () => { //добавляем новый элемент в массив
  if (inputText.value !== '') {
    allTask.push({ 'text': inputText.value })
    localStorage.setItem('arrTodos', JSON.stringify(allTask))
    render()
    inputText.value = ''
  }
}

inputText.addEventListener('keydown', (e) => {//добавить задачу на нажатие Enter
  if (e.key === 'Enter') {
    addElement()
  }
})

addButton.addEventListener('click', () => addElement())//добавить задачу на нажатие кнопки

const cleanChild = () => {//удаляем со страницы предыдущие таски чтоб зарендерить новые
  while (todosBox.firstChild) {
    todosBox.removeChild(todosBox.firstChild);
  }
}


const render = () => {//функция рендера тасок
  cleanChild()//очищаем перед использованием контейнер
  allTask.map((item, i) => {//мапим наши новые значения

    const newTask = document.createElement('div')//создаем новый див
    const buttonBox = document.createElement('div')//создаем див для кнопок удаления и редактирования
    const divText = document.createElement('div')//создаем див с текстом
    const newImgEdit = document.createElement('img')//создаем новый тег img edit
    const newImgDelete = document.createElement('img')//создаем новый тег img delete

    newImgEdit.className = 'buttonEdit'
    newImgDelete.className = 'buttonDelete'
    buttonBox.className = 'buttonBox'//добавляем классы к созданным элементам
    divText.className = 'divText'//добавляем классы к созданным элементам
    newTask.className = "todo"//добавляем классы к созданным элементам

    newImgEdit.src = './image/edit_black_24dp.svg'//добаляем ссылки на изображения
    newImgDelete.src = './image/clear_black_24dp.svg'//добаляем ссылки на изображения

    divText.innerHTML = item.text//задаем диву текст

    buttonBox.appendChild(newImgEdit)//добавляем в блок с кнопками кнопку редактирования
    buttonBox.appendChild(newImgDelete)//добавляем в блок с кнопками кнопку удаления

    newTask.id = `todo-${i}`//добаляем ссылки id на таск

    newTask.appendChild(divText)//добаляем див с текстом в новый таск
    newTask.appendChild(buttonBox)//добаляем блок с кнопками в новый таск
    todosBox.appendChild(newTask)//добавляем новый таск в контейнер для тасков
    newImgDelete.addEventListener('click', () => deleteTask(i))
    newImgEdit.addEventListener('click', () => editTask(i))

  })
  
}

render()

const deleteTask = (i) => {
  allTask.splice(i, 1)
  localStorage.setItem('arrTodos', JSON.stringify(allTask))
  render()
}

const saveText = (i,text) => {
  allTask[i].text = text
  localStorage.setItem('arrTodos', JSON.stringify(allTask))
  render()
}

const editTask = (i) => {
  const newInput = document.createElement('input')
  const buttonSave = document.createElement('img')
  buttonSave.src = './image/check_circle_black_24dp.svg'
  buttonSave.className = 'buttonSave'
  newInput.className = 'editText'
  const currentTodo = document.querySelector(`#todo-${i}`)
  const childBox = currentTodo.childNodes
  const divText = childBox[0]
  const buttonBox = childBox[1]
  divText.replaceWith(newInput)
  newInput.value = divText.innerHTML
  const childButtonBox = buttonBox.childNodes
  childButtonBox[0].replaceWith(buttonSave)
  buttonSave.addEventListener('click', () => saveText(i,newInput.value))
}

deleteAllTask.addEventListener('click', () => {
  allTask = []
  localStorage.setItem('arrTodos', JSON.stringify(allTask))
  render()
})

const checkTodo = () =>{
  // 
  //   const buttonCustomDelete = document.createElement('img')
  //   buttonCustomDelete.className = 'buttonCustomDelete'
  //   buttonCustomDelete.src = './image/delete_all_24dp.svg'
  //   buttonCustomDelete.title = 'Удалить все задачи'
  //   customInput.appendChild(buttonCustomDelete)
  // 
}
















