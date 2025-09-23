import React, { useState, useEffect, useRef } from 'react';

// Tailwind CSS is assumed to be configured in your Next.js project.
// This single-file component is a conceptual starting point for a modular app.

// --- Helper Functions and Data ---

// Function to shuffle an array
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// Array of image filenames to be used for the menu items
const menuImages = ['1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png', '8.png'];
const shuffledMenuImages = shuffleArray([...menuImages]);

const sections = {
  home: 'home',
  about: 'about',
  menu: 'menu',
  testimonials: 'testimonials',
  gallery: 'gallery',
  contact: 'contact',
};

const navItems = [
  { name: 'Home', section: sections.home },
  { name: 'About Us', section: sections.about },
  { name: 'Menu', section: sections.menu },
  { name: 'Testimonials', section: sections.testimonials },
  { name: 'Gallery', section: sections.gallery },
  { name: 'Contact', section: sections.contact },
];

let menuData = {
  'Viennoiseries': [
    { name: 'Croissant', price: '$4.50', description: 'Flaky, buttery pastry with a rich, golden-brown crust.', image: '' },
    { name: 'Pain au Chocolat', price: '$5.00', description: 'Buttery, flaky dough wrapped around two sticks of dark chocolate.', image: '' },
    { name: 'Pain aux Raisins', price: '$5.00', description: 'Swirled pastry with custard and plump raisins.', image: '' },
    { name: 'Torsade', price: '$4.75', description: 'Twisted pastry with a delicate, sweet filling.', image: '' },
  ],
  'French Pastries': [
    { name: 'Éclair', price: '$6.00', description: 'Choux pastry filled with rich custard and topped with chocolate ganache.', image: '' },
    { name: 'Paris-Brest', price: '$7.50', description: 'Ring of choux pastry filled with a praline cream.', image: '' },
    { name: 'Tarte au Citron', price: '$6.50', description: 'A classic lemon tart with a tangy filling and crisp crust.', image: '' },
    { name: 'Religieuse', price: '$6.50', description: 'A two-tiered pastry with choux filled with a rich cream.', image: '' },
  ],
  'Fresh Breads': [
    { name: 'La Baguette', price: '$3.50', description: 'Long, thin loaf with a crispy crust and an airy crumb.', image: '' },
    { name: 'Pain de Campagne', price: '$8.00', description: 'Rustic, round loaf with a sourdough base and a tangy flavor.', image: '' },
    { name: 'Brioche', price: '$7.00', description: 'Sweet, rich bread made with eggs and butter for a fluffy texture.', image: '' },
    { name: 'Pain Complet', price: '$6.50', description: 'Made with whole wheat flour for a wholesome, dense loaf.', image: '' },
    { name: 'Pain au noix', price: '$7.50', description: 'A delicious bread with the rich flavor of walnuts.', image: '' },
  ],
  'Light Meals': [
    { name: 'Croque Monsieur', price: '$9.00', description: 'Grilled ham and cheese sandwich on brioche bread, topped with bechamel sauce.', image: '' },
    { name: 'Quiche Lorraine', price: '$8.00', description: 'Savory tart with bacon, eggs, and cheese in a flaky crust.', image: '' },
  ],
  'Coffee & Drinks': [
    { name: 'Espresso', price: '$2.50', description: 'A strong, concentrated shot of coffee.', image: '' },
    { name: 'Café au Lait', price: '$4.00', description: 'Strong coffee with steamed milk, a French classic.', image: '' },
    { name: 'Hot Chocolate', price: '$4.50', description: 'Rich, creamy hot chocolate made with high-quality cocoa.', image: '' },
  ]
};

// Assign random images to menu items
let imageIndex = 0;
for (const category in menuData) {
  menuData[category].forEach(item => {
    item.image = shuffledMenuImages[imageIndex % shuffledMenuImages.length];
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
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, rootMargin]);
  return isIntersecting;
};

