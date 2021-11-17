import Hero from '../components/Hero';
import Features from '../components/Features';
import Timeline from '../components/TimeLine';
import ProgressBar from '../components/ProgressBar';
import React, { useState } from 'react';

const LandingPage = () => {
  const [progress, setProgress] = useState(0);
  const [color, setColor] = useState('');
  const colorArray = [
    '#7ea9e1',
    '#ed004f',
    '#00fcf0',
    '#d2fc00',
    '#7bff00',
    '#fa6900',
  ];

  const randomColor = () => {
    return colorArray[Math.floor(Math.random() * colorArray.length)];
  };

  const randomProgressValue = () => {
    const progressValue = Math.floor(Math.random() * 101);
    setProgress(progressValue);
    const randomProgressColor = randomColor();
    setColor(randomProgressColor);
  };

  const onChange = e => {
    if (e.target.value) {
      let prg = e.target.value;
      if (e.target.value > 100) {
        prg = 100;
      }
      if (e.target.value < 0) {
        prg = 0;
      }
      setProgress(prg);
      const randomProgressColor = randomColor();
      setColor(randomProgressColor);
    } else {
      setProgress(0);
    }
  };

  return (
    <>
      <Hero />
      <Features />
      <Timeline />
      <div class='flex flex-row flex-wrap justify-evenly'>
        <div class='max-w-sm rounded shadow-lg bg-indigo-600 m-5 rounded-br-lg filter drop-shadow-lg'>
          <h1 class='p-8 text-center'>Voters Registered</h1>
          <ProgressBar
            progress={progress}
            size={250}
            strokeWidth={20}
            circleOneStroke='#d9edfe'
            circleTwoStroke={color}
          />
        </div>
        <div class='max-w-sm rounded shadow-lg bg-indigo-600 m-5'>
          <h1 class='p-8 text-center'>Votes Casted</h1>
          <ProgressBar
            progress={progress}
            size={250}
            strokeWidth={20}
            circleOneStroke='#d9edfe'
            circleTwoStroke={color}
          />
          <button onClick={randomProgressValue}>Random</button>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
