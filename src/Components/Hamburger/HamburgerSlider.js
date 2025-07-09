import React, { useState } from 'react';
import LiveStreamIcon from "./LiveStreamIcon"
import UserRecordingsIcon from "./UserRecordingsIcon"
import UserProfile from "../UserProfile"
import Connect from "../Connect"

export default function HamburgerSlider ({
    live, setLive, currentUser, setRadioList
}) {


  const [state, setState] = useState(0);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(
    currentUser && Object.keys(currentUser).length > 0
  );

  const [hide, setHide] = useState(null)



  const handleOptionClick = (optionIndex) => {
    setState(optionIndex);
    setLive(optionIndex);
    setHide(null)

    if(optionIndex === 2){
      setHide('')
    }
  };




  return (
  <div className="p-8">
    <style jsx>{`
      .switch-checkbox {
        height: 0;
        width: 0;
        position: absolute;
        visibility: hidden;
      }
      .switch {
        cursor: pointer;
        transition: background-color 0.2s;
        position: absolute;
      }
      .switch2 {
        cursor: pointer;
        transition: background-color 0.2s;
        position: relative;
      }
      .switch .switch-button {
        position: absolute;
        transition: 0.2s;
        box-shadow: 0 0 2px 0 rgba(10, 10, 10, 0.29);
        border-width: 2px;
        border-style: none none solid none;
        border-color: #aaa;
        border-width: 2px;
        left: -2px;
        top: -2px;
      }
      .switch-button.state-0 {
        top: -1px;
        transform: translateX(0%);
      }
      .switch-button.state-1 {
        top: -1px;
        transform: translateX(100%);
      }
      .switch-button.state-2 {
        top: -1px;
        transform: translateX(200%);
      }
      .switch-labels {
        display: flex;
        z-index: 0;
        height: 100%;
      }
      .switch-labels span {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 33.33%;
        height: 100%;
        font-size: 1rem;
        cursor: pointer;
        z-index: 10;
      }
    `}</style>
    
    <div className="flex mb-4">
      <div className="mt-0 lg:mt-4 flex transparent relative zSlider">
        <label className="w-[22.5rem] lg:w-[45rem] h-[2.5rem] switch">
          <input
            className="switch-checkbox"
            type="checkbox"
            checked={state > 0}
            readOnly
          />
          <div className={`switch-button w-[7.5rem] lg:w-[15rem] h-[3rem] state-${state}`} />
          <div className="switch-labels text-[1.25rem]">
            <span 
              onClick={() => handleOptionClick(0)}
            >
              <LiveStreamIcon />
            </span>
            <span 
              onClick={() => handleOptionClick(1)}
            >
              <UserRecordingsIcon />
            </span>
            <span 
              onClick={() =>isUserLoggedIn
                ?handleOptionClick(3)
                :handleOptionClick(2)
              }
            >
              { 
                  isUserLoggedIn
                  ? <UserProfile edits={true} />
                  : <Connect hide={hide} />
              }
            
            </span>
          </div>
        </label>
      </div>
    </div>
  </div>
);
}