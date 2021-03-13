import * as React from 'react';

export interface IAppProps {
  images: [];
  styles: {};
  onDragFinish: any,
  opacity: number,
}

function ReactDrag({ images, styles, onDragFinish, opacity= 0.5 }: IAppProps): JSX.Element {
  let drageSrcEl = null as any
  const handleDragStart = (e: any): void => {
    drageSrcEl = e.target;
    e.dataTransfer.effectAllowed = "move"
    e.dataTransfer.setData('text/html', e.target.src);
  }
  const handleDrageEnter = (e: any): void => {
    e.preventDefault();
    e.stopPropagation();
  }
  const handleDragLeave = (e: any): void => {
    e.preventDefault();
    e.stopPropagation();
    drageSrcEl.style.opacity = opacity
  }
  const handleDragOver = (e: any): void => {
    if(e.preventDefault){
      e.preventDefault()
    }
    e.dataTransfer.dropEffect = "move"
  }
  const handleDrop = (e: any) => {
    if(e.stopPropagation){
      e.stopPropagation()
    }
    if(drageSrcEl && drageSrcEl.src != e.target.src){
      const dragged = drageSrcEl.src 
      const replaced = e.target.src
      drageSrcEl.src = e.target.src;
      e.target.src = dragged;
      e.target.style.opacity  = 1
      drageSrcEl.style.opacity = 1
      const draggedId: String = drageSrcEl.id;
      const replacedId: String = e.target.id
      const responseObj = {
        draggedFile: {
          index: Number(draggedId),
          src: dragged
        },
        replacedFile: {
          index: Number(replacedId),
          src: replaced
        }
      }
       return onDragFinish(responseObj)
    }
  }
  return (
      <>
      {images.map((im, id) => (
        <img src={im} alt="new image" style={styles} draggable={true}
        id={id.toString()}
        key={im+id.toString()}
        onDragStart={handleDragStart}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDrageEnter}
        onDragLeave={handleDragLeave}
        />
      ))}
      </>
  );
}

export default ReactDrag;
