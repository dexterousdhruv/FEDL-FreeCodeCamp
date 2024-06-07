import React from "react";

const Drumpad = ({ keys, handleClick, audioSrc, audioName, handleKeyDown }) => {
  return (
    <button
      id={audioName}
      className="drum-pad w-full aspect-square rounded-md bg-[#464242] grid place-content-center text-3xl min-[430px]:text-5xl text-[#2e8cf0] font-bold active:bg-[#2e8cf0] active:text-[#fff] active:scale-90 duration-100"
      onClick={(e) => handleClick(e)}
      onKeyDown={(e) => handleKeyDown(e)}
    >
      {keys}
      <audio id={keys} src={audioSrc} rel={audioName} className="clip"></audio>
    </button>
  );
};

export default Drumpad;
