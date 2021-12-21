let taskLi=[];
let pgSet=true;
let currenttk;
//----------------------------------------------------------------------
//selector-DOM
const bg =document.querySelector('body');
const butn1 = document.querySelector('#addOne');
const butn2 = document.querySelector('#addTwo');
const closebtn = document.querySelector('.close');
const closebtn2 = document.querySelector('#closed')
const addBtnOne =document.querySelector('#addBtn1');
const addBtnTwo =document.querySelector('#addBtn2');
const back =document.getElementById('back2');
const createTodoValue =document.querySelector('#list1');
let noListp =document.querySelector('#nolist');
let body =document.getElementsByTagName('body')
//----------------------------------------------------------------------
// event listeners  
body.onload=page();
butn1.addEventListener("click",showi);
butn2.addEventListener("click",showj);
closebtn.addEventListener("click",closefun);
closebtn2.addEventListener('click',closefun2);
addBtnOne.addEventListener('click',createTask);
back.addEventListener('click',goBack);

function showi(){
    var show1=document.querySelector("#pop1");
    bg.style.filter="blur(8px)"
    show1.showModal();
}
function showj(){
    var show2=document.querySelector("#pop1");
    bg.style.filter="blur(8px)"
    show2.showModal();
}
function closefun(){
    var close1=document.querySelector("#pop1");
    bg.style.filter="none"
    close1.close();
}
function closefun2(){
    var close2=document.querySelector('#pop2');
    bg.style.filter="none"
    close2.close();
}
function page(){ 
    let pg =document.getElementById('topb1');
    let pg2 =document.getElementById('topb2');
    if (pgSet){
        pg.style.display="block";
        pg2.style.display="none"
    }else{
        pg.style.display="none";
        pg2.style.display="block"
    }
}
function createTask(e){
    e.preventDefault();
    let usrtemp =createTodoValue.value;
    const task ={
        id:Date.now(),
        name:usrtemp,
        subTask:[]
    }
    taskLi.push(task);  
    showList();   
}
function showList(){ 
    var listitem=` `
    taskLi.forEach(element => {
        listitem +=
       ` <div class="flexlist1" id="${element.id}">
        <span class="listnewitem" onclick="callMe(${element.id})">${element.name}</span><hr>
        <ul class="listTodo" id="${'id'+element.id}"></ul>
        <div class="footerlist">
        <i class="fas fa-minus-square fa-2x butn-2" id="cmptd-btn" onclick="deleteTask(${element.id})"></i>
        <i class="fa fa-plus-circle fa-2x" id="addThree" onclick="addTask(${element.id})"></i>
        </div></div> `
    });
    document.querySelector('#list-1').innerHTML=listitem;
    if(taskLi.length!=0){   
        if(taskLi.length<2){noListp.style.display="none";};
    }else if(taskLi==0){
        noListp.style.display="block";
    };
    createList();
}
function deleteTask(id){  
    taskLi.forEach((element,index)=>{
    if(element.id==id){
        taskLi.splice(index,1);
    }
    pgSet=true;page(); 
});
showList();
}

function addTask(id){   
    taskLi.forEach(element=>{
        if(element.id===id){
            var show3=document.querySelector("#pop2");
            bg.style.filter="blur(8px)"
            show3.showModal();
            let addListValue =document.querySelector('#list2');
            addBtnTwo.onclick=()=>{ 
            let listVal=addListValue.value;
                taskLi.forEach((element,index)=>{
                    if(element.id===id){
                        const taskin={
                            listId:Date.now(),
                            listName:listVal,
                            set:true
                        }
                        taskLi[index].subTask.push(taskin);
                    }
                });createList();listCall(element.subTask);
            }
        }
    });
}
function createList(){  
    taskLi.forEach(element=>{
    let tasklist = document.getElementById('id'+element.id);
    let newTask='';
    element.subTask.forEach(taskin =>{
        if(taskin.set){
        newTask +=`
        <li>
        <span class="taskName" id="${'tin'+taskin.listId}">${taskin.listName}</span>
        <button id="${'markdn'+taskin.listId}" onclick="makeDone(${taskin.listId})">MarkDone</button>
        </li>`} else{
        newTask+=`<li><span class="taskND" id="${'tin'+taskin.listId}">${taskin.listName}</span>
        </li>`
        }
    })                
    tasklist.innerHTML=newTask;
    });
}
function makeDone(id){
    taskLi.forEach(element => {
        element.subTask.forEach(taskin=>{
            let idIn=document.getElementById('tin'+taskin.listId);
            if (taskin.listId==id){
                idIn.style.textDecoration="line-through";
                idIn.style.color="red";
                document.getElementById('markdn'+taskin.listId).remove();
                taskin.set=false
            }
        });createList();listCall(element.subTask);
    }); 
}
function callMe(id){
    pgSet=false;
    page();
    let currentSelect,currentList;
    taskLi.forEach(element=>{
        if (element.id==id) {
            currentSelect =element;
            currentList =element.subTask;
        }
    });
    let new3=document.getElementById('title2');
    let new31=document.getElementById('title2-1');
    let new32=document.getElementById('footer1');
    new31.innerText=currentSelect.name;
    new3.innerText=currentSelect.name;
    console.log(currentSelect);
    console.log(currentList);
    new32.innerHTML=`<i class="fas fa-minus-square fa-2x butn-2" id="cmptd-btn" onclick="deleteTask(${currentSelect.id})"></i>
    <i class="fa fa-plus-circle fa-2x" id="addThree" onclick="addTask(${currentSelect.id})"></i>`
    listCall(currentList);
}
function listCall(e){
    let newTlist=``;
    let selTag = document.getElementById('new-list');
    e.forEach(taskin=>{
        if(taskin.set){
            newTlist+=`
            <li>
            <span class="taskName" id="${'tin'+taskin.listId}">${taskin.listName}</span>
            <button id="${'markdn'+taskin.listId}" onclick="makeDone(${taskin.listId})">MarkDone</button>
            </li>`}else
            {
            newTlist+=`<li><span class="taskND" id="${'tin'+taskin.listId}">${taskin.listName}</span>
            </li>`
        }
        selTag.innerHTML=newTlist;
    })
    showList();
}
function goBack(){ 
    pgSet=true;
    page();
}