let allTasks = [];
let valueInput = '';
let input = null;

window.onload = init = async () => {
    input = document.getElementById('add-task');
    input.addEventListener('change', updateValue);
    const resp = await fetch('http://localhost:8000/allTasks', {
        method: 'GET'
    });
    let result = await resp.json();
    allTasks = result.data;
    render();
};

const onClickDelete = () => {
  allTasks.map((item, index) => {
    deleteVal(index);
    });    
    render();
};

const onClickButton = async () => {
    allTasks.push({
        text: valueInput,
        isCheck: false
    });
    const resp = await fetch('http://localhost:8000/createTask', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
             'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            text: valueInput,
            isCheck: false
        })
    });
    let result = await resp.json();
    allTasks = result.data;
    valueInput = '';
    input.value = '';
    render();
};

const updateValue = (event) => {
valueInput = event.target.value;
};

const render = () => {
    const content = document.getElementById('content-page');
    while (content.firstChild) {
        content.removeChild(content.firstChild);
    };
    allTasks.map((item, index) => {
    
        const container = document.createElement('div');
        container.id = `task-${index}`;
        container.className = 'task-container';
        const checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.checked = item.isCheck;
        checkBox.onchange = function () {
            onChangeCheckbox(index);
        };

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
                editVal(index, inputTask);         
            };

            imageDelete.onclick = () => {
                inputTask.value = test;         
                render();
            };
        };

    const imageDelete = document.createElement('i');
    imageDelete.className = 'far fa-trash-alt';
    container.appendChild(imageDelete);
    imageDelete.onclick = () => {
      deleteVal(index);  
    };
    content.appendChild(container);
    });
};

    const editVal = async (index, inputTask) => {
        const resp = await fetch(`http://localhost:8000/updateTask`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
             'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            text: inputTask.value,
            id: allTasks[index].id
        })
    });    
    let result = await resp.json();
    allTasks = result.data;
        render();
    };

    const deleteVal = async (index) => {
    const resp = await fetch(`http://localhost:8000/deleteTask?id=${allTasks[index].id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
             'Access-Control-Allow-Origin': '*'
        },
    });
    let result = await resp.json();
    allTasks = result.data;
    render();
    };

const onChangeCheckbox = async (index) => {
    console.log(valueInput)
const resp = await fetch(`http://localhost:8000/updateTask`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
             'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            isCheck: !allTasks[index].isCheck,
            id: allTasks[index].id
        })
    });    
    let result = await resp.json();
    allTasks = result.data;
render();
};

