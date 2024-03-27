import React from 'react';
import facebooklogo from '../Images/facebook.png';
import instagramlogo from '../Images/instagram.jpeg';
import youtublogo from '../Images/youtube.png';
import whatsapplogo from '../Images/whatsapp.png';

const AboutUs = () => {
  const options = [
    {
      id: 1,
      logo: facebooklogo,
      title: 'Facebook',
      link: 'https://www.instagram.com/narayani_pharmacy/',
      text: 'Ayubazar'
    },
    {
      id: 2,
      logo: instagramlogo,
      title: 'Instagram',
      link: 'https://www.instagram.com/narayani_pharmacy/',
      text: 'Ayubazar'
    },
    {
      id: 3,
      logo: youtublogo,
      title: 'YouTube',
      link: 'https://www.youtube.com/channel/UC-uhIGI9sbNOIpJGKKAfAQw',
      text: 'Mitra'
    },
    {
      id: 4,
      logo: whatsapplogo,
      title: 'WhatsApp',
      link: 'https://api.whatsapp.com/send/?phone=919428560666&text=Add+me+on+Update+list&type=phone_number&app_absent=0',
      text: 'Ayubazar'
    }
  ]
  const handleOpenLink = (link) => {
    window.open(link, '_blank');
  }

  return (
    <>
      <div className='flex justify-center items-center bg-[#F8F6F3] py-16'>
        <span className='text-4xl font-bold text-[#333]'>About Us</span>
      </div>
      <div className='flex flex-col justify-center items-center py-12 text-center'>
        <span className='text-3xl font-bold text-[#333]'>We Are Your Favourite Store.</span>
        <div className='w-2/3 mt-6'>
          <span className='text-[#999]'>
            We at Narayani Group of Companies engaged in Ayurvedic, herbal, health care business since 1997, having legacy of three generation. We deals in manufactures distributions, retails chains, health care centers and e-commence/online selling platforms.
          </span>
        </div>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8 mx-4'>
        {
          options.map((item, index) => (
            <div key={index}
              className='flex rounded-lg transition-all p-4 hover:shadow-2xl
            ease-in-out duration-200 shadow-xl bg-gray-50 cursor-pointer'
              onClick={() => handleOpenLink(item.link)}>
              <div className='w-1/3'>
                <div className="image-container" style={{ width: '70px', height: '70px', backgroundColor: '#FFF' }}>
                  <img src={item.logo} className="w-full h-full object-cover" alt={item.title} />
                </div>
              </div>
              <div className='w-2/3 flex flex-col'>
                <span className='text-xl font-semibold text-[#333]'>{item.title}</span>
                <span className='text-[#999] text-base font-semibold mt-3'>{item.text}</span>
              </div>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default AboutUs;