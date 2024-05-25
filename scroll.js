const date = document.getElementById("date");
const menuBtn = document.querySelector(".menu")
const linksContainer= document.querySelector(".links-container")
const links = document.querySelector(".links")
const navBar = document.getElementById("nav")
const scrollBtn = document.querySelector(".scroll-btn")
date.innerHTML= new Date().getFullYear();
 menuBtn.addEventListener("click", () =>{
    const linksContainerHieght= linksContainer.getBoundingClientRect().height;
    const linksHeight = links.getBoundingClientRect().height;
    if(linksContainerHieght === 0){
      linksContainer.style.height =`${linksHeight}px`
    }else{
      linksContainer.style.height = 0
    }
   })
   window.addEventListener("scroll", () => {
      let scrollLength = window.pageYOffset;
     let navHeight = navBar.getBoundingClientRect().height;
     if(scrollLength > navHeight){
      navBar.classList.add("nav-fixed")
     }else{
      navBar.classList.remove("nav-fixed")}
      if(scrollLength > 505){
        scrollBtn.classList.add("show-scrollbtn")
      } else {scrollBtn.classList.remove("show-scrollbtn")

    }
     
   })
   const scrolls = document.querySelectorAll(".scroll-link")
   scrolls.forEach(link => {
    link.addEventListener("click", (e) =>{
      e.preventDefault()
      const id =e.currentTarget.getAttribute("href").slice(1)
      const section = document.getElementById(id)
      const navHeight = navBar.getBoundingClientRect().height;
      const linksContainerHieght= linksContainer.getBoundingClientRect().height;
      const fixedNavbar= navBar.classList.contains("nav-fixed")
      let sectionPosition = section.offsetTop - navHeight
      if(navHeight > linksContainerHieght){
        sectionPosition = sectionPosition + linksContainerHieght
      }
      window.scrollTo(
        {
          left:0,
          top:sectionPosition,
        }
      )
      linksContainer.style.height =0;
    })
   });