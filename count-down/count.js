const months=[
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december"

]
const weeks =[
    "sunday",
    "monday",
    "tuesday",
    "wednessday",
    "thursday",
    "friday",
    "saturday"
]
const deadline =document.querySelector(".deadline")
const countdown = document.querySelectorAll(".num")
const deadlineMessage = document.querySelector(".countdown")

const deadlineDate = new Date(2024, 4, 11, 23, 29, 0);
const year = deadlineDate.getFullYear();
const month = deadlineDate.getMonth();
const date=deadlineDate.getDate()
const day = deadlineDate.getDay()
const hour =deadlineDate.getHours()
const mins = deadlineDate.getMinutes()
deadline.textContent=`${weeks[day]} ${date} ${months[month]} ${year} ${hour}:${mins}pm`
const getCurrentTime= () =>{
    const futureTime = deadlineDate.getTime()
    let presentTime = new Date().getTime()
    let timeInterval = futureTime - presentTime;
    console.log(presentTime)
    const oneDay = 24 * 60 * 60 * 1000;
    const oneHour = 60 * 60 * 1000;
    const oneMinute = 60 * 1000;
    const oneSec = 1000;
    let days = Math.floor(timeInterval / oneDay);
    let hours = Math.floor((timeInterval % oneDay) / oneHour)
     let minutes = Math.floor((timeInterval % oneHour) / oneMinute)
     let secs = Math.floor((timeInterval % oneMinute) / oneSec);
    let countdownDates =[days, hours, minutes, secs]
    countdown.forEach((num, index) => {
        num.innerHTML = countdownDates[index];
        if(countdownDates[index] < 10){
            num.innerHTML = `0${countdownDates[index]}`
        }
    })
    if(timeInterval <= 0){
       clearInterval(interval)
       deadlineMessage.innerHTML= "!oops this giveaway has ended!"
       deadlineMessage.style.color="red";
       deadlineMessage.style.textTransform = "capitalize"
       deadlineMessage.style.fontSize ="25px"

        
}
}
    const interval = setInterval(getCurrentTime, 1000)
    getCurrentTime()
