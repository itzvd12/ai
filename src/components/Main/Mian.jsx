import React, { useContext } from 'react'
import './Main.css'
import {assets} from '../../assets/assets'
import { Context } from '../../context/Context/'
const Mian = () => {


const {onSent, recentPrompt,showResult
  ,loading,resultData,setInput,input
} = useContext(Context)



  return (
    <div className='main'>

<div className="nav">
  <p>Ichadhari Nagini</p>
  <img src={assets.user_icon} alt="" />
</div>

    <div className="main-contener">

{!showResult 
?<>
<div className="greet">
        <p><span>Hello</span></p>
        <p>How can I help you?</p>
      </div>
    


</>
 :<div className="result">
  <div className="resultTitle">
  <img src={assets.user_icon} alt="" />
  <p>{recentPrompt}</p>

</div>

<div className="resultdata">
  
   {loading 
   ?<div className="loader">
    <hr />
    <hr />
    <hr />
</div>
   : <p dangerouslySetInnerHTML={{__html:resultData}}></p>
  }
  
   
</div>

 </div>
 
}

    
<div className="main-botton">
  <div className="sherchbox">
    <input onChange={(e)=>setInput(e.target.value)} value={input} type="text"placeholder='Enter a prompt' />
    <div>
      
      <img onClick={()=>onSent()}  src={assets.send_icon} alt="" />
    </div>
  </div>
  <p className='bottom-info'>Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps</p>
</div>
</div>
    </div>
  )
}

export default Mian