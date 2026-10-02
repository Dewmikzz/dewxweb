import React, {
  useRef,
  useState,
  useEffect,
  useMemo,
  useCallback,
  startTransition,
} from "react";
import { motion, useInView } from "framer-motion";
import { Volume2, VolumeX, FastForward } from "lucide-react";

const defaultStatusLines = [
  "INITIALIZING CORE...",
  "HANDSHAKING NETWORK...",
  "VERIFYING ASSETS...",
  "MOUNTING INTERFACE...",
  "RESOLVING DEPENDENCIES...",
  "FINALIZING SESSION...",
];

/**
 * LoadingOverlay / Loader
 * Based on Framer component: https://framer.com/m/LoadingOverlay-JDvhQN.js@mb1AtkaAUHRlubQsP7BX
 */
export function LoadingOverlay({
  backgroundColor = "#FFFFFF",
  textColor = "#0A0A0C",
  accentColor = "#000000",
  loaderDuration = 2800,
  fadeDuration = 700,
  statusLines = defaultStatusLines,
  message = "WELCOME TO\nTHE EXPERIENCE",
  showPercentage = true,
  reducedMotion = false,
  soundEnabled = false,
  soundVolume = 0.15,
  soundInterval = 110,
  textAnimationSpeed = 22,
  loaderFont = { fontSize: "14px", letterSpacing: "0.04em", lineHeight: "1.6em" },
  ariaLabel = "Loading overlay",
  style,
  onComplete,
  children,
}) {
  const rootRef = useRef(null);
  const inView = useInView(rootRef, { amount: 0.1 });

  const [containerWidth, setContainerWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [soundActive, setSoundActive] = useState(soundEnabled);

  const audioContextRef = useRef(null);
  const lastSoundTimeRef = useRef(0);
  const previousRevealRef = useRef(0);

  // Check prefers-reduced-motion
  const systemReducedMotion = useMemo(() => {
    if (typeof window !== "undefined" && typeof window.matchMedia === "function") {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return false;
  }, []);

  const effectiveReducedMotion = reducedMotion || systemReducedMotion;
  const safeLoaderDuration = useMemo(() => Math.max(100, loaderDuration), [loaderDuration]);
  const safeFadeDuration = useMemo(() => Math.max(0, fadeDuration), [fadeDuration]);
  const safeSoundVolume = useMemo(() => Math.min(1, Math.max(0, soundVolume)), [soundVolume]);
  const safeSoundInterval = useMemo(() => Math.max(16, soundInterval), [soundInterval]);
  const safeTextAnimationSpeed = useMemo(() => Math.max(8, textAnimationSpeed), [textAnimationSpeed]);

  const safeStatusLines = useMemo(() => {
    const lines = statusLines.filter((line) => line && line.trim().length > 0);
    return lines.length > 0 ? lines : defaultStatusLines;
  }, [statusLines]);

  const totalCharacterCount = useMemo(() => {
    return safeStatusLines.reduce((total, line) => total + line.length, 0);
  }, [safeStatusLines]);

  // Character reveal progression calculation synced to progress
  const revealedCharacterCount = useMemo(() => {
    if (effectiveReducedMotion) return totalCharacterCount;
    const elapsedMs = (Math.min(100, Math.max(0, progress)) / 100) * safeLoaderDuration;
    return Math.min(totalCharacterCount, Math.floor(elapsedMs / safeTextAnimationSpeed));
  }, [effectiveReducedMotion, progress, safeLoaderDuration, safeTextAnimationSpeed, totalCharacterCount]);

  const lineRevealData = useMemo(() => {
    let accChars = 0;
    let firstUnfinishedIndex = -1;
    const items = [];

    for (let index = 0; index < safeStatusLines.length; index += 1) {
      const line = safeStatusLines[index];
      const lineStart = accChars;
      const lineEnd = lineStart + line.length;
      accChars = lineEnd;

      let visibleChars = 0;
      if (revealedCharacterCount >= lineEnd) {
        visibleChars = line.length;
      } else if (revealedCharacterCount > lineStart) {
        visibleChars = revealedCharacterCount - lineStart;
      }

      const isCompleteLine = visibleChars >= line.length;
      if (!isCompleteLine && firstUnfinishedIndex === -1) {
        firstUnfinishedIndex = index;
      }

      items.push({
        shownText: line.slice(0, visibleChars),
        isCompleteLine,
      });
    }

    const activeLineIndex =
      revealedCharacterCount >= totalCharacterCount
        ? safeStatusLines.length - 1
        : firstUnfinishedIndex !== -1
        ? firstUnfinishedIndex
        : 0;

    return { items, activeLineIndex };
  }, [revealedCharacterCount, safeStatusLines, totalCharacterCount]);

  const isNarrow = containerWidth < 768;
  const isMedium = containerWidth >= 768 && containerWidth < 1024;

  // Track window & container resize
  useEffect(() => {
    if (!rootRef.current || typeof window === "undefined") return;
    const node = rootRef.current;

    const updateWidth = () => {
      startTransition(() => {
        setContainerWidth(node.clientWidth || window.innerWidth || 1200);
      });
    };

    updateWidth();

    if (typeof window.ResizeObserver !== "undefined") {
      const observer = new window.ResizeObserver(updateWidth);
      observer.observe(node);
      return () => observer.disconnect();
    }

    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Prevent background scroll while overlay is active
  useEffect(() => {
    if (!isDismissed) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDismissed]);

  const dismissLoader = useCallback(() => {
    startTransition(() => {
      setIsDismissed(true);
    });
  }, []);

  // Web Audio synthesizer for terminal key click / mechanical sound
  const playTerminalTick = useCallback(() => {
    if (typeof window === "undefined") return;
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;

      if (!audioContextRef.current) {
        audioContextRef.current = new Ctx();
      }

      const audioContext = audioContextRef.current;
      if (!audioContext || audioContext.state !== "running") return;

      const now = audioContext.currentTime;
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();

      oscillator.type = "square";
      oscillator.frequency.setValueAtTime(1020 + Math.random() * 120, now);
      gain.gain.setValueAtTime(Math.max(1e-4, safeSoundVolume), now);
      gain.gain.exponentialRampToValueAtTime(1e-4, now + 0.045);

      oscillator.connect(gain);
      gain.connect(audioContext.destination);

      oscillator.start(now);
      oscillator.stop(now + 0.05);
    } catch {
      // Graceful no-op for autoplay policies
    }
  }, [safeSoundVolume]);

  // Audio unlock listener for autoplay restrictions
  useEffect(() => {
    if (typeof window === "undefined" || !soundActive || isDismissed) return;

    const unlock = () => {
      try {
        const Ctx = window.AudioContext || window.webkitAudioContext;
        if (!Ctx) return;
        if (!audioContextRef.current) {
          audioContextRef.current = new Ctx();
        }
        const context = audioContextRef.current;
        if (context && context.state === "suspended") {
          void context.resume();
        }
      } catch {
        // Ignore
      }
    };

    window.addEventListener("pointerdown", unlock, { passive: true });
    window.addEventListener("keydown", unlock);
    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
    };
  }, [isDismissed, soundActive]);

  // Play audio tick on new characters revealed
  useEffect(() => {
    if (!soundActive || isDismissed || !inView) return;
    if (revealedCharacterCount <= previousRevealRef.current) return;

    const now = Date.now();
    if (now - lastSoundTimeRef.current >= safeSoundInterval) {
      lastSoundTimeRef.current = now;
      playTerminalTick();
    }
    previousRevealRef.current = revealedCharacterCount;
  }, [inView, isDismissed, playTerminalTick, revealedCharacterCount, safeSoundInterval, soundActive]);

  // Progress counter timer
  useEffect(() => {
    if (isDismissed) return;
    const start = Date.now();

    const intervalId = window.setInterval(() => {
      const elapsed = Date.now() - start;
      const nextProgress = Math.min(100, Math.round((elapsed / safeLoaderDuration) * 100));

      startTransition(() => {
        setProgress(nextProgress);
      });

      if (nextProgress >= 100) {
        window.clearInterval(intervalId);
        startTransition(() => {
          setIsComplete(true);
        });
      }
    }, 35);

    return () => window.clearInterval(intervalId);
  }, [isDismissed, safeLoaderDuration]);

  // Dismiss on complete
  useEffect(() => {
    if (!isComplete || isDismissed) return;

    if (effectiveReducedMotion || safeFadeDuration === 0) {
      dismissLoader();
      return;
    }

    const timeout = window.setTimeout(() => {
      dismissLoader();
    }, 120);

    return () => window.clearTimeout(timeout);
  }, [dismissLoader, effectiveReducedMotion, isComplete, isDismissed, safeFadeDuration]);

  // Cubic bezier ease matching Framer component: [0.2, 0.8, 0.2, 1]
  const overlayTransition = useMemo(() => {
    return {
      duration: effectiveReducedMotion ? 0 : safeFadeDuration / 1000,
      ease: [0.2, 0.8, 0.2, 1],
    };
  }, [effectiveReducedMotion, safeFadeDuration]);

  const handleSkip = () => {
    setProgress(100);
    setIsComplete(true);
    dismissLoader();
  };

  const toggleSound = () => {
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (Ctx && !audioContextRef.current) {
        audioContextRef.current = new Ctx();
      }
      if (audioContextRef.current && audioContextRef.current.state === "suspended") {
        void audioContextRef.current.resume();
      }
    } catch {
      // Ignore
    }
    setSoundActive((prev) => !prev);
  };

  return (
    <div
      ref={rootRef}
      role="region"
      aria-label={ariaLabel}
      aria-busy={!isDismissed}
      style={{
        ...style,
        position: "relative",
        width: style?.width ?? "100%",
        height: style?.height ?? "100%",
        minHeight: 1,
        overflow: "hidden",
        background: "transparent",
      }}
    >
      {/* Underlying content if passed as children */}
      {children && (
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          {children}
        </div>
      )}

      {/* Full-screen Loading Overlay with slide-up curtain exit */}
      <motion.div
        role="status"
        aria-live="polite"
        aria-hidden={isDismissed}
        initial={false}
        animate={{
          opacity: isDismissed ? 0 : 1,
          y: isDismissed ? "-100%" : "0%",
        }}
        transition={overlayTransition}
        onAnimationComplete={() => {
          if (isDismissed && onComplete) {
            onComplete();
          }
        }}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 99999,
          pointerEvents: isDismissed ? "none" : "auto",
          backgroundColor,
          color: textColor,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: isNarrow ? "24px 20px" : "48px 60px",
          willChange: "transform, opacity",
          boxSizing: "border-box",
        }}
      >
        {/* Subtle HUD utility controls: Sound toggle & Skip */}
        <div
          style={{
            position: "absolute",
            top: isNarrow ? 18 : 28,
            left: isNarrow ? 20 : 60,
            right: isNarrow ? 20 : 60,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontFamily: "var(--font-mono, monospace)",
            fontSize: "11px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            opacity: 0.65,
            zIndex: 2,
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span
              style={{
                display: "inline-block",
                width: 6,
                height: 6,
                borderRadius: "50%",
                backgroundColor: accentColor,
                boxShadow: "0 0 6px rgba(0, 0, 0, 0.2)",
                animation: "pulse 1.8s infinite",
              }}
            />
            DEWX // SYSTEM INITIALIZING
          </span>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button
              type="button"
              onClick={toggleSound}
              style={{
                background: soundActive ? "rgba(0, 0, 0, 0.05)" : "transparent",
                border: "1px solid rgba(0, 0, 0, 0.12)",
                borderRadius: "999px",
                color: "#0A0A0C",
                cursor: "pointer",
                padding: "4px 10px",
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: "11px",
                fontFamily: "inherit",
                letterSpacing: "inherit",
                opacity: soundActive ? 1 : 0.65,
                transition: "all 0.2s ease",
              }}
              title={soundActive ? "Mute audio" : "Enable terminal typing audio"}
            >
              {soundActive ? <Volume2 size={13} style={{ color: accentColor }} /> : <VolumeX size={13} />}
              <span>{soundActive ? "AUDIO [ON]" : "AUDIO [OFF]"}</span>
            </button>

            <button
              type="button"
              onClick={handleSkip}
              style={{
                background: "transparent",
                border: "1px solid rgba(0, 0, 0, 0.12)",
                borderRadius: "999px",
                color: "#0A0A0C",
                cursor: "pointer",
                padding: "4px 10px",
                display: "flex",
                alignItems: "center",
                gap: 5,
                fontSize: "11px",
                fontFamily: "inherit",
                letterSpacing: "inherit",
                opacity: 0.65,
                transition: "all 0.2s ease",
              }}
              title="Skip loading sequence"
            >
              <FastForward size={13} />
              <span>SKIP</span>
            </button>
          </div>
        </div>

        {/* Center Grid matching Framer Component */}
        <div
          style={{
            width: "100%",
            maxWidth: 1400,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: isNarrow
              ? "1fr"
              : isMedium
              ? "minmax(180px, 1fr) auto"
              : "minmax(260px, 1.25fr) auto minmax(210px, 1fr)",
            gridTemplateAreas: isNarrow
              ? `"left" "center" "right"`
              : isMedium
              ? `"left center" "right right"`
              : `"left center right"`,
            alignItems: "center",
            gap: isNarrow ? 28 : 40,
            fontFamily: loaderFont.fontFamily || "var(--font-mono, 'Space Mono', 'JetBrains Mono', monospace)",
            fontSize: loaderFont.fontSize,
            letterSpacing: loaderFont.letterSpacing,
            lineHeight: loaderFont.lineHeight,
            fontWeight: loaderFont.fontWeight || 500,
            textTransform: "uppercase",
          }}
        >
          {/* Left Column: Typewriter Status Lines */}
          <ul
            aria-label="Loading status list"
            style={{
              gridArea: "left",
              listStyle: "none",
              margin: 0,
              padding: 0,
              display: "flex",
              flexDirection: "column",
              gap: 9,
              justifySelf: "start",
              minWidth: 0,
              width: "100%",
            }}
          >
            {safeStatusLines.map((line, index) => {
              const isActive = index === lineRevealData.activeLineIndex;
              const shownText = lineRevealData.items[index]?.shownText ?? line;
              const lineText = effectiveReducedMotion ? line : shownText || " ";

              return (
                <li
                  key={`${line}-${index}`}
                  style={{
                    color: isActive ? accentColor : textColor,
                    opacity: isActive ? 1 : 0.38,
                    fontWeight: isActive ? 700 : loaderFont.fontWeight || 500,
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    transition: "color 0.15s ease, opacity 0.15s ease",
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      width: 4,
                      height: 4,
                      borderRadius: "50%",
                      backgroundColor: isActive ? accentColor : "currentColor",
                      opacity: isActive ? 1 : 0.25,
                      flexShrink: 0,
                    }}
                  />
                  <span>{lineText}</span>
                  {isActive && !isComplete && (
                    <span
                      style={{
                        display: "inline-block",
                        width: "0.55em",
                        height: "1em",
                        backgroundColor: accentColor,
                        marginLeft: 2,
                        verticalAlign: "middle",
                        animation: "cursorBlink 0.8s infinite step-start",
                      }}
                    />
                  )}
                </li>
              );
            })}
          </ul>

          {/* Center Column: Giant Monospace Percentage */}
          <div
            style={{
              gridArea: "center",
              justifySelf: "center",
              textAlign: "center",
              minWidth: "max-content",
              color: accentColor,
              fontSize: isNarrow ? "clamp(32px, 13vw, 54px)" : "clamp(34px, 5.5vw, 76px)",
              letterSpacing: "0.08em",
              lineHeight: "1em",
              fontWeight: 700,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {showPercentage ? `( ${String(progress).padStart(2, " ")}% )` : "( READY )"}
          </div>

          {/* Right Column: Pre-line Message Block */}
          <div
            style={{
              gridArea: "right",
              justifySelf: isNarrow ? "start" : "end",
              textAlign: isNarrow ? "left" : "right",
              whiteSpace: "pre-line",
              maxWidth: isNarrow ? "100%" : 300,
              opacity: 0.9,
              letterSpacing: "0.05em",
              lineHeight: "1.6em",
              fontSize: isNarrow ? "13px" : "14px",
            }}
          >
            {message}
          </div>
        </div>

        {/* Bottom subtle progress line */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 2,
            backgroundColor: "rgba(0, 0, 0, 0.06)",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${progress}%`,
              backgroundColor: accentColor,
              transition: "width 0.04s linear",
            }}
          />
        </div>
      </motion.div>

      <style>{`
        @keyframes cursorBlink {
          0%, 50% { opacity: 1; }
          50.1%, 100% { opacity: 0; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.85); }
        }
      `}</style>
    </div>
  );
}

// Named alias and default export
export const Loader = LoadingOverlay;
export default LoadingOverlay;
