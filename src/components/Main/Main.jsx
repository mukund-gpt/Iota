import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'
import SignOut from '../../SignIn/SignOut'
import { getAuth } from 'firebase/auth';

const Main = () => {
  const { input, setInput, recentPrompt, showResult, loading, resultData, onSent } = useContext(Context)
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      onSent(); 
    }
  };
  return (
    <div className="main">
      <div className="nav">
        <p>Gemini </p>
        <div>
          <img className='img' src={getAuth().currentUser.photoURL} alt="" />
          <SignOut />
        </div>

      </div>

      <div className="main-container">
        {!showResult
          ? <>

            <div className="greet">
              <p className='name'><span>Hello, {getAuth().currentUser.displayName} </span></p>
              <p>How can I help you today?</p>
            </div>

            <div className="cards">
              <div className="card">
                <p>Explain how something works like an engineer</p>
                <img src={assets.bulb_icon} alt="" />
              </div>

              <div className="card">
                <p>Help me pick a movie to watch based on a genre</p>
                <img src={assets.compass_icon} alt="" />
              </div>

              <div className="card">
                <p>Outline an organized & logical sales pitch for a new product</p>
                <img src={assets.code_icon} alt="" />
              </div>

              <div className="card">
                <p>Give me phrases to learn a new language</p>
                <img src={assets.compass_icon} alt="" />
              </div>
            </div>
          </>
          : <div className="result">
            <div className="result-title">
              <img src={getAuth().currentUser.photoURL} alt="" />
              <p>{recentPrompt}</p>
            </div>

            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              {loading
                ? <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
                : <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              }

            </div>

          </div>
        }


        <div className="main-bottom">
          <div className="search-box">
            <input onChange={(e) => setInput(e.target.value)} value={input} onKeyDown={handleKeyDown} type="text" placeholder='Enter a prompt here' />
            <div>
              <img src={assets.gallery_icon} />
              <img src={assets.mic_icon} />
              {input ? <img onClick={() => onSent()} src={assets.send_icon} /> : null}
            </div>

          </div>
          <p className='bottom-info'>Gemini may display inaccurate info, including about people, so double-check its responses.</p>
        </div>
      </div>

    </div>
  )
}

export default Main