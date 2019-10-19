(function makeDragAndDrop() {
  let startDragX = null;
  const headers = Array.from(document.querySelectorAll('.table-head div'));
  const columns = Array.from(document.querySelectorAll('.table-body div'));
  headers.forEach(header => {
    header.addEventListener('dragstart', handleDragStart, false);
    header.addEventListener('drop', handleDrop, false);
    header.addEventListener('dragend', handleDragEnd, false);
    header.addEventListener('dragleave', handleDragLeave, false);
    header.addEventListener('dragover', handleDragEnter, false);
  });

  function handleDragStart(e) {
    startDragX = e.pageX;
    event.target.style.opacity = 0.5;
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDragEnter(e) {
    const element = e.target;
    const isDragged = parseFloat(element.style.opacity) === 0.5;
    if (!isDragged && ![...element.classList].some(cls => cls.startsWith('indicator'))) {
      const className = `indicator-${e.pageX > startDragX ? 'right' : 'left'}`;
      e.target.classList.add(className);
      columns[headers.indexOf(e.target)].classList.add(className);
    }
  }

  function handleDragLeave(e) {
    const element = e.target;
    element.classList.remove('indicator-left', 'indicator-right');
    columns[headers.indexOf(element)].classList.remove('indicator-left', 'indicator-right');
  }

  function handleDrop(e) {
    event.target.style.opacity = 1;
    console.log('drop ', e);
  }

  function handleDragEnd(e) {
    startDragX = null;
    event.target.style.opacity = '';
  }
})();
