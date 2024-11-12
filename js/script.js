console.log("Connected");
const containers = document.querySelectorAll(".container");
const draggables = document.querySelectorAll(".draggable");
draggables.forEach((draggable) => {
    draggable.addEventListener('dragstart',() => {
        // console.log("Start Dragging");
        draggable.classList.add('dragging');
    });
    draggable.addEventListener('dragend',() => {
        // console.log("End Dragging");
        draggable.classList.remove('dragging');
    });
}); 
containers.forEach((container) => {
    container.addEventListener('dragover',(e)=>{
        e.preventDefault();
        // console.log("Drag Overing")
        const afterElement = getDragAfterElement(container,e.clientY);
        console.log(afterElement);
        // we need to  find the p tag which is dragginng
        const draggable = document.querySelector('.dragging');
        if(afterElement == null){
            container.appendChild(draggable);
        }
        else{
            container.insertBefore(draggable,afterElement);
        }
    });
});
function getDragAfterElement(container,y){
    const draggableElemets = [...container.querySelectorAll('.draggable:not(.dragging)')];
    return draggableElemets.reduce((closest,child) => {
        const box = child.getBoundingClientRect();
        // console.log(box);
        const offset = y - box.top - box.height / 2;
        // console.log(offset);
        if(offset < 0 && offset > closest.offset){
            return { offset: offset,element: child}
        }else{
            return closest;
        }
    },{ offset: Number.NEGATIVE_INFINITY}).element;
}
