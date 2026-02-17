import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const customStyles = {
  ditherOverlay: {
    backgroundImage: 'radial-gradient(circle, #111 0.5px, transparent 0.5px)',
    backgroundSize: '2px 2px',
    opacity: 0.2,
    pointerEvents: 'none',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 9999,
    mixBlendMode: 'multiply',
    imageRendering: 'pixelated'
  },
  scanlines: {
    background: 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.1))',
    backgroundSize: '100% 4px',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 5,
    pointerEvents: 'none',
    opacity: 0.3
  },
  headerGradient: {
    background: 'linear-gradient(to bottom, #E6E4DD 0%, #D8D6D0 100%)'
  },
  footerGradient: {
    background: 'linear-gradient(to top, #E6E4DD 0%, #D8D6D0 100%)'
  },
  ditherPattern: {
    backgroundImage: 'radial-gradient(circle, #111 0.5px, transparent 0.5px)',
    backgroundSize: '2px 2px',
    opacity: 0.08,
    mixBlendMode: 'multiply'
  },
  gridOverlay: {
    backgroundImage: 'linear-gradient(#000 0.5px, transparent 0.5px), linear-gradient(90deg, #000 0.5px, transparent 0.5px)',
    backgroundSize: '20px 20px',
    imageRendering: 'pixelated',
    opacity: 0.15
  },
  pixelShiftAnimation: {
    animation: 'pixelShift 2s infinite'
  }
};

const DitherOverlay = () => (
  <div style={customStyles.ditherOverlay}></div>
);

const Scanlines = () => (
  <div style={customStyles.scanlines}></div>
);

const Wallpaper = () => (
  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
    <img 
      src="https://images.unsplash.com/photo-1477346611705-65d1883cee1e?q=80&w=2070&auto=format&fit=crop" 
      alt="Landscape" 
      className="w-full h-full object-cover opacity-40"
      style={{ filter: 'grayscale(100%) contrast(120%) brightness(0.9)', mixBlendMode: 'multiply' }}
    />
  </div>
);

