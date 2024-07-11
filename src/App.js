import React, { useEffect, useState } from 'react';
import { scroller } from 'react-scroll';
import './style-nombre.css';
import './style-corazon.css';
import './App.scss'; // Asegúrate de que Tailwind esté configurado correctamente
import videoBola from './assets/bola-disc.mp4';
import videoPrincipal from './assets/15484549-hd_1920_1080_30fps.mp4';
import imgCorazones from './assets/Captura de pantalla 2024-07-08 202734.png';
import imgPared from './assets/pngtree-3d-illustration-of-a-neon-lit-brick-wall-picture-image_5829071.jpg';
import debounce from 'lodash/debounce';
import { Estrella } from './estrella';

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
    <video autoPlay muted loop controls={false} >
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
  const sections = ['section1', 'section2', 'section3', 'section4'];
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSection]);

  useEffect(() => {
    scroller.scrollTo(sections[currentSection], {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart'
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSection]);

  return (
    <>
      <VideoSection id="section1" videoSrc={videoPrincipal} containerClass="video-container lettersContainer">
        <Name letters="RENATA" />
      </VideoSection>

      <InfoSection id="section2" imgSrc={imgCorazones}>
        <Card className="misa-banco">
          𝒬𝓊𝑒 𝑒𝓈𝓉𝑜𝓈 𝟣𝟧 𝒶𝓃̃𝑜𝓈 𝓆𝓊𝑒 𝒽𝑜𝓎 𝒸𝑜𝓂𝒾𝑒𝓃𝓏𝑜 𝒶 𝓋𝒾𝓋𝒾𝓇 𝓎 𝒹𝑒 𝓁𝑜𝓈 𝒸𝓊𝒶𝓁𝑒𝓈 𝓃𝑜 𝓂𝑒 𝑜𝓁𝓋𝒾𝒹𝒶𝓇𝑒 𝒿𝒶𝓂𝒶𝓈 𝓈𝑒𝒶𝓃 𝑒𝓁 𝒹𝑒𝓈𝓅𝑒𝓇𝓉𝒶𝓇 𝒹𝑒 𝓊𝓃 𝓁𝒶𝓇𝑔𝑜 𝒹𝓊𝓁𝒸𝑒 𝒸𝒶𝓂𝒾𝓃𝑜 𝓅𝑜𝓇 𝓁𝒶 𝓋𝒾𝒹𝒶. 𝒮𝑒𝓇𝒶 𝓊𝓃 𝓅𝓁𝒶𝒸𝑒𝓇 𝒸𝑜𝓂𝓅𝒶𝓇𝓉𝒾𝓇 𝒸𝑜𝓃𝓉𝒾𝑔𝑜 𝑒𝓈𝓉𝑒 𝒻𝑒𝓁𝒾𝓏 𝒶𝒸𝑜𝓃𝓉𝑒𝒸𝒾𝓂𝒾𝑒𝓃𝓉𝑜
        </Card>
        <section class="portfolio-experiment">
          <a rel="noreferrer" target='_blank' href='https://maps.app.goo.gl/bqzcFiTJZ5hZwi9H8'>
            <span class="text">Como Llegar</span>
            <span class="line -right"></span>
            <span class="line -top"></span>
            <span class="line -left"></span>
            <span class="line -bottom"></span>
          </a>
        </section>
        <Card className="misa-banco">
          <div>𝓒𝒆𝓻𝒆𝓶𝓸𝓷𝓲𝓪</div>
          <div style={{ fontSize: '2rem' }}>𝟤𝟢</div>
          <div>𝒹𝑒 𝒥𝓊𝓁𝒾𝑜</div>
          <div>𝒶 𝓁𝒶𝓈 𝟣𝟫:𝟢𝟢 𝒽𝓈</div>
          <div>𝒫𝒶𝓇𝓇𝑜𝓆𝓊𝒾𝒶 𝒮𝒶𝓃 𝒥𝓊𝒶𝓃 𝐵𝑜𝓈𝒸𝑜</div>
          <div>𝒜𝓋. 𝑀𝒾𝓉𝓇𝑒 𝟥𝟣𝟤</div>
        </Card>
      </InfoSection>

      <VideoSection id="section3" videoSrc={videoBola} containerClass="video-container bola">
        <div className="cards-vertical">
          <Card className="info-fiesta ">
            Hay momentos inolvidables que se atesoran en el
            corazon para siempre, por esa razon,
            quiero que compartas conmigo este dia tan especial
            Será una noche para celebrar la vida, la amistad y el comienzo de nuevas aventuras.
            <div>Mis 15 Años</div>
          </Card>
          <section class="portfolio-experiment">
            <a rel="noreferrer" target='_blank' href='https://maps.app.goo.gl/SdjNsKU8BJt4Bw2Y8'>
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

      <InfoSection id="section4" imgSrc={imgPared}>
        <Card className="misa-banco">
          Necesitamos que confirmes tu presencia antes
          del Sábado 17 de Agosto
          <div class="heart ">
            <div class="heartbeat">✅</div>
            <div class="heartecho-left">✅</div>
            <a rel="noreferrer" target='_blank' href='https://forms.gle/sVCAKjkKd13YDwoeA' style={{ textDecoration: 'none', color: 'white' }}>
              <span class="text">Confirmar Presencia</span>
              </a>
            <div class="heartbeat">✅</div>
            <div class="heartecho-right">✅</div>
          </div>
        </Card>
        <Estrella />

        <Card className="misa-banco">
          El mejor regalo será tu presencia,
          pero si quieres tener un detalle,
          puedes hacerlo aqui
          <div class="heart">
            <div class="heartbeat">❤️</div>
            <div class="heartecho-left">❤️</div>
            Alias: renamolinaa
            <div class="heartbeat">❤️</div>
            <div class="heartecho-right">❤️</div>
          </div>
        </Card>
      </InfoSection>
    </>
  );
};

export default App;

