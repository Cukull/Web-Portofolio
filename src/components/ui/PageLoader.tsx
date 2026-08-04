import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Spinner } from '@/components/ui/reui-spinner';

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Kunci scroll saat animasi loading berlangsung
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Durasi loading awal (1200ms) sebelum slide-up dimulai
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = previousOverflow;
    }, 1200);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="page-loader-overlay"
          initial={{ y: 0 }}
          exit={{
            y: '-100%',
            transition: {
              duration: 0.85,
              ease: [0.76, 0, 0.24, 1], // Cubic-bezier mulus bergaya premium editorial
            },
          }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999999,
            backgroundColor: '#171717', // Background hitam karbon
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            userSelect: 'none',
          }}
        >
          {/* Konten tengah: Spinner + Teks nama & portfolio */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -24, transition: { duration: 0.35 } }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 22,
            }}
          >
            {/* Lingkaran dengan Spinner di tengah */}
            <div
              style={{
                width: 68,
                height: 68,
                borderRadius: '50%',
                background: 'rgba(198, 255, 52, 0.08)',
                border: '1.5px solid rgba(198, 255, 52, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 30px rgba(198, 255, 52, 0.15)',
              }}
            >
              <Spinner
                className="size-7"
                style={{
                  width: 28,
                  height: 28,
                  color: '#C6FF34',
                }}
              />
            </div>

            {/* Typography portofolio */}
            <div style={{ textAlign: 'center' }}>
              <p
                style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontSize: 18,
                  fontWeight: 800,
                  color: '#FAFAF7',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  margin: 0,
                }}
              >
                Mochamad Syukur
              </p>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 11.5,
                  fontWeight: 500,
                  color: '#707070',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  marginTop: 6,
                  marginBottom: 0,
                }}
              >
                Web Developer
              </p>
            </div>
          </motion.div>

          {/* Garis progres bawah berlaju dari kiri ke kanan */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 3,
              backgroundColor: '#C6FF34',
              transformOrigin: 'left',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
