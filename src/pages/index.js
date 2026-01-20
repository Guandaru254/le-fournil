import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';

// --- Helper Functions and Data ---

// Array of image filenames - Order is now consistent
const menuImages = [
  '1.webp', '2.jpeg', '3.jpeg', '4.jpeg', '5.jpeg', '6.jpeg', '7.jpeg', '8.jpeg',
  '9.jpeg', '10.jpeg', '11.jpeg', '12.jpeg', '13.jpeg', '14.jpeg', '15.jpeg', '16.jpeg',
  '17.jpeg', '18.jpeg'
];

const sections = {
  home: 'home',
  about: 'about',
  menu: 'menu',
  contact: 'contact',
};

// Navigation Items
const navItems = [
  { name: 'Home', section: sections.home },
  { name: 'About Us', section: sections.about },
  { name: 'Menu', section: sections.menu },
  { name: 'Contact', section: sections.contact },
];

let menuData = {
  'Viennoiseries': [
    { name: 'Croissants', description: '', image: '' },
    { name: 'Pain au Raisin', description: '', image: '' },
    { name: 'Pain au Chocolat', description: '', image: '' },
    { name: 'Torsade Chocolat', description: '', image: '' },
    { name: 'Croissants Amandes', description: '', image: '' },
    { name: 'Danish Ananas ', description: '', image: '' },
  ],
  'Boulangerie': [
    { name: 'Baguette Cereal', description: '', image: '' },
    { name: 'Pain Complet', description: '', image: '' },
    { name: 'Pain au Lait', description: '', image: '' },
    { name: 'Brioche Raisin ', description: '', image: '' },
    { name: 'Panini Focaccia ', description: '', image: '' },
    { name: 'Ciabatta', description: '', image: '' },
  ],
  'Patisserie': [
    { name: 'Eclairs ', description: '', image: '' },
    { name: 'Paris Brest', description: '', image: '' },
    { name: 'Foret Noir', description: '', image: '' },
    { name: 'Tarte aux Fraises ', description: '', image: '' },
    { name: 'Millefeuille', description: '', image: '' },
    { name: 'Religieuse', description: '', image: '' },
  ]
};

// Assign sequential images to menu items to fix randomness
let imageIndex = 0;
for (const category in menuData) {
  menuData[category].forEach(item => {
    // Uses modulo to cycle through images if there are more menu items than images
    item.image = menuImages[imageIndex % menuImages.length];
    imageIndex++;
  });
}

// Custom hook to detect if an element is in the viewport
const useOnScreen = (ref, rootMargin = '0px') => {
  const [isIntersecting, setIntersecting] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntersecting(true);
        }
      },
      { rootMargin }
    );
    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref, rootMargin]);
  return isIntersecting;
};

// --- Main Components ---

const MobileMenu = ({ isOpen, onClose, onNavClick }) => (
  <div className={`fixed inset-0 z-50 bg-[#080419] transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
    <div className="flex justify-end p-6">
      <button onClick={onClose} aria-label="Close menu" className="text-[#f5f5dc] text-4xl">
        &times;
      </button>
    </div>
    <nav className="flex flex-col items-center justify-center space-y-10 h-full">
      {navItems.map(item => (
        <a
          key={item.name}
          href={`#${item.section}`}
          onClick={(e) => {
            e.preventDefault();
            onNavClick(item.section);
            onClose();
          }}
          className="text-4xl font-serif font-bold text-[#f5f5dc] hover:text-[#ebb207] transition-colors duration-200"
        >
          {item.name}
        </a>
      ))}
    </nav>
  </div>
);

