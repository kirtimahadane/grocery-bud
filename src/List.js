import React from 'react'
import{ FaEdit, FaTrash} from 'react-icons/fa'
const List = ({items, removeItem, editItem }) => {
  return (
    <div className="grocery-list">
     {items.map(item=>{
       const{id, title}=item;
       return <article key={id} className="grocery-item">
         <p className="title">{title}</p>
         <div className="btn-container">
           <button  type="button" className="edit-btn"  onClick={()=>editItem(id)}>
             <FaEdit size="1.4rem" />
           </button>
           <button type="button" className="delete-btn" onClick={()=> removeItem(id)}>
             <FaTrash size="1.4rem"/>
           </button>
         </div>
       </article>
     })}
    </div>
  )
}

export default List
