export class toDoItems{

    constructor(name,subTask,description,time){
        this.name = name;
        this.subTasks = subTask ? [subTask] : [];
        this.description = description || `Complete ${this.name} task`;
        
        if (time) {
            this.deadline = time.slice(0, 10); // YYYY-MM-DD format
            this.endDay = time.slice(0, 10);
            this.endTime = time.slice(11); // HH:MM:SS format
        } else {
            this.deadline = null;
            this.endDay = null;
            this.endTime = null;
        }

        this.completed = false;
        this.id = Date.now();
    }
    appendSubTasks(item){
        if (!this.subTasks.includes(item)) {
            this.subTasks.push(item);
        }
    }
    popSubTasks(itemName){
        const index = this.subTasks.indexOf(itemName);
        if (index > -1) {
            this.subTasks.splice(index, 1);
        }

    }
    updateDetails(name,description,time){
        this.name=name || this.name;
        this.description= description || this.description;
        this.deadline=time || this.time;
    }

    toggleComplete() {
        this.completed = !this.completed;
    }

    // Display task and subtask details (for debugging)
    display() {
        console.log(`
            Name: ${this.name}
            Description: ${this.description}
            Deadline: ${this.deadline}
            endDay: ${this.endDay}
            DeadTime: ${this.endtime}
            Completed: ${this.completed}
            SubTasks: ${this.subTasks.join(", ")}
        `);
    }
}