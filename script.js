let allTasks = JSON.parse(localStorage.getItem('tasks')) || [];
let valueInput = '';
let input = null;

window.onload = function init () {
    input = document.getElementById('add-task');
    input.addEventListener('change', updateValue);
    render();
   
//    const tasks =  JSON.parse(localStorage.getItem('tasks'));
}

const onClickDelete = () => {
    allTasks = [];
    localStorage.setItem('tasks', JSON.stringify(allTasks)); 
    render();
}

const onClickButton = () => {
    allTasks.push({
        text: valueInput,
        isCheck: false
    })
    localStorage.setItem('tasks', JSON.stringify(allTasks)); 
    valueInput = '';
    input.value = '';
    render();
}

const updateValue = (event) => {
valueInput = event.target.value;
}

const render = () => {
    const content = document.getElementById('content-page');
    while (content.firstChild) {
        content.removeChild(content.firstChild);
    }
allTasks.map((item, index) => {
    
    const container = document.createElement('div');
    container.id = `task-${index}`;
    container.className = 'task-container';
    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.checked = item.isCheck;
    checkBox.onchange = function () {
        onChangeCheckbox(index);
    }
    container.appendChild(checkBox);
    const text = document.createElement('p');

    text.innerText = item.text;
    
    text.className = item.isCheck ? 'text-task done-text' : 'text-task';
    container.appendChild(text);
    const imageEdit = document.createElement('i');
    imageEdit.className = 'far fa-edit';
    container.appendChild(imageEdit);
    const test = item.text;
    imageEdit.onclick = () => {
        imageEdit.className = 'far fa-check-square';
        imageDelete.className = 'fas fa-backspace';
        const inputTask = document.createElement('input');
        inputTask.value = text.innerText;
        container.replaceChild(inputTask, text);
        
        imageEdit.onclick = () => {             
            editVal(text, inputTask, container, item);         
        }
        imageDelete.onclick = () => {
            inputTask.value = test;         
            render();
        }
        
       
        }
    const imageDelete = document.createElement('i');
    imageDelete.className = 'far fa-trash-alt';
    container.appendChild(imageDelete);
    imageDelete.onclick = () => {
      deleteVal(index);  
    }
    content.appendChild(container);
}
)
}

    const editVal = (text, inputTask, container, item) => {
        text.innerText = inputTask.value;
        item.text = inputTask.value;
        container.replaceChild(text, inputTask);
        localStorage.setItem('tasks', JSON.stringify(allTasks)); 
        render();
    }

    const deleteVal = (index) => {
    allTasks = allTasks.filter((item, index1) => (index1 !== index));   
    localStorage.setItem('tasks', JSON.stringify(allTasks)); 
    render();
    };

const onChangeCheckbox = (index) => {
allTasks[index].isCheck = !allTasks[index].isCheck;
localStorage.setItem('tasks', JSON.stringify(allTasks)); 
render();
}