import React,{useEffect} from 'react'

const Alert = ({type, msg, removeAlert}) => {
  useEffect(()=>{
  const timeOut= setTimeout(()=>{
removeAlert()
  },2000)
  return ()=>clearTimeout(timeOut);
  },[])

  return (
    <div>
      <p className={`alert alert-${type}`}>{msg}</p>
    </div>
  )
}

export default Alert
