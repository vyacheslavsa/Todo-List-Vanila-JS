const todosBox = document.querySelector(".todos_box")
const addButton = document.querySelector('.custom_button')
const inputText = document.querySelector(".input_text")
const deleteAllTask = document.querySelector('.buttonCustomDelete')
const customInput = document.querySelector('.custom_input')

let allTask = JSON.parse(localStorage.getItem('arrTodos')) || []

const addElement = () => { //добавляем новый элемент в массив
  if (inputText.value !== '') {//проверяем не пустая ли строка в инпуте
    allTask.push({ 'text': inputText.value })//добавляем новое значение объект в массив
    localStorage.setItem('arrTodos', JSON.stringify(allTask))//обновляем localstorage
    render()//перерендериваем контент
    inputText.value = ''//очищаем инпут от старого значения
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

    newImgEdit.className = 'buttonEdit'//добавляем классы к созданным элементам
    newImgDelete.className = 'buttonDelete'//добавляем классы к созданным элементам
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
    newImgDelete.addEventListener('click', () => deleteTask(i))//добавляем для кажждого элемента событие клик
    newImgEdit.addEventListener('click', () => editTask(i))//добавляем для кажждого элемента событие клик

  })
  
}

render()

const deleteTask = (i) => {//функция удаления одной задачи
  allTask.splice(i, 1)//удаляем выбранную задачу из массива
  localStorage.setItem('arrTodos', JSON.stringify(allTask))//обновляем localstorage
  render()//запускаем рендер
}

const saveText = (i,text) => {//функция сохранения измененного текста
  allTask[i].text = text//заменяем текс в нужном элементе
  localStorage.setItem('arrTodos', JSON.stringify(allTask))//обновляем localstorage
  render()//запускаем рендер
}

const editTask = (i) => {//функция редактирования текста
  const newInput = document.createElement('input')//создаем новый инпут для редактирования текста
  const buttonSave = document.createElement('img')//создаем кнопку сохранения измененного текста
  buttonSave.src = './image/check_circle_black_24dp.svg'//добавляем ссылку на изображение
  buttonSave.className = 'buttonSave'//создаем класс для кнопки сохранения
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

deleteAllTask.addEventListener('click', () => {//функция очистки всех элементов
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
















