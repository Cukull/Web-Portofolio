import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ref, onValue, runTransaction } from 'firebase/database';
import { db } from '../../lib/firebase';

interface ReactionWidgetProps {
  imageId: string;
  position?: 'bottom-right' | 'bottom-left';
}

const EMOJI_OPTIONS = ['❤️', '🔥'];

export default function ReactionWidget({ imageId, position = 'bottom-right' }: ReactionWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Cek apakah user pernah like sebelumnya di perangkat ini
    const savedEmoji = localStorage.getItem(`reaction_v2_${imageId}`);
    if (savedEmoji) {
      setSelectedEmoji(savedEmoji);
    }
    
    // Listen ke Firebase Realtime Database
    const likesRef = ref(db, `reactions/${imageId}/counts`);
    const unsubscribe = onValue(likesRef, (snapshot) => {
      const val = snapshot.val();
      setCounts(val || {});
    }, (error) => {
      console.error("Firebase error:", error);
    });

    return () => unsubscribe();
  }, [imageId]);

  const handleSelect = async (emoji: string) => {
    const oldEmoji = selectedEmoji;

    if (oldEmoji === emoji) {
      // Unlike (Batalkan like)
      setSelectedEmoji(null);
      localStorage.removeItem(`reaction_v2_${imageId}`);
      
      // Optimistic update
      setCounts(prev => ({
        ...prev,
        [emoji]: Math.max(0, (prev[emoji] || 0) - 1)
      }));

      const emojiRef = ref(db, `reactions/${imageId}/counts/${emoji}`);
      await runTransaction(emojiRef, (current) => (current || 0) - 1).catch(console.error);
    } else {
      // Pindah vote atau Vote baru
      setSelectedEmoji(emoji);
      localStorage.setItem(`reaction_v2_${imageId}`, emoji);

      // Optimistic update
      setCounts(prev => ({
        ...prev,
        ...(oldEmoji ? { [oldEmoji]: Math.max(0, (prev[oldEmoji] || 0) - 1) } : {}),
        [emoji]: (prev[emoji] || 0) + 1
      }));

      // Jika sebelumnya sudah vote, kurangi vote lama
      if (oldEmoji) {
        const oldRef = ref(db, `reactions/${imageId}/counts/${oldEmoji}`);
        runTransaction(oldRef, (current) => (current || 0) - 1).catch(console.error); // fire and forget
      }

      // Tambah vote baru
      const newRef = ref(db, `reactions/${imageId}/counts/${emoji}`);
      await runTransaction(newRef, (current) => (current || 0) + 1).catch(console.error);
    }
    setIsOpen(false);
  };

  if (!mounted) return null;

  const positionStyles: React.CSSProperties = position === 'bottom-right' 
    ? { bottom: '16px', right: '16px' }
    : { bottom: '16px', left: '16px' };

  // Daftar emoji yang memiliki count > 0 (diurutkan berdasarkan jumlah terbanyak)
  const activeEmojis = Object.entries(counts)
    .filter(([_, count]) => count > 0)
    .sort((a, b) => b[1] - a[1]);

  return (
    <div 
      style={{
        position: 'absolute',
        zIndex: 20,
        ...positionStyles,
        display: 'flex',
        alignItems: 'center',
        gap: '6px'
      }}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Pills untuk emoji yang sudah ada */}
      <AnimatePresence>
        {activeEmojis.map(([emoji, count]) => {
          const isSelected = selectedEmoji === emoji;
          return (
            <motion.button
              key={emoji}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSelect(emoji)}
              style={{
                background: isSelected ? 'rgba(240,240,240,0.9)' : 'rgba(255,255,255,0.85)',
                backdropFilter: 'blur(8px)',
                border: isSelected ? '1px solid #171717' : '1px solid rgba(0,0,0,0.05)',
                borderRadius: '999px',
                padding: '4px 10px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                cursor: 'pointer',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                fontFamily: "'Inter', sans-serif",
                fontSize: '12px',
                fontWeight: 600,
                color: '#171717',
              }}
            >
              <span style={{ fontSize: '14px' }}>{emoji}</span>
              <span>{count}</span>
            </motion.button>
          );
        })}
      </AnimatePresence>

      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        
        {/* Expanded Options */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              style={{
                position: 'absolute',
                bottom: '100%',
                paddingBottom: '12px', // Invisible bridge to prevent mouseLeave
                display: 'flex',
                justifyContent: 'center',
                zIndex: 10,
              }}
            >
              <div style={{
                display: 'flex',
                gap: '8px',
                background: 'rgba(255,255,255,0.9)',
                backdropFilter: 'blur(8px)',
                padding: '8px 12px',
                borderRadius: '999px',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(0,0,0,0.05)',
              }}>
                {EMOJI_OPTIONS.map((emoji) => (
                  <motion.button
                    key={emoji}
                    whileHover={{ scale: 1.3, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleSelect(emoji)}
                    style={{
                      background: 'none',
                      border: 'none',
                      fontSize: '20px',
                      cursor: 'pointer',
                      padding: 0,
                      margin: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      filter: selectedEmoji && selectedEmoji !== emoji ? 'grayscale(100%) opacity(50%)' : 'none',
                      transition: 'filter 0.2s',
                    }}
                    title={`React with ${emoji}`}
                  >
                    {emoji}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Add Reaction Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onMouseEnter={() => setIsOpen(true)}
          onClick={() => setIsOpen(!isOpen)}
          style={{
            background: 'rgba(255,255,255,0.85)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(0,0,0,0.05)',
            borderRadius: '999px',
            width: '28px',
            height: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            color: '#171717',
          }}
          aria-label="Add reaction"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </motion.button>
      </div>
    </div>
  );
}
