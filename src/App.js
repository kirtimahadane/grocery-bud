import React,{useEffect, useState} from 'react'
import Alert from './Alert'
import List from './List'
const getLocalStorage= ()=>{
  let list= localStorage.getItem("list");
  if(list){
    return JSON.parse(localStorage.getItem("list"));
  }else{
    return [];
  }
}
const App = () => {
  const [name, setName]=useState("");
  const [list, setList]= useState(getLocalStorage());
  const [isEditing, setIsEditing]= useState(false);
  const[editID, setEditID]= useState(null);
  const[alert, SetAlert]= useState({
    show:false,
    msg:"",
    type:""
  })
  const handleSubmit=(e)=>{
    e.preventDefault();
    if(!name){
      // show alert
      showAlert(true, "Please enter value", "danger")
    }
    else if(name && isEditing){
      setList(list.map(item=>{
        if(item.id === editID){
          return{...item, title:name}
        }
        return item;
      }))
      setName("");
      setEditID(null);
      setIsEditing(false);
      showAlert(true,"Value changed", "success")
    }
    else{
     showAlert(true, "Item Added", "success")
      const newItem= {
        id:new Date().getTime().toString(),
        title:name
      }

      setList([...list, newItem])
      setName("")
    }
  }
  const showAlert=(show=false, msg="", type="")=>{
    SetAlert({show, msg, type})
  }
  const clearList=()=>{
    showAlert(true, "Empty List", "danger");
    setList([]);
  }
  const removeItem=(id)=>{
    setList(list.filter(item=> item.id !==id));
    showAlert(true, "Item removed", "danger")
  }

  const editItem=(id)=>{
const specificItem= list.find(item=>item.id ===id)
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title)
    
  }
  useEffect(()=>{
    localStorage.setItem('list', JSON.stringify(list));
  },[list])
  
    

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} />}
        <h3>Grocery Bud</h3>
        <div className="form-control">
          <input type="text" className="grocery"
          placeholder="eg. Eggs"
          value={name}
          onChange={(e)=>setName(e.target.value)}
           />
           <button className="submit-btn" type="submit">
             {isEditing? "Edit":"Submit"}
           </button>
        </div>
      </form>
      {list.length>0 && <div className="grocery-container">
      <List items={list} removeItem={removeItem} editItem={editItem}/>
      <button className="clear-btn" onClick={clearList}> Clear items</button>
    </div>
      }
    
    </section>
  )
}

export default App