const Header = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeString = time.toLocaleTimeString('en-US', { 
    hour12: true, 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit' 
  });

  return (
    <header 
      className="relative z-50 h-10 bg-[#E6E4DD] border-b border-black flex items-center justify-between px-4 uppercase text-xs tracking-widest select-none font-bold"
      style={customStyles.headerGradient}
    >
      <div className="absolute inset-0 pointer-events-none" style={customStyles.ditherPattern}></div>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 hover:text-[#FF4400] cursor-pointer">
          <i className="ph-bold ph-asterisk text-lg"></i>
          <span className="font-['DotGothic16',sans-serif] text-sm">SYSTEM_OS</span>
        </div>
        <nav className="flex gap-6 hidden sm:flex">
          <a href="#" className="hover:bg-black hover:text-white px-2 py-1 transition-colors">File</a>
          <a href="#" className="hover:bg-black hover:text-white px-2 py-1 transition-colors">Edit</a>
          <a href="#" className="hover:bg-black hover:text-white px-2 py-1 transition-colors">View</a>
          <a href="#" className="hover:bg-black hover:text-white px-2 py-1 transition-colors">Special</a>
        </nav>
      </div>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-[#FF4400]">
          <span className="animate-pulse">●</span>
          <span>REC</span>
        </div>
        <div className="flex items-center gap-2">
          <i className="ph-bold ph-wifi-high"></i>
          <span>NET: ON</span>
        </div>
        <div className="bg-black text-[#E6E4DD] px-3 py-1 font-['DotGothic16',sans-serif] rounded-lg">
          {timeString}
        </div>
      </div>
    </header>
  );
};

const ProfileWidget = () => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [position, setPosition] = useState({ x: 32, y: 32 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef({ startX: 0, startY: 0 });

  const handleMouseDown = (e) => {
    if (e.target.closest('.minimize-widget')) return;
    setIsDragging(true);
    dragRef.current = {
      startX: e.clientX - position.x,
      startY: e.clientY - position.y
    };
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragRef.current.startX,
        y: e.clientY - dragRef.current.startY
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  return (
    <div 
      className="absolute w-64 bg-[#E6E4DD] border border-black rounded-2xl overflow-hidden z-30"
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        boxShadow: '4px 4px 0px 0px rgba(0,0,0,0.2), 4px 3px 0px 0px rgba(0,0,0,0.06), 3px 4px 0px 0px rgba(0,0,0,0.06), 3px 3px 0px 0px rgba(0,0,0,0.12), 2px 2px 0px 0px rgba(0,0,0,0.08)'
      }}
    >
      <div 
        className="h-8 border-b border-black flex items-center justify-between pl-3 pr-1 bg-white select-none cursor-move"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-[#FF4400]"></div>
          <span className="font-bold text-xs uppercase tracking-wider">PROFILE</span>
        </div>
        <button 
          className="minimize-widget w-6 h-6 border border-black rounded-full bg-yellow-400 flex items-center justify-center hover:brightness-110 active:translate-y-0.5"
          onClick={() => setIsMinimized(!isMinimized)}
        >
          <i className="ph-bold ph-minus text-xs"></i>
        </button>
      </div>
      
      {!isMinimized && (
        <div className="p-4">
          <div className="w-full aspect-square bg-[#E6E4DD] border border-black rounded-2xl overflow-hidden relative mb-4">
            <img 
              src="https://images.unsplash.com/photo-1544256718-3bcf237f3974?q=80&w=2071&auto=format&fit=crop" 
              alt="Profile" 
              className="w-full h-full object-cover"
              style={{ filter: 'grayscale(100%)', mixBlendMode: 'multiply', opacity: 0.6 }}
            />
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle, #111 0.5px, transparent 0.5px)',
                backgroundSize: '2px 2px',
                opacity: 0.25,
                mixBlendMode: 'multiply'
              }}
            ></div>
          </div>
          
          <div className="bg-white border border-black rounded-xl p-3">
            <h3 className="font-bold text-xs uppercase tracking-wider mb-2 text-[#FF4400]">ABOUT_ME.txt</h3>
            <div className="text-xs font-mono space-y-1 text-gray-700">
              <p>&gt; Designer &amp; Developer</p>
              <p>&gt; Based in San Francisco</p>
              <p>&gt; Retro computing enthusiast</p>
              <p>&gt; Coffee connoisseur</p>
              <div className="mt-2 pt-2 border-t border-gray-300">
                <p className="text-[10px] text-gray-500">STATUS: ONLINE</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const FileRow = ({ icon, name, date, kind, size, iconClass = "ph-fill" }) => (
  <tr className="hover:bg-[#FF4400] hover:text-white group cursor-pointer select-none">
    <td className="py-3 px-4 flex items-center gap-3">
      <i className={`${iconClass} ${icon} text-xl group-hover:text-white text-[#FF4400]`}></i>
      <span className="group-hover:translate-x-1 transition-transform">{name}</span>
    </td>
    <td className="py-3 px-4 opacity-70 group-hover:opacity-100">{date}</td>
    <td className="py-3 px-4 opacity-70 group-hover:opacity-100">{kind}</td>
    <td className="py-3 px-4 opacity-70 group-hover:opacity-100">{size}</td>
  </tr>
);

const PortfolioWindow = () => {
  const [position, setPosition] = useState({ x: 160, y: 32 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef({ startX: 0, startY: 0 });

  const handleMouseDown = (e) => {
    if (!e.target.closest('.window-drag-handle')) return;
    setIsDragging(true);
    dragRef.current = {
      startX: e.clientX - position.x,
      startY: e.clientY - position.y
    };
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragRef.current.startX,
        y: e.clientY - dragRef.current.startY
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  const files = [
    { icon: 'ph-folder', name: '01_Synthesizer_Design', date: 'Today, 5:21 AM', kind: 'Folder', size: '--' },
    { icon: 'ph-folder', name: '02_Field_Recorder', date: 'Yesterday, 10:45 PM', kind: 'Folder', size: '--' },
    { icon: 'ph-file-text', name: 'README.md', date: 'Jan 12, 2024', kind: 'Markdown', size: '2 KB' },
    { icon: 'ph-image', name: 'Concept_Sketch_v4.png', date: 'Jan 10, 2024', kind: 'PNG Image', size: '2.4 MB' },
    { icon: 'ph-file-audio', name: 'demo_track_final.wav', date: 'Dec 28, 2023', kind: 'WAV Audio', size: '45 MB' },
    { icon: 'ph-file-code', name: 'main.js', date: 'Dec 28, 2023', kind: 'JavaScript', size: '12 KB' }
  ];

  return (
    <div 
      className="absolute w-[90%] sm:w-[800px] h-[600px] bg-[#E6E4DD] border border-black flex flex-col rounded-2xl overflow-hidden"
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        boxShadow: '4px 4px 0px 0px rgba(0,0,0,0.2), 4px 3px 0px 0px rgba(0,0,0,0.06), 3px 4px 0px 0px rgba(0,0,0,0.06), 3px 3px 0px 0px rgba(0,0,0,0.12), 2px 2px 0px 0px rgba(0,0,0,0.08)'
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="window-drag-handle h-8 border-b border-black flex items-center justify-between pl-3 pr-1 bg-white select-none cursor-move">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-[#FF4400]"></div>
          <span className="font-bold text-xs uppercase tracking-wider">/USER/CHARLIE/PORTFOLIO</span>
        </div>
        <div className="flex gap-1">
          <button className="w-6 h-6 border border-black rounded-full bg-yellow-400 flex items-center justify-center hover:brightness-110 active:translate-y-0.5">
            <i className="ph-bold ph-minus text-xs"></i>
          </button>
          <button className="w-6 h-6 border border-black rounded-full bg-[#FF4400] flex items-center justify-center hover:brightness-110 active:translate-y-0.5">
            <i className="ph-bold ph-corners-out text-xs"></i>
          </button>
          <button className="w-6 h-6 border border-black rounded-full bg-red-500 text-white flex items-center justify-center hover:brightness-110 active:translate-y-0.5">
            <i className="ph-bold ph-x text-xs"></i>
          </button>
        </div>
      </div>

      <div className="h-10 border-b border-black flex items-center px-3 gap-4 bg-[#E6E4DD] text-xs">
        <div className="flex gap-2">
          <button className="hover:text-[#FF4400]"><i className="ph-bold ph-caret-left text-lg"></i></button>
          <button className="hover:text-[#FF4400]"><i className="ph-bold ph-caret-right text-lg"></i></button>
        </div>
        <div className="h-5 w-px bg-[#FF4400] opacity-40"></div>
        <div className="flex gap-4 font-bold">
          <button className="flex items-center gap-2 border-b border-[#FF4400] pb-0.5">
            <i className="ph-bold ph-list-dashes"></i> LIST
          </button>
          <button className="flex items-center gap-2 text-gray-500 hover:text-black">
            <i className="ph-bold ph-squares-four"></i> GRID
          </button>
        </div>
        <div className="flex-1"></div>
        <div className="text-[10px] text-gray-500 font-mono">
          4 ITEMS, 230 MB AVAILABLE
        </div>
      </div>

      <div className="flex-1 overflow-auto bg-[#F2F0EB]">
        <table className="w-full text-xs text-left border-collapse">
          <thead className="bg-[#E6E4DD] sticky top-0 border-b border-black">
            <tr>
              <th className="py-2 px-4 border-r border-black/30 font-bold w-1/2 cursor-pointer hover:bg-white transition-colors">
                NAME <i className="ph-bold ph-caret-down inline ml-1"></i>
              </th>
              <th className="py-2 px-4 border-r border-black/30 font-bold w-1/4 cursor-pointer hover:bg-white transition-colors">
                DATE MODIFIED
              </th>
              <th className="py-2 px-4 border-r border-black/30 font-bold w-1/8 cursor-pointer hover:bg-white transition-colors">
                KIND
              </th>
              <th className="py-2 px-4 font-bold w-1/8 cursor-pointer hover:bg-white transition-colors">
                SIZE
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/10 font-mono text-sm">
            {files.map((file, index) => (
              <FileRow key={index} {...file} />
            ))}
            <tr className="h-full">
              <td colSpan="4"></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="h-6 border-t border-black bg-[#E6E4DD] flex items-center justify-between px-2 text-[10px] uppercase font-bold text-gray-500">
        <span>Path: /Users/Charlie/Work/Portfolio/</span>
        <div className="flex gap-2">
          <span className="text-[#FF4400]">RW-R--R--</span>
          <span>UTF-8</span>
        </div>
      </div>
    </div>
  );
};

const DesktopIcon = ({ icon, label, iconClass = "ph-fill", isActive = false, hasGlow = false }) => (
  <div className="group flex flex-col items-center gap-2 cursor-pointer w-full text-center relative">
    {hasGlow && (
      <>
        <div className="absolute inset-0 bg-[#FF4400] opacity-20 blur-lg rounded-2xl animate-pulse"></div>
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, #FF4400 0.5px, transparent 0.5px)',
            backgroundSize: '3px 3px',
            opacity: 0.15,
            animation: 'pixelShift 2s infinite'
          }}
        ></div>
      </>
    )}
    <div 
      className={`w-16 h-16 ${isActive ? 'bg-[#E6E4DD]' : 'bg-white'} border border-black flex items-center justify-center group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-active:translate-y-1 group-active:translate-x-1 group-active:shadow-none transition-all rounded-2xl relative z-10 overflow-hidden`}
      style={{
        boxShadow: '2px 2px 0px 0px rgba(0,0,0,0.25), 2px 1px 0px 0px rgba(0,0,0,0.08), 1px 2px 0px 0px rgba(0,0,0,0.08), 1px 1px 0px 0px rgba(0,0,0,0.15)'
      }}
    >
      {icon === 'profile' ? (
        <>
          <div 
            className="absolute inset-0 bg-cover"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1544256718-3bcf237f3974?q=80&w=2071&auto=format&fit=crop')",
              filter: 'grayscale(100%)',
              mixBlendMode: 'multiply',
              opacity: 0.5
            }}
          ></div>
          <i className={`${iconClass} ph-user-circle text-3xl relative z-10 opacity-70`}></i>
        </>
      ) : (
        <i className={`${iconClass} ${icon} text-3xl ${isActive ? 'text-[#FF4400]' : 'opacity-70'}`}></i>
      )}
    </div>
    <span 
      className={`${isActive ? 'bg-white text-black border border-black' : 'bg-black text-white'} text-[10px] px-1 py-0.5 font-bold uppercase tracking-wide group-hover:bg-[#FF4400] group-hover:text-white ${isActive ? 'group-hover:border-[#FF4400]' : ''} relative z-10`}
    >
      {label}
    </span>
  </div>
);

const ClippyAssistant = () => (
  <div className="absolute bottom-16 left-4 z-50 flex flex-col items-start gap-2">
    <div 
      className="relative bg-white border border-black px-3 py-2 rounded-2xl"
      style={{
        boxShadow: '2px 2px 0px 0px rgba(0,0,0,0.25), 2px 1px 0px 0px rgba(0,0,0,0.08), 1px 2px 0px 0px rgba(0,0,0,0.08), 1px 1px 0px 0px rgba(0,0,0,0.15)'
      }}
    >
      <p className="text-xs font-mono whitespace-nowrap">How about checking out some PROJECTS first?</p>
      <div 
        className="absolute -bottom-2 left-4"
        style={{
          width: 0,
          height: 0,
          borderLeft: '6px solid transparent',
          borderRight: '6px solid transparent',
          borderTop: '8px solid black'
        }}
      ></div>
      <div 
        className="absolute left-4"
        style={{
          width: 0,
          height: 0,
          borderLeft: '6px solid transparent',
          borderRight: '6px solid transparent',
          borderTop: '8px solid white',
          bottom: '-7px'
        }}
      ></div>
    </div>
    <div className="w-16 h-20 relative ml-2">
      <svg viewBox="0 0 64 80" className="w-full h-full" style={{ filter: 'contrast(1.2)' }}>
        <path d="M32 10 L32 55 Q32 65 40 65 Q48 65 48 55 L48 20" fill="none" stroke="#666" strokeWidth="3" />
        <path d="M48 20 L48 55 Q48 70 32 70 Q16 70 16 55 L16 15 Q16 8 22 8 Q28 8 28 15 L28 50" fill="none" stroke="#999" strokeWidth="2.5" />
        <circle cx="26" cy="30" r="4" fill="white" stroke="#111" strokeWidth="1" />
        <circle cx="26" cy="30" r="2" fill="#FF4400" />
        <circle cx="38" cy="30" r="4" fill="white" stroke="#111" strokeWidth="1" />
        <circle cx="38" cy="30" r="2" fill="#FF4400" />
        <path d="M26 38 Q32 42 38 38" fill="none" stroke="#111" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M22 26 L30 24" stroke="#111" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M42 26 L34 24" stroke="#111" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #111 0.5px, transparent 0.5px)',
          backgroundSize: '2px 2px',
          opacity: 0.15,
          mixBlendMode: 'multiply'
        }}
      ></div>
    </div>
  </div>
);

const Footer = () => (
  <footer 
    className="h-12 border-t border-black bg-[#E6E4DD] flex items-center justify-between px-4 z-50 relative"
    style={customStyles.footerGradient}
  >
    <div className="absolute inset-0 pointer-events-none" style={customStyles.ditherPattern}></div>
    <div className="flex items-center gap-4">
      <button className="h-8 px-3 bg-black text-white flex items-center justify-center hover:bg-[#FF4400] transition-colors font-bold text-2xl rounded-lg">
        +
      </button>
      <div className="flex gap-2">
        <div 
          className="w-8 h-8 border border-black bg-white flex items-center justify-center hover:bg-[#FF4400] hover:text-white cursor-pointer active:translate-y-[2px] active:shadow-none transition-all rounded-xl"
          style={{
            boxShadow: '2px 2px 0px 0px rgba(0,0,0,0.25), 2px 1px 0px 0px rgba(0,0,0,0.08), 1px 2px 0px 0px rgba(0,0,0,0.08), 1px 1px 0px 0px rgba(0,0,0,0.15)'
          }}
        >
          <i className="ph-bold ph-terminal-window opacity-70"></i>
        </div>
        <div 
          className="w-8 h-8 border border-black bg-[#FF4400] text-white flex items-center justify-center hover:bg-black cursor-pointer active:translate-y-[2px] active:shadow-none transition-all rounded-xl"
          style={{
            boxShadow: '2px 2px 0px 0px rgba(0,0,0,0.25), 2px 1px 0px 0px rgba(0,0,0,0.08), 1px 2px 0px 0px rgba(0,0,0,0.08), 1px 1px 0px 0px rgba(0,0,0,0.15)'
          }}
        >
          <i className="ph-bold ph-globe opacity-70"></i>
        </div>
        <div 
          className="w-8 h-8 border border-black bg-white flex items-center justify-center hover:bg-[#FF4400] hover:text-white cursor-pointer active:translate-y-[2px] active:shadow-none transition-all rounded-xl"
          style={{
            boxShadow: '2px 2px 0px 0px rgba(0,0,0,0.25), 2px 1px 0px 0px rgba(0,0,0,0.08), 1px 2px 0px 0px rgba(0,0,0,0.08), 1px 1px 0px 0px rgba(0,0,0,0.15)'
          }}
        >
          <i className="ph-bold ph-music-notes opacity-70"></i>
        </div>
      </div>
    </div>

    <div 
      className="hidden sm:flex items-center border border-black bg-white px-2 py-1 gap-3 rounded-2xl"
      style={{
        boxShadow: '2px 2px 0px 0px rgba(0,0,0,0.25), 2px 1px 0px 0px rgba(0,0,0,0.08), 1px 2px 0px 0px rgba(0,0,0,0.08), 1px 1px 0px 0px rgba(0,0,0,0.15)'
      }}
    >
      <div className="w-6 h-6 bg-[#FF4400] flex items-center justify-center text-white animate-spin-slow">
        <i className="ph-fill ph-cassette-tape opacity-70"></i>
      </div>
      <div className="flex flex-col leading-none">
        <span className="text-[10px] font-bold uppercase">Now Playing</span>
        <span className="text-[10px] font-mono truncate w-32">Radiohead - 15 Step</span>
      </div>
      <div className="flex gap-1">
        <button className="hover:text-[#FF4400]"><i className="ph-fill ph-play opacity-70"></i></button>
        <button className="hover:text-[#FF4400]"><i className="ph-fill ph-skip-forward opacity-70"></i></button>
      </div>
    </div>
  </footer>
);

const HomePage = () => {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      :root {
        --bg-color: #D8D6D0;
        --window-bg: #E6E4DD;
        --te-orange: #FF4400;
        --te-black: #111111;
        --te-grid: rgba(0, 0, 0, 0.15);
      }

      body {
        font-family: 'IBM Plex Mono', 'Courier Prime', 'Courier New', monospace;
        cursor: crosshair;
        overflow: hidden;
        background-color: var(--bg-color);
        color: var(--te-black);
        -webkit-font-smoothing: none;
      }

      ::selection {
        background: var(--te-orange);
        color: white;
      }

      ::-webkit-scrollbar {
        width: 12px;
        background: var(--window-bg);
        border-left: 1px solid var(--te-black);
      }
      ::-webkit-scrollbar-thumb {
        background: var(--te-black);
        border: 2px solid var(--window-bg);
      }
      ::-webkit-scrollbar-button {
        background: var(--te-black);
        height: 12px;
      }

      @keyframes pixelShift {
        0%, 100% { transform: translate(0, 0); opacity: 0.3; }
        25% { transform: translate(1px, -1px); opacity: 0.4; }
        50% { transform: translate(-1px, 1px); opacity: 0.25; }
        75% { transform: translate(1px, 1px); opacity: 0.35; }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <>
      <DitherOverlay />
      <Scanlines />
      <Wallpaper />
      <Header />
      
      <main className="relative z-10 flex-1 p-6 flex">
        <ProfileWidget />
        
        <div className="flex-1 relative">
          <PortfolioWindow />
        </div>

        <div className="w-24 sm:w-32 flex flex-col gap-8 items-center pt-8 z-20">
          <DesktopIcon icon="ph-hard-drives" label="Macintosh HD" />
          <DesktopIcon icon="ph-folder-notch-open" label="Projects" isActive={true} hasGlow={true} />
          <DesktopIcon icon="profile" label="Profile_Img" isActive={true} />
          <div className="mt-auto mb-4 w-full flex justify-center">
            <DesktopIcon icon="ph-trash" label="Trash" />
          </div>
        </div>
      </main>

      <ClippyAssistant />
      <Footer />

      <div 
        className="absolute inset-0 pointer-events-none z-[5]"
        style={customStyles.gridOverlay}
      ></div>
    </>
  );
};

const App = () => {
  return (
    <Router basename="/">
      <div className="h-screen w-screen relative overflow-hidden flex flex-col">
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;