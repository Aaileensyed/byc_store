import React from 'react';
import { Howl } from 'howler';

interface SoundProps {
  src: string;
}

const Sound: React.FC<SoundProps> = ({ src }) => {
  const sound = new Howl({
    src: [src],
  });

  const playSound = () => {
    sound.play();
  };

  return (
    <button onClick={playSound}>Play Sound</button>
  );
};

export default Sound;
