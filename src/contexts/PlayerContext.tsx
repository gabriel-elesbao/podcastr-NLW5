import {createContext, useState, ReactNode, useContext} from 'react'


type Episode={
    title: string;
    members: string;
    thumbnail: string;
    duration: number;
    url: string;
};

type PlayerContextData={
    episodeList: Episode[];
    currentEpisodeIndex: number;
    isPlaying:boolean;
    isLooping: boolean;
    isShuffling: boolean;
    play: (episode: Episode) => void;
    playList: (list:Episode[], index:number)=> void;
    clearPlayerState:()=> void;
    togglePlay: () => void;
    toglleLoop: () => void;
    toglleShuffle: () => void;
    setIsPlayingState: (state: boolean)=>void;
    
    playNext:() => void;
    playPrevious:() => void;

    hasPrevious: boolean;
    hasNext: boolean;
    
  
}
export const PlayerContext = createContext({} as PlayerContextData);

type PlayerContextProviderProps ={
    children:  ReactNode;
}

export function PlayerContextProvider({children}:PlayerContextProviderProps){
    const [episodeList, setEpisodeList] = useState([]);
    const [currentEpisodeIndex, setcurrentEpisodeIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLooping, setLooping] = useState(false);
    const [isShuffling, setisShuffling] = useState(false);


    function play(episode: Episode){
      setEpisodeList([episode]);
      setcurrentEpisodeIndex(0);
      setIsPlaying(true);
    }

    function playList(list: Episode[], index: number){
        setEpisodeList(list);
        setcurrentEpisodeIndex(index);
        setIsPlaying(true);

    }
  
    function togglePlay(){
      setIsPlaying(!isPlaying);
    }

    function toglleLoop(){
        setLooping(!isLooping)
    }

    function toglleShuffle(){
        setisShuffling(!isShuffling);
    }



  
    function setIsPlayingState(state: boolean){
      setIsPlaying(state);
    }

    function clearPlayerState(){
        setEpisodeList([]);
        setcurrentEpisodeIndex(0);

    }

    const hasPrevious= currentEpisodeIndex>0;
    const hasNext = isShuffling || currentEpisodeIndex+1 < episodeList.length;

    function playNext(){
        if(isShuffling){

            const nextRandomEpisodeIndex = Math.floor(Math.random()* episodeList.length)
            setcurrentEpisodeIndex(nextRandomEpisodeIndex);

        }else if(hasNext){
                setcurrentEpisodeIndex(currentEpisodeIndex+1);
            }
    }

    function playPrevious(){
        if(hasPrevious){
            setcurrentEpisodeIndex(currentEpisodeIndex-1);

        }
    }


  
    return (
    <PlayerContext.Provider 
        value={{
            episodeList, 
            currentEpisodeIndex, 
            play,
            playList,
            playNext,
            playPrevious,
            isPlaying, 
            isLooping,
            isShuffling,
            togglePlay,
            toglleLoop,
            toglleShuffle,
            setIsPlayingState,
            hasNext,
            hasPrevious,
            clearPlayerState


        }}
    >
      
      {children}
    </PlayerContext.Provider>
    )
}

export const usePlayer = ()=>{
    return useContext(PlayerContext);
}