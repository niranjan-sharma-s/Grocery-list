import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

const getLocalStorage = () => {
  let list = localStorage.getItem('list')
  if(list){
    return JSON.parse(localStorage.getItem('list'))
  }
  else{
    return []
  }
}

function App() {
  const [name, setName] = useState('')
  const [list, setList] = useState(getLocalStorage())
  const [editing, setEditing] = useState(false)
  const [editID, setEditID] = useState(null)
  const [alert, setAlert]=useState({show:true , msg:'',type:''})
 
 
  const handleSubmit =(e) =>{
e.preventDefault()

if(!name){
  //show alert
 showAlert(true , 'danger','Please enter value')
}else if (name && editing){
  //editing
  setList(list.map((item) => {
    if(item.id === editID){
      return {...item, title:name}
    }
return item
  }))
setName('')
setEditID(null)
setEditing(false)
showAlert(true,'success','value edited')
}
else{
  //show alert
  showAlert(true , 'success','Item added successfully')
  //add new item to list
  const newItem = {id:new Date().getTime().toString(), title:name}
  setList([...list,newItem])
  setName('')
}
 }

 const showAlert = (show=false , type='',msg='') => {
   setAlert({show,type,msg})

 }

 const clearList =() => {
   showAlert(true,'danger','Clearing list')
   setList([])
 }

 const removeItem = (id) => {
   showAlert(true ,'danger', 'Item removed')
   setList(list.filter((item) => item.id !== id))
 }

 const editItem = (id) => {
   const specificItem = list.find((item) => item.id===id)
   setEditing(true)
   setEditID(id)
   setName(specificItem.title)
 }

 useEffect(() => {

  localStorage.setItem('list',JSON.stringify(list))

 },[list])
  return <section className='section-center'>
    <form className='grocery-form' onSubmit={handleSubmit}>
{alert && <Alert {...alert} removeAlert={showAlert} />}
<h3>Grocery List</h3>
<div className="form-control">
  <input type="text" className='grocery' placeholder='eggs' value={name} onChange={(e) => setName(e.target.value)} />
  <button type='submit' className='submit-btn'>
    {editing ? 'edit' : 'submit'}
  </button>
</div>
    </form>
    {list.length >0 && 
   <div className="grocery-container">
     <List items={list} removeItem={removeItem} editItem={editItem}/>
     <button className="clear-btn" onClick={clearList}>Clear Items</button>
   </div>
  }

    </section>


}

export default App
