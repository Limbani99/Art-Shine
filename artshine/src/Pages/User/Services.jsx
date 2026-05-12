import React from 'react'

import ServicesHeader from '../../Component/ServiceComponents/ServicesHeader'
import ServicesGrid from '../../Component/ServiceComponents/ServicesGrid'
import ServicePromise from '../../Component/ServiceComponents/ServicePromise'
import ServiceCTA from '../../Component/ServiceComponents/ServiceCTA'

function Services() {
    return (
        <div className="w-full overflow-hidden bg-[#fdfaf6]">
            <ServicesHeader />
            <ServicesGrid />
            <ServicePromise />
            <ServiceCTA />
        </div>
    )
}

export default Services