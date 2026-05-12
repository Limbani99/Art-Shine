import React from 'react'

import GalleryHeader from '../../Component/GalleryComponents/GalleryHeader'
import GalleryGrid from '../../Component/GalleryComponents/GalleryGrid'
import ArtistNotes from '../../Component/GalleryComponents/ArtistNotes'
import JournalFeed from '../../Component/GalleryComponents/JournalFeed'
import ThreeDSlider from '../../Component/Animations/ThreeDSlider'

const galleryItems = [
    { image: '/images/hero.png', title: 'Eternal Rose', description: 'A perfectly preserved red rose in a clear resin block.' },
    { image: '/images/varmala.png', title: 'Wedding Garland', description: 'Traditional Varmala elements preserved for a lifetime.' },
    { image: '/images/story.png', title: 'Floral Pyramid', description: 'A stunning 3D composition of wildflowers.' },
    { image: '/images/gallery_hex.png', title: 'Hexagon Keepsake', description: 'Geometric beauty meeting natural elegance.' },
    { image: '/images/service.png', title: 'Custom Pendant', description: 'Wearable art made from preserved petals.' },
];

function Gallery() {
    return (
        <div className="w-full overflow-hidden bg-[#fdfaf6]">
            <GalleryHeader />
            <div className="py-20 bg-white">
                <div className="text-center mb-10">
                    <h2 className="font-serif text-4xl text-[#3d2e1f]">Featured Exhibitions</h2>
                    <p className="text-[#a87a52] uppercase tracking-widest text-sm mt-2">Interactive 3D Preview</p>
                </div>
                <ThreeDSlider items={galleryItems} />
            </div>
            <GalleryGrid />
            <ArtistNotes />
            <JournalFeed />
        </div>
    )
}

export default Gallery