let input=document.querySelector(".input")
let submit=document.querySelector(".add")
let tasksDiv=document.querySelector(".tasks")

let arrayOfTasks=[]

//array to store tasks

if(localStorage.getItem("tasks")){
    arrayOfTasks=JSON.parse(localStorage.getItem("tasks"))
}
getDataFromLocalStorage()

//add task
submit.onclick=function(){
    if (input.value!==""){
        addTaskToArray(input.value)//add task to array
        input.value=""//empty input
    }
}

tasksDiv.addEventListener("click",(e)=>{
    if(e.target.classList.contains("del")){
        deleteTask(e.target.parentElement.getAttribute("data-id"))
        e.target.parentElement.remove()
    }
    if (e.target.classList.contains("task")){
        toggleTask(e.target.getAttribute("data-id"))
        e.target.classList.toggle("done")
    }
})

function addTaskToArray(taskText){
    const task={
        id:Date.now(),
        title:taskText,
        completed:false
    }
    //push task to array
    arrayOfTasks.push(task)
    //add task to page
    addElementsToPage(arrayOfTasks)
    addDataToLocalStorage(arrayOfTasks)
}

function addElementsToPage(arrayOfTasks){
    //empty tasks div
    tasksDiv.innerHTML=""
    //looping on array of tasks
    arrayOfTasks.forEach((task) => {
        let div=document.createElement("div")
        div.className="task"
        if(task.completed){
            div.className="task done"
        }
        div.setAttribute("data-id",task.id)
        div.appendChild(document.createTextNode(task.title))
        let span=document.createElement("span")
        span.className="del"
        span.appendChild(document.createTextNode("Delete"))
        div.appendChild(span)
        tasksDiv.appendChild(div)
    });
}


function addDataToLocalStorage(arrayOfTasks){
    window.localStorage.setItem("tasks",JSON.stringify(arrayOfTasks))
}


function getDataFromLocalStorage(){
    let data=window.localStorage.getItem("tasks")
    if(data){
        let tasks=JSON.parse(data)
        addElementsToPage(tasks)
    }
}


function deleteTask(taskId){
    arrayOfTasks=arrayOfTasks.filter((task)=>task.id!=taskId)
    addDataToLocalStorage(arrayOfTasks)
}


function toggleTask(taskId){
    for(let i=0;i<arrayOfTasks.length;i++){
        if(arrayOfTasks[i].id==taskId){
            arrayOfTasks[i].completed==false?arrayOfTasks[i].completed=true:arrayOfTasks[i].completed=false
        }
    }
    addDataToLocalStorage(arrayOfTasks)

}
