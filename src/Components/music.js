import React from 'react';
import styled from 'styled-components';

function Music({currentsong,Song,isPlaying}){
    return(
        <Animate>
             <div className="Song-container m-4">
                <img src={currentsong.cover} id={Song.currentTime && isPlaying?"animate_image":"Pause_image"} className="CurrentSong_Cover"></img>
                <h2 className="mt-3">{currentsong.name}</h2>
                <h5 className="currentsong_artist">{currentsong.artist}</h5>
            </div>
        </Animate>
       
    )
}

const Animate=styled.div`
    #animate_image{
        animation-name: example;
        animation-iteration-count: infinite;
        animation-duration:5s;
        animation-timing-function: linear;
        animation-play-state:running;
    }
 
    @keyframes example {
        from {
            -ms-transform:rotate(0deg);
            transform:rotate(0deg)
        }
        to {
            -ms-transform:rotate(360deg);
            transform:rotate(360deg)
        }
    }
    #Pause_image{
        animation-name: example;
        animation-iteration-count: infinite;
        animation-duration:5s;
        animation-timing-function: linear;
        animation-play-state:paused;
    }
`

export default Music;