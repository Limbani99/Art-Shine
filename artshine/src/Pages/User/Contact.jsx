import React from 'react'

import ContactHeader from '../../Component/ContactComponents/ContactHeader'
import ContactForm from '../../Component/ContactComponents/ContactForm'
import ContactDetails from '../../Component/ContactComponents/ContactDetails'
import ContactGallery from '../../Component/ContactComponents/ContactGallery'

function Contact() {
    return (
        <div className="w-full overflow-hidden bg-[#fdfaf6]">
            
            <ContactHeader />
            
            <section className="w-full px-6 md:px-16 pb-24 md:pb-32 relative z-20">
              <div className="max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_0.7fr] gap-12 lg:gap-24 items-stretch">
                <ContactForm />
                <ContactDetails />
              </div>
            </section>

            <ContactGallery />
            
        </div>
    )
}

export default Contact