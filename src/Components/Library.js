import React from 'react';
import LibrarySongs from './LibrarySongs';
import { faTimes} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Library({song,setcurrentsong,audioRef,isPlaying,setsong,Width,Sidebar,setSidebar}){
    return(
        <div className={`Library ${Sidebar?"active-library":""}`} style={{width:Width}}>
            <h1 className="h3">
                 <span>Music library</span>
                <FontAwesomeIcon className="close" onClick={()=>setSidebar(false)} style={{cursor:"pointer"}} icon={faTimes} className="m-1 float-right" />
            </h1>
            {song.map(Song=>(<LibrarySongs 
            Songs={Song} 
            id={Song.id} 
            key={Song.id} 
            setsong={setsong} 
            audioRef={audioRef} 
            isPlaying={isPlaying} 
            setcurrentsong={setcurrentsong} song={song} />))}
        </div>
    )
}

export default Library;