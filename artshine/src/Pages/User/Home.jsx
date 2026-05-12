import React from 'react'

// Import all sections
import HeroSection from '../../Component/HomeComponents/HeroSection'
import StorySection from '../../Component/HomeComponents/StorySection'
import ServicesBento from '../../Component/HomeComponents/ServicesBento'
import GalleryMasonry from '../../Component/HomeComponents/GalleryMasonry'
import FeatureTimeline from '../../Component/HomeComponents/FeatureTimeline'
import TestimonialBlock from '../../Component/HomeComponents/TestimonialBlock'
import ContactCTA from '../../Component/HomeComponents/ContactCTA'

function Home() {
    return (
        <div className="w-full overflow-hidden">
            <HeroSection />
            <StorySection />
            <ServicesBento />
            <GalleryMasonry />
            <FeatureTimeline />
            <TestimonialBlock />
            <ContactCTA />
        </div>
    )
}

export default Home