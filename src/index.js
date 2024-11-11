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
    const $thisWeek =document.querySelector("#this-Week");

    //buttons
    const $addNewDiv =document.querySelector("#add-new-div");
    const $formBtn=document.querySelector("#form-sbt-btn");
    const $delItemBtn= document.querySelectorAll(".delete-item-btn");

    //form-fields
    const $activityName=document.querySelector("#name");
    const $activityDeadline=document.querySelector("#activity-deadline");
    const $activitySubItem=document.querySelector("#subItem");
    const $activityDescription=document.querySelector("#description")

    //jsVariables
    var toDoList=[];
    var missedList=[];
    var currStatus=$upcoming;
    var currDeadline=$today;


    //bind functions
    $addNewDiv.addEventListener("click",initiateForm);
    $upcoming.addEventListener("click",activateUpcoming);
    $missed.addEventListener("click",activateMissed);
    $today.addEventListener("click",activateToday);
    $thisWeek.addEventListener("click",activateThisWeek);
    
    
    function createDiv(obj) {
        var ele = document.createElement("div");
        ele.className = "to-do-items";
        ele.id = obj.id;
    
        
        var heading = document.createElement("h1");
        heading.innerText = obj.name;
        ele.appendChild(heading);
    
        
        var para1 = document.createElement("p");
        para1.className = "description";
        para1.innerText = obj.description;
        ele.appendChild(para1);
    
        
        var deadlinePara = document.createElement("p");
        deadlinePara.innerText = obj.endDay + " " + obj.endTime;
        ele.appendChild(deadlinePara);
    
        
        var icon = document.createElement("i");
        icon.classList.add("fa-solid", "fa-trash", "delete-item-btn");
        ele.appendChild(icon);

        return ele;
    }
    

    function printList(){
        $toDoList.replaceChildren();
        var range=1;
        if(currStatus===$missed){
            range*=-1;
        }
        if(currDeadline===$thisWeek){
            range*=7;
        }
        const deadlineDate=new Date();
        const dateToday=new Date();
        deadlineDate.setDate(dateToday.getDate() + range);

        if(toDoList.length!=0 || missedList.length!=0){
            if(currStatus==$missed){
                var i=0;
                while(i< missedList.length){
                    var itemDeadline=new Date(missedList[i].deadline);
                    if(itemDeadline<=dateToday && itemDeadline>=deadlineDate){
                        var currDiv=createDiv(missedList[i]);
                        $toDoList.appendChild(currDiv);
                    }
                    i++;
                }
            }
            
            else{
                var i=0;
                while(i< toDoList.length){
                    var itemDeadline=new Date(toDoList[i].deadline);
                    if(itemDeadline>=dateToday && itemDeadline<=deadlineDate){
                        var currDiv=createDiv(toDoList[i]);
                        $toDoList.appendChild(currDiv);
                    }
                    else
                        break;
                    i++;
                }
            }
        }
        document.querySelectorAll(".delete-item-btn").forEach(ele => 
            ele.addEventListener("click", function(event) {
                const parentId = event.target.parentElement.id;
                deleteItem(parentId);
            })
        );
        // document.querySelectorAll(".to-do-items").forEach(ele=>{
        //     ele.addEventListener("click",function (event) {
        //         const parId=event.target.id;
        //         const displayDiv=document.createElement("div");
        //         displayDiv.textContent = `Details for item ID: ${parId}`;
        //         displayDiv.id="show-content-info";
        //         document.body.appendChild(displayDiv);
        //         displayInfo();
                
        //     })
        // })
    }

    function checkFormValid(name,deadline){
        if(name==="" || deadline=== "")
            return 0;
        else return 1;
    }
    
    function submitForm(){
        const name=$activityName.value;
        const deadline=$activityDeadline.value;
        const subItem=$activitySubItem.value;
        const desc=$activityDescription.value;
        const currentDateTime = new Date();
        const deadlineDateTime = new Date(deadline);

        
        if(checkFormValid(name,deadline)){
            $formdiv.style.display= "none";
            if (currentDateTime <= deadlineDateTime) {
                toDoList.push(new toDoItems(name,subItem,desc,deadline));
                toDoList.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));    
            } else {
                console.log("hello");
                missedList.push(new toDoItems(name,subItem,desc,deadline));
                missedList.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
            }
            $formdiv.reset();
            
        }
    }
    
    function initiateForm(){
        $formdiv.style.display="flex";
        $formBtn.addEventListener("click",submitForm);
    }


    function activateUpcoming(){
        $headerStatus.textContent="Upcoming";
        currStatus=$upcoming;
        printList();
    }

    function activateMissed(){
        $headerStatus.textContent="Missed";
        currStatus=$missed;
        printList();
    }

    function activateToday(){
        $headerDeadline.textContent="Today";  
        currDeadline=$today;
        printList();
    }

    function activateThisWeek(){
        $headerDeadline.textContent="This Week"
        currDeadline=$thisWeek;
        printList();
    }  

    function deleteItem(id){
        var i=0;
        var x=0;
        while(x===0 && i<toDoList.length){
            if(toDoList[i].id==id){
                toDoList.splice(i,1);
                x=1;
            }
            i++;
        }
        while(x===0 && i<missedList.length){
            if(missedList[i].id==id){
                missedList.splice(i,1);
                x=1;
            }
            i++;
        }
        printList();
    }
})()