const MobileMenu = ({ isOpen, onClose, onNavClick }) => (
  <div className={`fixed inset-0 z-50 bg-[#f5f5dc] transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
    <div className="flex justify-end p-4">
      <button onClick={onClose} aria-label="Close menu" className="text-[#080419] text-4xl">
        &times;
      </button>
    </div>
    <nav className="flex flex-col items-center justify-center space-y-8 h-full">
      {navItems.map(item => (
        <a
          key={item.name}
          href={`#${item.section}`}
          onClick={(e) => {
            e.preventDefault();
            onNavClick(item.section);
            onClose();
          }}
          className="text-4xl font-serif font-bold text-[#080419] hover:text-[#ebb207] transition-colors duration-200"
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
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-[#f5f5dc]/90 backdrop-blur-sm shadow-xl' : 'bg-transparent'}`}>
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
                  className={`text-[#080419] hover:text-[#ebb207] transition-colors duration-200 font-medium relative before:absolute before:bottom-0 before:left-1/2 before:w-0 before:h-0.5 before:bg-[#ebb207] before:transition-all before:duration-300 before:-translate-x-1/2 hover:before:w-full ${activeSection === item.section ? 'text-[#080419] font-bold before:w-full' : ''}`}
                >
                  {item.name}
                </a>
              ))}
            </div>
            <div className="md:hidden">
              <button onClick={() => setIsMobileMenuOpen(true)} aria-label="Open menu" className="text-[#080419] text-3xl">
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
      <div className="absolute inset-0 z-0 bg-cover bg-center md:bg-fixed"
        style={{ backgroundImage: `url('/IMG-20250902-WA0001 (1).jpg')`, transform: `translateY(${offsetY * 0.5}px)` }}>
        <div className="absolute inset-0 bg-[#f5f5dc]/50 backdrop-blur-sm"></div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10 py-32 sm:py-48 lg:py-64">
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold font-serif text-[#080419] leading-tight animate-fade-in-up">
          TASTE THE TRADITION<br />WITH EVERY BITE
        </h1>
        <p className="mt-4 text-lg md:text-xl text-[#080419] animate-fade-in-up animation-delay-300">
          Authentic French flavors, crafted with passion in Nairobi, Kenya.
        </p>
        <a
          href="#menu"
          className="mt-8 inline-block px-10 py-4 text-lg font-medium text-white bg-[#ebb207] rounded-full hover:bg-[#ebb207] transition-all duration-300 shadow-xl transform hover:-translate-y-1 hover:scale-105 animate-fade-in-up animation-delay-600"
        >
          Explore Our Menu
        </a>
      </div>
    </section>
  );
};

