import React from 'react';
import Sound from 'react-sound';

const VictorySound = (props) => {
 return (
   <Sound
     url="https://ia801306.us.archive.org/32/items/FF7ACVictoryFanfareRingtoneperfectedMp3/FF7%20AC%20Victory%20Fanfare%20Ringtone%20(perfected%20mp3).mp3"
     playStatus={Sound.status[props.playStatus]}
     playFromPosition={0}
   />
 );
}

export default VictorySound;
