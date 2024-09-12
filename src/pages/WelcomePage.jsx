import React, { useCallback, useEffect, useState } from "react";
import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, Works, StarsCanvas } from "../components/compWP";

const WelcomePage = () =>{
    return(
        <div className='relative z-0 bg-[#F9F9F9]'>
        <StarsCanvas />
            <div className='relative'>
            <div className='absolute inset-0 bg-hero-pattern bg-cover bg-no-repeat bg-center opacity-60'></div>
            <div className='relative'>
                <Navbar />
                <Hero />
            </div>
            </div>
        <About />
        <Experience />
        <Tech />
        <Works />
        <Feedbacks />
        <div className='relative z-0'>
            <Contact />
        </div>
        </div>
    );
}
export default WelcomePage;