document.addEventListener("DOMContentLoaded",()=>{
    const storedtasks=JSON.parse(localStorage.getItem("tasks"));
    if (storedtasks) {
        storedtasks.forEach((task)=>tasks.push(task))
        updateTasksList()
        state();
    }
})

let tasks=[];

const saveTask=()=>{
    localStorage.setItem('tasks',JSON.stringify(tasks))
}
function addTask() {
   const task= document.getElementById('taskInput');
  const text=task.value.trim();
  if (text) {
    tasks.push({text:text, completed: false});

    updateTasksList();
    saveTask();
  }
}

const toggleTestComplete=(index)=>{
    tasks[index].completed=!tasks[index].completed;
    const text=document.getElementById("text");
    text.style.textDecoration='line-through';
    state();
    saveTask();
}

const delets=(index)=>{
  tasks.splice(index,1);
  updateTasksList();
  saveTask();
}

const edit=(index)=>{
    const taskinput=tasks[index];
    console.log(taskinput);
    
    tasks.splice(index,1);
    console.log(tasks);
    
    const task= document.getElementById('taskInput');
    task.value=taskinput.text;
    updateTasksList();
    saveTask();
}

const state=()=>{
    const completetasks=tasks.filter(task=>task.completed).length;
    const totalTasks=tasks.length;
    const progress=(completetasks/totalTasks)*100;
    const progressbar=document.getElementById("progress");
    progressbar.style.width=`${progress}%`;

    const num=document.getElementById("numbers");
    
    num.innerText=`${completetasks}/`+totalTasks;
    saveTask();
    if (completetasks==totalTasks) {
        blast();
    }

}

const updateTasksList=()=>{
   const tasklist=document.getElementById('task-list');
   tasklist.innerHTML='';


   tasks.forEach((task,index)=>{
     const listItem=document.createElement('li');
     listItem.innerHTML=`<div class="taskItems">
    <div class="task" ${task.completed ? "completed" : ""}>
        <input type="checkbox" class="${task.completed ? "checked" : ""}" >
        <p id="text">${task.text}</p>
    </div>
    <div class="icons">
     <i class="fa-solid fa-pen" onclick="edit(${index})"></i>
    <i class="fa-solid fa-trash" onclick="delets(${index})"></i>
    </div>
    
    </div>`;
    const completetasks=tasks.length;
    const num=document.getElementById("numbers");
    
    
    num.innerText='0/'+completetasks;
     listItem.addEventListener("change",()=> toggleTestComplete(index))
    tasklist.append(listItem);
    saveTask();
    
   }) 
  
}

document.getElementById('newTask').addEventListener('click',(e)=>{
    e.preventDefault();
    addTask();
    saveTask();
})


const blast=()=>{
    const count = 200,
  defaults = {
    origin: { y: 0.7 },
  };

function fire(particleRatio, opts) {
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio),
    })
  );
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});

fire(0.2, {
  spread: 60,
});

fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8,
});

fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2,
});

fire(0.1, {
  spread: 120,
  startVelocity: 45,
});
}