import cheri from '../Images/adiye.mp3'
// eslint-disable-next-line react/prop-types
const AudioComponent = ({ isMuted }) => {
    console.log(isMuted);
    return (
      <div>
        <audio
          src={cheri} // Replace with the path to your audio file
          autoPlay
          muted={isMuted}
          id="audiotag"
          // preload="auto"
        />
      </div>
    );
  };
  
  export default AudioComponent;