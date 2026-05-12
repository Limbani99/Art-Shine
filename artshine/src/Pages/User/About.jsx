import React from 'react'
import AboutHero from '../../Component/AboutComponents/AboutHero'
import StatsBand from '../../Component/AboutComponents/StatsBand'
import PhilosophySection from '../../Component/AboutComponents/PhilosophySection'
import PromiseBox from '../../Component/AboutComponents/PromiseBox'
import AboutCTA from '../../Component/AboutComponents/AboutCTA'

function About() {
    return (
        <div className="w-full overflow-hidden bg-[#fdfaf6]">
            <AboutHero />
            <StatsBand />
            <PhilosophySection />
            <PromiseBox />
            <AboutCTA />
        </div>
    )
}

export default About