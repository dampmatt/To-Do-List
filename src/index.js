import {toDoItems} from "./items"
import "./styles.css";  

const render=(()=>{
    //dom elements!!

    const $formdiv=document.querySelector("#activity-details")
    const $headerStatus=document.querySelector("#header-status");
    const $headerDeadline=document.querySelector("#header-deadline");
    const $toDoList=document.querySelector("#to-do-list");
    
    //heading-buttons
    const $upcoming =document.querySelector("#upcoming");
    const $missed =document.querySelector("#missed");
    const $today =document.querySelector("#Today");
    const $thisWeek =document.querySelector("#thisWeek");

    //buttons
    const $addNewDiv =document.querySelector("#add-new-div");
    const $formBtn=document.querySelector("#form-sbt-btn");

    const $activityName=document.querySelector("#name");
    const $activityDeadline=document.querySelector("#activity-deadline");
    const $activitySubItem=document.querySelector("#subItem");
    const $activityDescription=document.querySelector("#description")


    //bind functions
    $addNewDiv.addEventListener("click",initiateForm);
    $upcoming.addEventListener("click",activateUpcoming);
    $missed.addEventListener("click",activateMissed);
    $today.addEventListener("click",activateToday);
    $thisWeek.addEventListener("click",activateThisWeek);

    function submitForm(){
        const name=$activityName.value;
        const deadline=$activityDeadline.value;
        const subItem=$activitySubItem.value;
        const desc=$activityDescription.value;
        $formdiv.reset();
        // if(checkFormValid(name,deadline))
            $formdiv.style.display= "none";
    }
    
    function initiateForm(){
        $formdiv.style.display="flex";
        $formBtn.addEventListener("click",submitForm);
    }

    function activateUpcoming(){
        
    }

    function activateMissed(){
        
    }

    function activateToday(){
        
    }

    function activateThisWeek(){

    }

})()