const About = ({ innerRef, isVisible }) => (
  <section ref={innerRef} id={sections.about} className={`py-20 relative overflow-hidden bg-[#f5f5dc] transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center space-y-12 md:space-y-0 md:space-x-12 relative z-10">
      <div className={`md:w-1/2 transform transition-all duration-500 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
        <img src="4.png" alt="Bakery interior" className="rounded-lg shadow-xl" />
      </div>
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
    <section ref={innerRef} id={sections.menu} className={`py-20 bg-[#f5f5dc] transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold font-serif text-[#080419]">Our Menu</h2>
        <p className="mt-4 text-lg text-[#080419]">
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
                  ? 'bg-[#080419] text-[#f5f5dc] shadow-lg scale-105'
                  : 'bg-transparent text-[#080419] border border-[#080419] hover:bg-[#080419] hover:text-[#f5f5dc] hover:scale-105'
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
                bg-white rounded-2xl shadow-xl overflow-hidden
                transform transition-all duration-500 hover:scale-[1.03]
                flex flex-col
              `}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <div className="relative overflow-hidden h-48 sm:h-56">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  onError={(e) => e.target.src = "https://placehold.co/400x300/6B4226/EEDFCC?text=Image+Not+Found"}
                />
              </div>
              <div className="p-6 text-left flex flex-col flex-grow">
                <h4 className="text-xl font-bold font-serif text-[#080419] mb-1">{item.name}</h4>
                <p className="text-sm text-gray-600 flex-grow">{item.description}</p>
                <div className="mt-4 text-right">
                  <span className="text-2xl font-bold text-[#ebb207]">{item.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = ({ innerRef, isVisible }) => {
  const testimonials = [
    { quote: "The best sourdough I've ever had! You can taste the quality and dedication in every slice.", author: "Jane M." },
    { quote: "Their croissants are simply divine. Flaky, buttery, and perfect with coffee.", author: "John K." },
    { quote: "Le Fournil's cinnamon rolls are a weekend tradition for my family. Absolutely delicious!", author: "Sarah P." },
  ];

  return (
    <section ref={innerRef} id={sections.testimonials} className={`py-20 bg-[#f5f5dc] transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#080419]">What Our Customers Say</h2>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className={`p-8 bg-[#f5f5dc] rounded-lg shadow-md flex flex-col items-center justify-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`} style={{ transitionDelay: `${index * 100}ms` }}>
              <p className="text-lg italic text-[#080419]">"{testimonial.quote}"</p>
              <p className="mt-4 text-sm font-semibold text-[#080419]">- {testimonial.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Gallery = ({ innerRef, isVisible }) => {
  const images = [
    "1.png",
    "2.png",
    "3.png",
    "4.png",
    "5.png",
    "6.png",
    "7.png",
    "8.png",
  ];

  return (
    <section ref={innerRef} id={sections.gallery} className={`py-20 bg-[#f5f5dc] transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#080419]">Our Creations</h2>
        <p className="mt-4 text-[#080419]">
          A glimpse into the art of our baking.
        </p>
        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((src, index) => (
            <div key={index} className={`overflow-hidden rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105 hover:shadow-xl ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`} style={{ transitionDelay: `${index * 100}ms` }}>
              <img src={src} alt={`Bakery Item ${index + 1}`} className="w-full h-auto" />
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
    // In a real application, you would send this data to an API
    console.log('Form Submitted:', formData);
    // Reset form after submission
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section ref={innerRef} id={sections.contact} className={`py-20 bg-[#f5f5dc] transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#080419]">Get in Touch</h2>
        <p className="mt-4 text-[#080419]">
          We would love to hear from you!
        </p>
        <div className="mt-8 flex flex-col items-center">
          <div className="mb-8 text-center text-[#080419]">
            <p className="font-semibold text-lg">Le Fournil Kenya</p>
            <p>Enterprise 45, Industrial Area</p>
            <p>Nairobi, Kenya</p>
            <p className="mt-2">Phone: <a href="tel:+254116000400" className="text-[#ebb207] hover:underline">0116 000 400</a></p>
          </div>
          <form onSubmit={handleSubmit} className="bg-[#f5f5dc] rounded-lg p-8 shadow-md max-w-lg w-full text-left">
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
            <button type="submit" className="w-full px-4 py-2 text-lg font-medium text-white bg-[#ebb207] rounded-md hover:bg-[#ebb207] transition-colors duration-300 shadow-lg">
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
        <a href="#" aria-label="Facebook" className="text-[#f5f5dc] hover:text-[#ebb207] transition-colors duration-200">
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M22.258 1H2.742C1.785 1 1 1.785 1 2.742v18.516c0 .957.785 1.742 1.742 1.742h9.584V14h-2.923v-3.417h2.923V8.5c0-2.887 1.76-4.475 4.364-4.475 1.246 0 2.31.092 2.622.133V7.27h-1.666c-1.31 0-1.564.622-1.564 1.536v2.103h3.48L19.46 14h-3.48v8.995h5.275c.957 0 1.742-.785 1.742-1.742V2.742c0-.957-.785-1.742-1.742-1.742z"/></svg>
        </a>
        <a href="#" aria-label="Instagram" className="text-[#f5f5dc] hover:text-[#ebb207] transition-colors duration-200">
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07c3.252.148 4.771 1.691 4.919 4.919.058 1.265.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.148 3.252-1.691 4.771-4.919 4.919-.058.058-1.265.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.07-1.646-.07-4.85s.012-3.584.07-4.85c.148-3.252 1.691-4.771 4.919-4.919.058-.058 1.265-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.435.204-6.73 2.617-6.934 6.934-.058 1.28-.072 1.688-.072 4.947s.014 3.667.072 4.947c.204 4.435 2.617 6.73 6.934 6.934 1.28.058 1.688.072 4.947.072s3.667-.014 4.947-.072c4.435-.204 6.73-2.617 6.934-6.934.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.204-4.435-2.617-6.73-6.934-6.934zM12 5.5c-3.584 0-6.5 2.916-6.5 6.5s2.916 6.5 6.5 6.5 6.5-2.916 6.5-6.5-2.916-6.5-6.5-6.5zm0 11.5c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm3.5-9.5c0 .829-.671 1.5-1.5 1.5s-1.5-.671-1.5-1.5.671-1.5 1.5-1.5 1.5.671 1.5 1.5z"/></svg>
        </a>
      </div>
      <div className="text-sm mb-4">
        <p>Enterprise 45 Industrial Area, Nairobi </p>
        <p>Phone: <a href="tel:+254116000400" className="text-[#f5f5dc] hover:text-[#ebb207] transition-colors duration-200">0116 000 400</a></p>
      </div>
      <p>&copy; {new Date().getFullYear()} Le Fournil. All Rights Reserved.</p>
      <p className="text-sm text-[#f5f5dc] mt-2">Crafted with passion in Kenya.</p>
    </div>
  </footer>
);

export default function Home() {
  const [activeSection, setActiveSection] = useState(sections.home);

  const aboutRef = useRef(null);
  const menuRef = useRef(null);
  const testimonialsRef = useRef(null);
  const galleryRef = useRef(null);
  const contactRef = useRef(null);

  const isAboutVisible = useOnScreen(aboutRef, '-100px');
  const isMenuVisible = useOnScreen(menuRef, '-100px');
  const isTestimonialsVisible = useOnScreen(testimonialsRef, '-100px');
  const isGalleryVisible = useOnScreen(galleryRef, '-100px');
  const isContactVisible = useOnScreen(contactRef, '-100px');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      let newActiveSection = sections.home;

      if (document.getElementById(sections.contact)?.offsetTop < scrollPosition) {
        newActiveSection = sections.contact;
      } else if (document.getElementById(sections.gallery)?.offsetTop < scrollPosition) {
        newActiveSection = sections.gallery;
      } else if (document.getElementById(sections.testimonials)?.offsetTop < scrollPosition) {
        newActiveSection = sections.testimonials;
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
      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          scroll-behavior: smooth;
        }
        body {
          font-family: 'Lato', sans-serif;
        }
        .font-serif {
          font-family: 'Playfair Display', serif;
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out;
        }
        .animation-delay-300 { animation-delay: 0.3s; }
        .animation-delay-600 { animation-delay: 0.6s; }
      `}} />
      <Header activeSection={activeSection} onNavClick={handleNavClick} />
      <main>
        <Hero />
        <About innerRef={aboutRef} isVisible={isAboutVisible} />
        <Menu innerRef={menuRef} isVisible={isMenuVisible} />
        <Testimonials innerRef={testimonialsRef} isVisible={isTestimonialsVisible} />
        <Gallery innerRef={galleryRef} isVisible={isGalleryVisible} />
        <Contact innerRef={contactRef} isVisible={isContactVisible} />
      </main>
      <Footer />
    </div>
  );
}