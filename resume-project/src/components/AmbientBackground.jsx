import React from 'react';

const AmbientBackground = () => {
  return (
    <div style={styles.container}>
      <div style={{ ...styles.orb, ...styles.orb1 }} />
      <div style={{ ...styles.orb, ...styles.orb2 }} />
      <div style={{ ...styles.orb, ...styles.orb3 }} />
      <div style={styles.noiseOverlay} />
    </div>
  );
};

const styles = {
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    zIndex: -1, // Keep it strictly behind everything
    backgroundColor: 'var(--bg-main)',
  },
  orb: {
    position: 'absolute',
    borderRadius: '50%',
    filter: 'blur(100px)',
    opacity: 0.5,
    animation: 'floatOrb 15s infinite alternate ease-in-out',
    willChange: 'transform',
  },
  orb1: {
    top: '-10%',
    left: '-10%',
    width: '50vw',
    height: '50vw',
    background: 'radial-gradient(circle, var(--glow-1) 0%, rgba(0,0,0,0) 70%)',
    animationDelay: '0s',
  },
  orb2: {
    bottom: '-20%',
    right: '-10%',
    width: '60vw',
    height: '60vw',
    background: 'radial-gradient(circle, var(--glow-2) 0%, rgba(0,0,0,0) 70%)',
    animationDelay: '-5s',
  },
  orb3: {
    top: '40%',
    left: '40%',
    width: '40vw',
    height: '40vw',
    background: 'radial-gradient(circle, var(--btn-glow-1) 0%, rgba(0,0,0,0) 70%)',
    animationDelay: '-10s',
  },
  noiseOverlay: {
    position: 'absolute',
    top: 0, left: 0, width: '100%', height: '100%',
    opacity: 0.04,
    pointerEvents: 'none',
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
  }
};

export default AmbientBackground;
