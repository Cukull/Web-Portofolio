import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Spinner } from '@/components/ui/reui-spinner';

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Hapus instant SSR background setelah PageLoader React terpasang (mencegah FOUT/flash)
    const instantBg = document.getElementById('instant-loader-bg');
    if (instantBg) {
      instantBg.remove();
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Durasi loading 3500ms agar status sempat terbaca tenang sebelum overlay bergerak
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = previousOverflow;
    }, 3500);

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
            y: '-110%',
            transition: {
              duration: 1.35, // Transisi slide-up lebih lambat dan megah (1.35 detik)
              ease: [0.76, 0, 0.24, 1], // Editorial slide-up curve
            },
          }}
          style={{
            position: 'fixed',
            top: -10,
            left: -10,
            right: -10,
            bottom: -10,
            width: 'calc(100vw + 20px)',
            height: 'calc(100vh + 20px)',
            margin: 0,
            padding: 0,
            zIndex: 9999999,
            backgroundColor: '#0a0a0a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            userSelect: 'none',
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {/* Konten Tengah: Minimalis, bersih, 3 baris status */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
              width: '100%',
              maxWidth: 300,
              padding: '0 20px',
            }}
          >
            {/* Baris 1: Checking availability... */}
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <Spinner
                style={{
                  width: 14,
                  height: 14,
                  color: '#737373', // neutral-500
                  flexShrink: 0,
                }}
              />
              <span style={{ color: '#A3A3A3', fontSize: 13.5, letterSpacing: '-0.01em' }}>
                Checking availability...
              </span>
            </motion.div>

            {/* Baris 2: Connected — syncing data */}
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.9 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <Spinner
                style={{
                  width: 14,
                  height: 14,
                  color: '#E5E7EB', // neutral-200
                  flexShrink: 0,
                }}
              />
              <span style={{ fontSize: 13.5, letterSpacing: '-0.01em' }}>
                <span style={{ color: '#FFFFFF', fontWeight: 500 }}>Connected</span>
                <span style={{ color: '#A3A3A3' }}> — syncing data</span>
              </span>
            </motion.div>

            {/* Baris 3: Reconnecting — attempt 3 of 5 */}
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1.7 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <Spinner
                style={{
                  width: 14,
                  height: 14,
                  color: '#E5E7EB', // neutral-200
                  flexShrink: 0,
                }}
              />
              <span style={{ fontSize: 13.5, letterSpacing: '-0.01em' }}>
                <span style={{ color: '#FFFFFF', fontWeight: 500 }}>Reconnecting</span>
                <span style={{ color: '#A3A3A3' }}> — attempt 3 of 5</span>
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
