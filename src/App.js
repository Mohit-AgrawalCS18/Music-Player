import React, { useState,useRef,useEffect } from 'react';
import './Style/app.css';
import { faMusic } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Music from './Components/music';
import Player from './Components/Player';
import data from "./Data";
import Library from './Components/Library';
import Nav from './Components/Nav'; 
import {motion} from 'framer-motion';
function App(){
  const audioRef=useRef(null);
  const [loading,setloading]=useState(true);
  const [song,setsong]=useState(data());
  const [currentsong,setcurrentsong]=useState(song[0]);
  const [isPlaying,setisPlaying]=useState(false);
  const [ismuted,setismuted]=useState(false);
  const [Song,setSong]=useState({currentTime:0,currentduration:0});
  const [Sidebar,setSidebar]=useState(false);
  const [currentvolume,setcurrentvolume]=useState(9);
  useEffect(()=>{
    if(Sidebar){
      document.getElementById('left_side').style.marginLeft="6rem";
    }else{
      document.getElementById('left_side').style.marginLeft="";
    }
  },[Sidebar])

  const timeHandler=(e)=> {
    const current=e.target.currentTime;
    const duration=e.target.duration;
    setSong({...Song,currentTime:current,currentduration:duration})
  };
  const songendHandler=async ()=>{
    let currentindex=song.findIndex((s)=>(s.id===currentsong.id));
    await setcurrentsong(song[(currentindex+1) % (song.length)]);
    if(isPlaying) audioRef.current.play();

  }

  setTimeout(()=>{setloading(false)},3000);

  if(loading){
    return (
        <main className="main">
              <div className="inner-flex">
                  <motion.h1 initial={{x:20}} animate={{x:0}} transition={{type: 'tween', ease: 'easeOut', duration: 0.75}}  className="text">Music-Player</motion.h1>
                  <span className="icon">
                      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1}} class="border-circle1">
                          <div className="border-circle2">
                              <div className="border-content"><FontAwesomeIcon icon={faMusic} size="2x" className="mr-1" /></div>
                          </div>
                      </motion.div>
                  </span>
              </div>
              <span className="spinners">
                  <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:2}} className="spinner-border text-danger"></motion.div>
              </span>
          </main>
        )
  }
  else{
    return(
    <>
      <Nav setSidebar={setSidebar} Sidebar={Sidebar} />
        <section>
          <Music Song={Song} currentsong={currentsong} isPlaying={isPlaying} />
          <Player currentvolume={currentvolume} setcurrentvolume={setcurrentvolume} setismuted={setismuted} ismuted={ismuted} setSong={setSong} setsong={setsong} audioRef={audioRef} isPlaying={isPlaying} Song={Song}
          setisPlaying={setisPlaying} currentsong={currentsong} song={song} setcurrentsong={setcurrentsong} />
          <Library setSidebar={setSidebar} Sidebar={Sidebar} audioRef={audioRef} setsong={setsong} isPlaying={isPlaying} song={song} setcurrentsong={setcurrentsong} />
          <picture>
            <audio onEnded={songendHandler} onTimeUpdate={timeHandler} onLoadedMetadata={timeHandler} ref={audioRef} src={currentsong.audio}></audio>
          </picture>
        </section>
    </>
  )
  }
  
}


export default App;