const Header = ({ activeSection, onNavClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-[#080419]/90 backdrop-blur-sm shadow-xl' : 'bg-transparent'}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex justify-between items-center py-4">
            <div className="flex-shrink-0">
              <a href="#" className="flex items-center space-x-2">
                <img src="logo.png" alt="Le Fournil Logo" className="h-40 w-auto" />
              </a>
            </div>
            <div className="hidden md:flex space-x-8">
              {navItems.map(item => (
                <a
                  key={item.name}
                  href={`#${item.section}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavClick(item.section);
                  }}
                  className={`text-[#f5f5dc] hover:text-[#ebb207] transition-colors duration-200 font-medium relative before:absolute before:bottom-0 before:left-1/2 before:w-0 before:h-0.5 before:bg-[#ebb207] before:transition-all before:duration-300 before:-translate-x-1/2 hover:before:w-full ${activeSection === item.section ? 'text-[#ebb207] font-bold before:w-full' : ''}`}
                >
                  {item.name}
                </a>
              ))}
            </div>
            <div className="md:hidden">
              <button onClick={() => setIsMobileMenuOpen(true)} aria-label="Open menu" className="text-[#f5f5dc] text-3xl">
                &#9776;
              </button>
            </div>
          </nav>
        </div>
      </header>
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} onNavClick={onNavClick} />
    </>
  );
};

const Hero = () => {
  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.pageYOffset);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id={sections.home} className="relative min-h-screen flex items-center justify-center text-center overflow-hidden">
      {/* Background image used from one of the screenshots. Parallax effect restored. */}
      <div className="absolute inset-0 z-0 bg-cover bg-center md:bg-fixed"
        style={{ backgroundImage: `url('/IMG-20250902-WA0001 (1).jpg')`, transform: `translateY(${offsetY * 0.5}px)` }}>
        <div className="absolute inset-0 bg-[#080419]/60 backdrop-blur-sm"></div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10 py-32 sm:py-48 lg:py-64">
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold font-serif text-[#f5f5dc] leading-tight animate-fade-in-up">
          TASTE THE TRADITION<br />WITH EVERY BITE
        </h1>
        <p className="mt-4 text-lg md:text-xl text-[#f5f5dc] animate-fade-in-up animation-delay-300">
          Authentic French flavors, crafted with passion in Nairobi, Kenya.
        </p>
        <a
          href="#menu"
          className="mt-8 inline-block px-10 py-4 text-lg font-medium text-[#080419] bg-[#ebb207] rounded-full hover:bg-[#d9a206] transition-all duration-300 shadow-xl transform hover:-translate-y-1 hover:scale-105 animate-fade-in-up animation-delay-600"
        >
          Explore Our Menu
        </a>
      </div>
    </section>
  );
};

// FIX: Updated About component to make the image container stretch to the height of the text column
const About = ({ innerRef, isVisible }) => (
  <section ref={innerRef} id={sections.about} className={`py-20 relative overflow-hidden bg-[#f5f5dc]`}>
    {/* CRITICAL: Added items-stretch to the flex container */}
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-stretch space-y-12 md:space-y-0 md:space-x-12 relative z-10">
      
      {/* Image container */}
      <div 
        className={`md:w-1/2 w-full min-h-80 relative transform transition-all duration-500 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
        style={{ height: '100%' }}
      >
        <img 
          src="3.jpeg" 
          alt="Assortment of Le Fournil baked goods" 
          className="rounded-lg shadow-xl w-full h-full object-cover"
        />
      </div>
      
      {/* Text column */}
      <div className={`md:w-1/2 transition-all duration-500 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
        <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#080419]">Our Mission</h2>
        <p className="mt-4 text-[#080419] leading-relaxed">
          Le Fournil's mission is to deliver an authentic French bakery experience through exceptional quality, traditional craftsmanship, and a commitment to customer satisfaction. By bringing time-honored recipes and baking techniques to Nairobi, we enrich the local community with genuine French flavors, filling a unique niche in the region.
        </p>
      </div>
    </div>
  </section>
);


const Menu = ({ innerRef, isVisible }) => {
  const [selectedCategory, setSelectedCategory] = useState('Viennoiseries');
  const categories = Object.keys(menuData);

  return (
    <section ref={innerRef} id={sections.menu} className={`py-20 bg-[#080419] transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold font-serif text-[#f5f5dc]">Our Menu</h2>
        <p className="mt-4 text-lg text-[#f5f5dc]">
          Explore our wide range of freshly baked French creations.
        </p>

        {/* Category Navigation */}
        <div className="mt-12 flex flex-wrap justify-center gap-4 md:gap-6 overflow-x-auto pb-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`
                px-6 py-2 rounded-full font-medium text-sm md:text-base
                transition-all duration-300 transform
                ${selectedCategory === category
                  ? 'bg-[#ebb207] text-[#080419] shadow-lg scale-105'
                  : 'bg-transparent text-[#f5f5dc] border border-[#f5f5dc] hover:bg-[#ebb207] hover:text-[#080419] hover:scale-105'
                }
              `}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuData[selectedCategory].map((item, index) => (
            <div
              key={item.name}
              className={`
                bg-[#f5f5dc] rounded-2xl shadow-xl overflow-hidden
                transform transition-all duration-500 hover:scale-[1.03]
                flex flex-col
              `}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <div className="relative overflow-hidden h-48 sm:h-56">
                <img
                  src={item.image} // This now uses a predictable image based on its index
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  onError={(e) => e.target.src = "https://placehold.co/400x300/6B4226/EEDFCC?text=Image+Not+Found"}
                />
              </div>
              <div className="p-6 text-left flex flex-col flex-grow">
                <h4 className="text-xl font-bold font-serif text-[#080419] mb-1">{item.name}</h4>
                <p className="text-sm text-gray-600 flex-grow">{item.description}</p>
                {/* Price element was REMOVED as requested. */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


const Contact = ({ innerRef, isVisible }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section ref={innerRef} id={sections.contact} className={`py-20 bg-[#080419] text-[#f5f5dc] transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#f5f5dc]">Visit Us</h2>
        <div className="mt-8 flex flex-col items-center">
          <div className="mb-8 text-center text-[#f5f5dc]">
            <p className="font-semibold text-lg">Le Fournil Kenya</p>
            <p>Enterprise 45, Industrial Area</p>
            <p>Nairobi, Kenya</p>
            <p className="mt-2">Phone: <a href="tel:+254796867374" className="text-[#ebb207] hover:underline">0758 735 052</a></p> 
          </div>
          <form onSubmit={handleSubmit} className="bg-[#f5f5dc] rounded-lg p-8 shadow-md max-w-lg w-full text-left">
            <h3 className="text-2xl font-serif font-semibold text-[#080419] mb-4">Send us a Message</h3>
            <div className="mb-4">
              <label htmlFor="name" className="block text-[#080419] font-medium">Name</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2" />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-[#080419] font-medium">Email</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2" />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-[#080419] font-medium">Message</label>
              <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows="4" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"></textarea>
            </div>
            <button type="submit" className="w-full px-4 py-2 text-lg font-medium text-[#080419] bg-[#ebb207] rounded-md hover:bg-[#d9a206] transition-colors duration-300 shadow-lg">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-[#080419] text-[#f5f5dc] py-8">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div className="flex justify-center space-x-6 mb-4">
        {/* Facebook Icon and Link */}
        <a href="https://web.facebook.com/profile.php?id=61580996723161" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-[#f5f5dc] hover:text-[#ebb207] transition-colors duration-200">
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M22.258 1H2.742C1.785 1 1 1.785 1 2.742v18.516c0 .957.785 1.742 1.742 1.742h9.584V14h-2.923v-3.417h2.923V8.5c0-2.887 1.76-4.475 4.364-4.475 1.246 0 2.31.092 2.622.133V7.27h-1.666c-1.31 0-1.564.622-1.564 1.536v2.103h3.48L19.46 14h-3.48v8.995h5.275c.957 0 1.742-.785 1.742-1.742V2.742c0-.957-.785-1.742-1.742-1.742z"/></svg>
        </a>
        {/* Instagram Icon and Link */}
        <a href="https://www.instagram.com/le.fournil_ke/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-[#f5f5dc] hover:text-[#ebb207] transition-colors duration-200">
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07c3.252.148 4.771 1.691 4.919 4.919.058 1.265.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.148 3.252-1.691 4.771-4.919 4.919-.058.058-1.265.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.07-1.646-.07-4.85s.012-3.584.07-4.85c.148-3.252 1.691-4.771 4.919-4.919.058-.058 1.265-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.435.204-6.73 2.617-6.934 6.934-.058 1.28-.072 1.688-.072 4.947s.014 3.667.072 4.947c.204 4.435 2.617 6.73 6.934 6.934 1.28.058 1.688.072 4.947.072s3.667-.014 4.947-.072c4.435-.204 6.73-2.617 6.934-6.934.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.204-4.435-2.617-6.73-6.934-6.934zM12 5.5c-3.584 0-6.5 2.916-6.5 6.5s2.916 6.5 6.5 6.5 6.5-2.916 6.5-6.5-2.916-6.5-6.5-6.5zm0 11.5c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm3.5-9.5c0 .829-.671 1.5-1.5 1.5s-1.5-.671-1.5-1.5.671-1.5 1.5-1.5 1.5.671 1.5 1.5z"/></svg>
        </a>
        {/* TikTok Icon and Link - Corrected SVG */}
        <a href="https://www.tiktok.com/@lefournilkenya?lang=en" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-[#f5f5dc] hover:text-[#ebb207] transition-colors duration-200">
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M21.241 6.843c0 1.25-.091 2.375-.246 3.444-.153 1.058-.453 2.052-.878 2.946-.43.906-1.026 1.688-1.758 2.355-.73.666-1.637 1.156-2.65 1.488-1.018.332-2.155.5-3.395.5-1.026 0-1.996-.1-2.924-.316-.925-.221-1.78-.567-2.545-1.026-.767-.464-1.455-1.053-2.045-1.758-.59-2.035-.87-4.137-.87-6.26.002-1.13.064-2.17.185-3.13.123-.956.353-1.84.697-2.613.344-.77.807-1.425 1.353-1.928.547-.506 1.198-.89 1.93-1.144 2.805-.964 5.92-.61 8.525 1.077 2.628 1.69 4.14 4.887 4.14 8.79zM15.4 6.942v4.868c0 .285-.232.517-.517.517s-.517-.232-.517-.517V7.15c-1.32-.825-2.822-1.29-4.385-1.29-1.365 0-2.6.452-3.664 1.317-1.07.865-1.727 2.062-1.928 3.395-.2.784-.183 1.573-.133 2.35.05.776.223 1.482.527 2.094.305.613.754 1.05 1.32 1.317.56.267 1.25.395 2.06.395.787 0 1.52-.16 2.222-.486.7-.323 1.282-.82 1.76-1.488.475-.67.757-1.46.845-2.355.088-.895.03-1.802-.174-2.72.036-.002.072-.003.108-.003 1.196 0 2.167-.97 2.167-2.167C15.917 7.912 15.65 6.942 15.4 6.942z"/></svg>
        </a>
      </div>
      <p>&copy; {new Date().getFullYear()} Le Fournil. All Rights Reserved.</p>
    </div>
  </footer>
);

export default function Home() {
  const [activeSection, setActiveSection] = useState(sections.home);

  const aboutRef = useRef(null);
  const menuRef = useRef(null);
  const contactRef = useRef(null);

  const isAboutVisible = useOnScreen(aboutRef, '-100px');
  const isMenuVisible = useOnScreen(menuRef, '-100px');
  const isContactVisible = useOnScreen(contactRef, '-100px');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      let newActiveSection = sections.home;

      if (document.getElementById(sections.contact)?.offsetTop < scrollPosition) {
        newActiveSection = sections.contact;
      } else if (document.getElementById(sections.menu)?.offsetTop < scrollPosition) {
        newActiveSection = sections.menu;
      } else if (document.getElementById(sections.about)?.offsetTop < scrollPosition) {
        newActiveSection = sections.about;
      }

      setActiveSection(newActiveSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (section) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="font-sans">
      <Head>
        <title>Le Fournil - Authentic French Bakery in Nairobi</title>
        <meta name="description" content="Taste the tradition with every bite. Authentic French flavors, crafted with passion in Nairobi, Kenya." />
        <link rel="icon" href="/favicon.ico" />
        {/*
          CRITICAL: Google Fonts links were removed from here to _document.js 
          to resolve the Next.js warning.
        */}
      </Head>
      {/* CRITICAL: The inline <style> block has been removed and its contents 
        should be moved to your global CSS file (e.g., styles/globals.css) 
        to maintain the custom animations and fonts.
      */}
      <Header activeSection={activeSection} onNavClick={handleNavClick} />
      <main>
        <Hero />
        <About innerRef={aboutRef} isVisible={isAboutVisible} />
        <Menu innerRef={menuRef} isVisible={isMenuVisible} />
        <Contact innerRef={contactRef} isVisible={isContactVisible} />
      </main>
      <Footer />
    </div>
  );
}