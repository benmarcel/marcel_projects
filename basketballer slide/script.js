const previous= document.querySelector(".prev");
const next= document.querySelector(".next");
const slide=document.querySelector(".slide");
const items= document.querySelectorAll(".item");
let count = 0
next.addEventListener("click", ()=>{
    count++
    if(count > items.length - 1){
        count = 0;
    }
    slide.appendChild(items[count]);
})
previous.addEventListener("click", ()=>{
    count--
    if(count < 0){
        count = items.length - 1;
    }
    slide.prepend(items[count]);
})