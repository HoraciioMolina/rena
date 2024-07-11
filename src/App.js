import React, { useEffect, useState } from 'react';
import { scroller } from 'react-scroll';
import './style-nombre.css';
import './App.scss'; // Asegúrate de que Tailwind esté configurado correctamente
import videoBola from './assets/bola-disc.mp4';
import videoPrincipal from './assets/15484549-hd_1920_1080_30fps.mp4';
import imgCorazones from './assets/Captura de pantalla 2024-07-08 202734.png';
import imgQuince from './assets/frame-6775244_1280.png';
import debounce from 'lodash/debounce';

const Name = ({ letters }) => {
  useEffect(() => {
    const spans = document.querySelectorAll('.word span');

    spans.forEach((span, idx) => {
      span.addEventListener('click', (e) => {
        e.target.classList.add('active');
      });
      span.addEventListener('animationend', (e) => {
        e.target.classList.remove('active');
      });

      // Initial animation
      setTimeout(() => {
        span.classList.add('active');
      }, 750 * (idx + 1));
    });

    // Cleanup event listeners on unmount
    return () => {
      spans.forEach((span) => {
        span.removeEventListener('click', () => { });
        span.removeEventListener('animationend', () => { });
      });
    };
  }, []);

  return (
    <div className="caption name">
      <div className="word">
        {letters.split('').map((letter, idx) => (
          <span key={idx}>{letter}</span>
        ))}
      </div>
    </div>
  );
};

const VideoSection = ({ id, videoSrc, children, containerClass }) => (
  <div name={id} className={containerClass}>
    {children}
    <video autoPlay muted loop>
      <source src={videoSrc} type="video/mp4" />
    </video>
  </div>
);

const InfoSection = ({ id, children, imgSrc }) => (
  <div name={id} className="segundo">
    <div className="cardsInfoMedio">
      {children}
    </div>
    <img src={imgSrc} alt="Background" />
  </div>
);



const Card = ({ className, children }) => (
  <div className={`card ${className}`}>
    {children}
  </div>
);

const App = () => {
  const sections = ['section1', 'section2', 'section3'];
  const [currentSection, setCurrentSection] = useState(0);

  // Función debounce para manejar el desplazamiento
  const handleScroll = debounce((event) => {
    event.preventDefault();

    if (event.deltaY > 0) {
      if (currentSection < sections.length - 1) {
        setCurrentSection(currentSection + 1);
      }
    } else {
      if (currentSection > 0) {
        setCurrentSection(currentSection - 1);
      }
    }
  }, 50); // Ajusta el tiempo de debounce según sea necesario

  useEffect(() => {
    window.addEventListener('wheel', handleScroll);
    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, [currentSection]);

  useEffect(() => {
    scroller.scrollTo(sections[currentSection], {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart'
    });
  }, [currentSection]);

  return (
    <>
      <VideoSection id="section1" videoSrc={videoPrincipal} containerClass="video-container lettersContainer">
        <Name letters="RENATA" />
      </VideoSection>

      <InfoSection id="section2" imgSrc={imgCorazones}>
        <Card className="misa-banco">
          Que estos 15 años que hoy comienzo a vivir
          y de los cuales no me olvidare jamas
          sean el despertar de un largo
          dulce camino por la vida.
          Sera un placer compartir contigo
          este feliz acontecimiento
        </Card>
        <section class="portfolio-experiment">
          <a target='_blank' href='https://maps.app.goo.gl/bqzcFiTJZ5hZwi9H8'>
            <span class="text">Como Llegar</span>
            <span class="line -right"></span>
            <span class="line -top"></span>
            <span class="line -left"></span>
            <span class="line -bottom"></span>
          </a>
        </section>
        <Card className="misa-banco">
          <div>Ceremonia</div>
          <div style={{ fontSize: '2rem' }}>20</div>
          <div>de Julio</div>
          <div>a las 19:00 hs</div>
          <div>Parroquia San Juan Bosco</div>
          <div>Av. Mitre 312</div>
        </Card>
      </InfoSection>

      <VideoSection id="section3" videoSrc={videoBola} containerClass="video-container bola">
        <div className="cards-vertical">
          <Card className="info-fiesta ">
          Después de la Misa, los invitamos a unirse la Fiesta. Será una noche para celebrar la vida, la amistad y el comienzo de nuevas aventuras.
            Hay momentos inolvidables que se atesoran en el
              corazon para siempre, por esa razon,
              quiero que compartas conmigo este dia tan especial
            <div>Mis 15 Años</div>
          </Card>
          <section class="portfolio-experiment">
          <a target='_blank' href='https://maps.app.goo.gl/SdjNsKU8BJt4Bw2Y8'>
            <span class="text">Como Llegar</span>
            <span class="line -right"></span>
            <span class="line -top"></span>
            <span class="line -left"></span>
            <span class="line -bottom"></span>
          </a>
        </section>
          <Card className="info-fiesta ">
          <div>Fiesta</div>
          <div style={{ fontSize: '3rem' }}>7</div>
          <div>de Septiembre</div>
          <div>22 hs / Salon Conticello</div>
          <div>Dress code: Elegante </div>
          <div>Ruta 9 kilometro 1301</div>
          </Card>
          
        </div>
      </VideoSection>
    </>
  );
};

export default App;

