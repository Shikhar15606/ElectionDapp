import Hero from '../components/Hero';
import Features from '../components/Features';
import Timeline from '../components/TimeLine';
import Stats from '../components/StatsComponent';

import React, { useState } from 'react';

const LandingPage = () => {
  return (
    <>
      <Hero />
      <Features />
      <Timeline />
      <Stats />
    </>
  );
};

export default LandingPage;
