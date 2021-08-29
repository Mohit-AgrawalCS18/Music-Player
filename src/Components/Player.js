import React, {useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward,faPlay,faPause,faForward,faVolumeUp,faVolumeMute, faVolumeOff } from '@fortawesome/free-solid-svg-icons'
function Player(
    {isPlaying,setisPlaying,setsong,setSong,currentvolume,setcurrentvolume,
    Song,audioRef,song,currentsong,setcurrentsong,ismuted,setismuted,props}){
    useEffect(()=>{
        const newSong=song.map((S)=>{
            if(S.id===currentsong.id){
                return{
                    ...S,
                    active:true
                }
            }
            else{
                return{
                    ...S,
                    active:false
                }
            }
        });
        setsong(newSong);
    },[currentsong]);
    const playHandler=()=>{
         if(isPlaying){
            audioRef.current.pause();
            setisPlaying(!isPlaying);
         }
         else{
            audioRef.current.play();
            setisPlaying(!isPlaying);
         }
    }

    const mutehandler=()=>{
        if(!ismuted){
            audioRef.current.muted=true;
            setismuted(true)
        }
        else{
            audioRef.current.muted=false;
            setismuted(false)
        }
    }
    
    const gettime=(time)=>{
        return(
            Math.floor(time/60)+":"+("0"+Math.floor(time%60)).slice(-2)
        )
    }
    const dragHandler=(e)=>{
        audioRef.current.currentTime=e.target.value;
        setSong({...Song,currentTime:e.target.value});
    }
    const volumeHandler=(e)=>{
        var num=e.target.value/10;
        audioRef.current.volume=num;
        setcurrentvolume(e.target.value)
    }
    const skipHandler=async (direction)=>{
        let currentindex=song.findIndex((s)=>(s.id===currentsong.id));
        if(direction==="skip-forward"){
           await setcurrentsong(song[(currentindex+1) % (song.length)]);
        }
        if(direction==="skip-backward"){
            if((currentindex-1)%song.length===-1){
               await setcurrentsong(song[song.length-1]);
                if(isPlaying){
                    audioRef.current.play();
                    return;
                }
        }
        setcurrentsong(song[(currentindex-1) % (song.length)]);

        }
        if(isPlaying) audioRef.current.play();

    }

    return(
            <div className="Player-conatiner">
                <div className="time-controller">
                    <h6 className="m-2"> 
                        {gettime(Song.currentTime)}
                    </h6>
                
                        <input className="rangeslider" min={0} max={Song.currentduration||0} onChange={dragHandler} value={Song.currentTime} type="range"></input>
                    
                    <h6 className="m-2">{Song.currentduration?gettime(Song.currentduration):"0:00"}</h6>
                </div>
                <div className="Play-controller">
                    <div className="mt-4">
                        <FontAwesomeIcon onClick={()=>skipHandler('skip-backward')} className="backward"icon={faBackward} />  
                        <FontAwesomeIcon onClick={playHandler} size="2x" className="Start" icon={isPlaying?faPause:faPlay} />
                        <FontAwesomeIcon  onClick={()=>skipHandler('skip-forward')} className="forward" icon={faForward} />
                    </div>

                    <div className="volumeTag d-flex">
                        <FontAwesomeIcon className="mr-1" style={{cursor:'pointer'}} onClick={mutehandler} size="1x" icon={!ismuted && currentvolume/10 !== 0?faVolumeOff:faVolumeMute} />
                        <input className="volumeSlider mt-1" onChange={volumeHandler} value={ismuted?currentvolume=0:currentvolume} type="range" min={0} max={10}/>
                        <FontAwesomeIcon className="ml-1" style={{cursor:'pointer'}} size="1x" icon={faVolumeUp} />
                    </div>
                    
                </div>
            </div>  
    )
}
export default Player;