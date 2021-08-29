import React from 'react';
function LibrarySongs({Songs,song,setcurrentsong,id,audioRef,isPlaying,setsong}){

    const LibraryHandler=async ()=>{
        const setlibrary=song.filter(state=>(state.id===id));
        await setcurrentsong(setlibrary[0])


        const newSong=song.map((S)=>{
            if(S.id===id){
                return{
                    ...S,
                    active:true,
                }
            }
            else{
                return{
                    ...S,
                    active:false
                }
            }
        })
        await setsong(newSong);
        if(isPlaying) audioRef.current.play();

    }
    
    return(
        <>
            <div onClick={LibraryHandler} className={`Librarysong d-flex flex-row  ${Songs.active ? 'selected':""}`}>
                <img src={Songs.cover} className="LibrarySongs_Image"></img>
                <div className="m-3">
                    <h5 style={{fontWeight:"bold"}} className="LibrarySongs_name">{Songs.name}</h5>
                    <h6 className="LibrarySongs_artist">{Songs.artist}</h6>
                </div>
            </div>
        </>
        
    )
}

export default LibrarySongs