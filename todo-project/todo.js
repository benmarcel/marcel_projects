const list = [];
const input = document.querySelector("#food");
const submitBtn = document.getElementById("submit-btn");
const myList = document.querySelector(".list")
const clearBtn = document.querySelector(".clear-btn")
const form = document.querySelector(".container")
const alert = document.querySelector(".alert")
let currentValue = {}
let editElement = null;
const alertMessage= (message,classname) =>{
    alert.textContent=message;
    alert.classList.add(`${classname}`)
    setTimeout(() => {
        alert.textContent="";
        alert.classList.remove(`${classname}`)}, 1000)
}
form.addEventListener("submit", (e) =>{
    e.preventDefault()
    let item = input.value;
    const food = {
        id:item,
        item:input.value
    } ;
//check if input is empty
    if(input.value === ""){
       alertMessage("please enter value", "danger")
        
    }
//check if the item have been stored before
const findIndex = list.findIndex((item) => item.id === food.id)

 //display item
 if(submitBtn.textContent === "submit"){
    addItems(food, findIndex)
 }
//edit item
if(submitBtn.textContent === "edit" && input.value){
    updateItem()
}
localStorage.getItem()
})


const addItems= (food, findIndex)=>{
    if(findIndex === -1 && input.value){
        list.push(food)
        currentValue=food
        alertMessage("item has been added", "success")
        
      }
    
    const dataIndex = list.findIndex((item) => item.id === currentValue.id)
    if(dataIndex !== -1){
     myList.innerHTML=""
     console.log(dataIndex)
     list.forEach(({id, item})=>{
     myList.innerHTML += `<article class="items"><p class="item">${item}</p>
     <div class="btn-div">
         <button type="button" id="edit" class="btns" onclick="editItem(this)"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#75FB4C"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z"/></svg></button>
         <button type="button" id="delete" class="btns" onclick="deleteItems()"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#f00"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg></button>
     </div></article>`
    })
 }
 if(input.value !== ""){
    clearBtn.classList.add("visible")}
 input.value=""; 
   }
   //clear button event
clearBtn.addEventListener("click", ()=>{
    confirm("Are you sure you want to remove all items")
    if(confirm){
        document.querySelectorAll(".items").forEach((item)=> item.remove())
        clearBtn.classList.remove("visible")
        alertMessage("all items have been deleted", "danger")
        list.splice(0)
    }
})
//delete function
const deleteItems = (e)=>{
    let btn=document.getElementById("delete")
    btn.parentElement.parentElement.remove();
    if(myList.innerHTML === ''){
        clearBtn.classList.remove("visible")
    }
    alertMessage("item has been delete", "danger")
  let value =  btn.parentElement.parentElement.firstElementChild.textContent
  const btnIndex = list.findIndex((item)=>item.id === value)
  list.splice(btnIndex,1)
}
//edit function
const editItem = (e)=>{
    editElement = e.parentElement.parentElement;
   input.value = editElement.firstChild.textContent
   submitBtn.textContent="edit"

}
const updateItem = () =>{
    const editIndex = list.findIndex((item)=>item.id === editElement.firstChild.textContent)
    list.splice(editIndex,1, input.value)
        editElement.firstChild.textContent = input.value
     submitBtn.textContent="submit"
     input.value = ""
     alertMessage("item has been edited", "success")
}
//local  storage
