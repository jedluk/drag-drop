(function makeDragAndDrop() {
  let draggedElement = null;

  Array.from(document.querySelectorAll('.table-head > div')).forEach(header => {
    header.addEventListener('dragstart', handleDragStart, false);
    header.addEventListener('drop', handleDrop, false);
    header.addEventListener('dragend', handleDragEnd, false);
    header.addEventListener('dragleave', handleDragLeave, false);
    header.addEventListener('dragenter', handleDragEnter, false);
    header.addEventListener('dragover', handleDragOver, false);
  });

  function handleDragStart(e) {
    event.target.style.opacity = 0.5;
    draggedElement = e.target;
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDragEnter(e) {
    const element = e.target;
    const isDragged = parseFloat(element.style.opacity) === 0.5;
    if (!isDragged && ![...element.classList].includes('indicator')) {
      const className = 'indicator';
      e.target.classList.add(className);
      const { headerNodes, bodyNodes } = getElements();
      bodyNodes[headerNodes.indexOf(e.target)].classList.add(className);
    }
  }

  function handleDragLeave(e) {
    const element = e.target;
    element.classList.remove('indicator');
    const { headerNodes, bodyNodes } = getElements();
    bodyNodes[headerNodes.indexOf(element)].classList.remove('indicator');
  }

  function handleDrop(e) {
    e.preventDefault();
    const { headerNodes, bodyNodes } = getElements();
    const dragIndex = headerNodes.indexOf(draggedElement);
    const dropIndex = headerNodes.indexOf(e.target);
    bodyNodes[dropIndex].classList.remove('indicator');
    headerNodes[dropIndex].classList.remove('indicator');
    swapElements(headerNodes[dropIndex], headerNodes[dragIndex]);
    swapElements(bodyNodes[dropIndex], bodyNodes[dragIndex]);
  }

  function handleDragEnd(e) {
    draggedElement = null;
    e.target.style.opacity = '';
  }

  function getElements() {
    return {
      headerNodes: Array.from(document.querySelectorAll('.table-head > div')),
      bodyNodes: Array.from(document.querySelectorAll('.table-body > div'))
    };
  }

  function swapElements(obj1, obj2) {
    const parent2 = obj2.parentNode;
    const next2 = obj2.nextSibling;
    if (next2 === obj1) {
      parent2.insertBefore(obj1, obj2);
    } else {
      obj1.parentNode.insertBefore(obj2, obj1);
      if (next2) {
        parent2.insertBefore(obj1, next2);
      } else {
        parent2.appendChild(obj1);
      }
    }
  }
})();
