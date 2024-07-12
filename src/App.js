import React, { useEffect, useRef, useState } from 'react';
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

import audio1 from './assets/Ed Sheeran - Photograph Lyrics .mp3'; // Importa tus archivos de audio
import audio2 from './assets/cach.mp3'; // Importa tus archivos de audio

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

const VideoSection = ({ id, videoSrc, children, containerClass }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener('contextmenu', (event) => {
        event.preventDefault();
      });
    }

    // Cleanup the event listener on component unmount
    return () => {
      if (video) {
        video.removeEventListener('contextmenu', (event) => {
          event.preventDefault();
        });
      }
    };
  }, []);

  return (
    <div name={id} className={containerClass}>
      {children}
      <video ref={videoRef} autoPlay muted loop controls={false}>
        <source src={videoSrc} type="video/mp4" />
      </video>
    </div>
  );
};

const InfoSection = ({ id, children, imgSrc }) => (
  <div name={id} className="segundo">
    <div className="cardsInfoMedio">
      {children}
    </div>
    <img src={imgSrc} alt="Background" />
  </div>
);

const Card = ({ className, children }) => (
  <div className={`card ${className} playwrite-cu-letra-cursiva`}>
    {children}
  </div>
);

const App = () => {
  const sections = ['section1', 'section2', 'section3', 'section4'];
  const [currentSection, setCurrentSection] = useState(0);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudio, setCurrentAudio] = useState(-1);

  const audioFiles = [audio1, audio2]; // Configura las secciones con los audios correspondientes

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

  const verifiedAudioFunc = () => {
    if (currentSection > 1) {
      return 1;
    } else {
      return 0;
    }
  }; 

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
    }
  }, []);

  
  useEffect(() => {
    window.addEventListener('wheel', handleScroll);
    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSection]);


  const reproducirAudio = () => {
    // Reproduce el audio correspondiente a la sección actual si ya ha sido iniciado
    if (audioRef.current) {
      const verifiedAudio = verifiedAudioFunc(); 
        if(currentAudio !== verifiedAudio ) {          
          audioRef.current.src = audioFiles[verifiedAudio];
          audioRef.current.play().then(() => { 
            console.log("audio diferente", currentAudio, verifiedAudio);
          setCurrentAudio(verifiedAudio);
          }).catch((error) => {
            console.log('Error al reproducir audio:', error);
          });
        }
    }
  };

  useEffect(() => {
    scroller.scrollTo(sections[currentSection], {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart'
    });
    reproducirAudio()
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSection]);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((error) => {
          console.log('Error al reproducir audio:', error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleUserInteraction = () => {
    console.log(audioRef.current, isPlaying)
    if (audioRef.current && !isPlaying) {
      audioRef.current.src = audioFiles[0];
      audioRef.current.play();
      setCurrentAudio(0)
      setIsPlaying(true);
    }
  };

  return (
    <div onClick={handleUserInteraction}>
      <audio ref={audioRef} loop />
      <button onClick={toggleAudio} className="floating-button">
        {isPlaying ? '🔈 Silenciar' : '🔇 Activar sonido'}
      </button>
      <VideoSection id="section1" videoSrc={videoPrincipal} containerClass="video-container lettersContainer">
        <Name letters="RENATA" />
      </VideoSection>

      <InfoSection id="section2" imgSrc={imgCorazones}>
        <Card className="misa-banco playwrite-cu-letra-cursiva">
          Que estos 10 años que hoy comienzo a vivir y de los cuales no me olvidare jamas, 
          sean el despertar de un largo y dulce camino por la vida.
          Sera un placer compartir contigo este feliz acontecimiento.
        </Card>
        <section className="portfolio-experiment playwrite-cu-letra-cursiva">
          <a rel="noreferrer" target='_blank' href='https://maps.app.goo.gl/bqzcFiTJZ5hZwi9H8'>
            <span className="text">Como Llegar</span>
            <span className="line -right"></span>
            <span className="line -top"></span>
            <span className="line -left"></span>
            <span className="line -bottom"></span>
          </a>
        </section>
        <Card className="misa-banco playwrite-cu-letra-cursiva">
          <div style={{ fontSize: 'xx-large' }}>Ceremonia</div>
          <div style={{ fontSize: '2rem' }}>20</div>
          <div>de Julio</div>
          <div>a las 19hs</div>
          <div>Parroquia San Juan Bosco</div>
          <div>Av. Mitre 312</div>
        </Card>
      </InfoSection>

      <VideoSection id="section3" videoSrc={videoBola} containerClass="video-container bola">
        <div className="cards-vertical">
          <Card className="info-fiesta playwrite-cu-letra-cursiva">
            Hay momentos inolvidables que se atesoran en el
            corazon para siempre, por esa razon,
            quiero que compartas conmigo este dia tan especial
            Será una noche para celebrar la vida, la amistad y el comienzo de
            nuevas aventuras.
            <div>Mis 15 Años</div>
          </Card>
          <section className="portfolio-experiment playwrite-cu-letra-cursiva">
            <a rel="noreferrer" target='_blank' href='https://maps.app.goo.gl/SdjNsKU8BJt4Bw2Y8'>
              <span className="text">Como Llegar</span>
              <span className="line -right"></span>
              <span className="line -top"></span>
              <span className="line -left"></span>
              <span className="line -bottom"></span>
            </a>
          </section>
          <Card className="info-fiesta playwrite-cu-letra-cursiva">
            <div style={{ fontSize: 'xx-large' }}>Fiesta</div>
            <div style={{ fontSize: '3rem' }}>7</div>
            <div>de Septiembre</div>
            <div>22hs / Salon Conticello</div>
            <div>Dress code: Elegante </div>
            <div>Fiesta Temática</div>
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
            Alias: RENAMOLINAA
            <div class="heartbeat">❤️</div>
            <div class="heartecho-right">❤️</div>
          </div>
        </Card>
      </InfoSection>
    </div>
  );
};

export default App;
