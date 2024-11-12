// console.log("Connected");
// const containers = document.querySelectorAll(".container");
// const draggables = document.querySelectorAll(".draggable");
// draggables.forEach((draggable) => {
//     draggable.addEventListener('dragstart',() => {
//         // console.log("Start Dragging");
//         draggable.classList.add('dragging');
//     });
//     draggable.addEventListener('dragend',() => {
//         // console.log("End Dragging");
//         draggable.classList.remove('dragging');
//     });
// }); 
// containers.forEach((container) => {
//     container.addEventListener('dragover',(e)=>{
//         e.preventDefault();
//         // console.log("Drag Overing")
//         const afterElement = getDragAfterElement(container,e.clientY);
//         console.log(afterElement);
//         // we need to  find the p tag which is dragginng
//         const draggable = document.querySelector('.dragging');
//         if(afterElement == null){
//             container.appendChild(draggable);
//         }
//         else{
//             container.insertBefore(draggable,afterElement);
//         }
//     });
// });
// function getDragAfterElement(container,y){
//     const draggableElemets = [...container.querySelectorAll('.draggable:not(.dragging)')];
//     return draggableElemets.reduce((closest,child) => {
//         const box = child.getBoundingClientRect();
//         // console.log(box);
//         const offset = y - box.top - box.height / 2;
//         // console.log(offset);
//         if(offset < 0 && offset > closest.offset){
//             return { offset: offset,element: child}
//         }else{
//             return closest;
//         }
//     },{ offset: Number.NEGATIVE_INFINITY}).element;
// }


console.log("Connected");

const containers = document.querySelectorAll(".container");
const draggables = document.querySelectorAll(".draggable");

draggables.forEach((draggable) => {
    // Desktop drag events
    draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging');
    });
    
    draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging');
    });

    // Mobile touch events
    draggable.addEventListener('touchstart', (e) => {
        e.preventDefault();
        draggable.classList.add('dragging');
    });

    draggable.addEventListener('touchend', () => {
        draggable.classList.remove('dragging');
    });
});

containers.forEach((container) => {
    // Desktop dragover event
    container.addEventListener('dragover', (e) => {
        e.preventDefault();
        handleDrag(container, e.clientY);
    });

    // Mobile touchmove event
    container.addEventListener('touchmove', (e) => {
        e.preventDefault(); // Prevents scrolling while dragging
        const touch = e.touches[0];
        handleDrag(container, touch.clientY);
    });
});

function handleDrag(container, y) {
    const afterElement = getDragAfterElement(container, y);
    const draggable = document.querySelector('.dragging');
    if (afterElement == null) {
        container.appendChild(draggable);
    } else {
        container.insertBefore(draggable, afterElement);
    }
}

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')];
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}
