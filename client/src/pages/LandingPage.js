import Hero from '../components/Hero';
import Features from '../components/Features';
import Timeline from '../components/TimeLine';
import Stats from '../components/StatsComponent';
import ScrollTop from '../components/ScrollTop.js';

import React, { useState } from 'react';

const LandingPage = () => {
  return (
    <>
      <Hero />
      <Features />
      <Timeline />
      <Stats />
      <ScrollTop />
    </>
  );
};

export default LandingPage;
