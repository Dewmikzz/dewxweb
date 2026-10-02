import React, { useMemo, useRef, useState, useEffect, useCallback } from "react";

/**
 * Interactive Background Ripple Effect Component
 * Optimized for 60-120 FPS buttery smooth scrolling with minimal DOM footprint.
 */
export const BackgroundRippleEffect = ({
  cellSize = 64,
  borderColor = "rgba(0, 0, 0, 0.05)",
  fillColor = "rgba(248, 248, 248, 0.55)",
  hoverOpacity = 80,
  animationDuration = 220,
  animationDelay = 40,
  interactive = true,
  style = {},
  className = "",
}) => {
  const [clickedCell, setClickedCell] = useState(null);
  const [rippleKey, setRippleKey] = useState(0);
  const containerRef = useRef(null);
  const [gridDim, setGridDim] = useState({ rows: 10, cols: 20 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateGrid = () => {
      if (!containerRef.current) return;
      const w = window.innerWidth || 1440;
      const h = window.innerHeight || 850;
      const mobile = w < 768;
      setIsMobile(mobile);

      const size = mobile ? 80 : cellSize;
      const cols = Math.min(mobile ? 8 : 24, Math.ceil(w / size));
      const rows = Math.min(mobile ? 8 : 12, Math.ceil(h / size));
      setGridDim({ rows, cols });
    };

    updateGrid();
    window.addEventListener("resize", updateGrid, { passive: true });
    return () => window.removeEventListener("resize", updateGrid);
  }, [cellSize]);

  const totalCells = gridDim.rows * gridDim.cols;
  const cells = useMemo(() => Array.from({ length: totalCells }, (_, idx) => idx), [totalCells]);

  const handleCellClick = useCallback(
    (rowIdx, colIdx) => {
      if (!interactive) return;
      setClickedCell({ row: rowIdx, col: colIdx });
      setRippleKey((k) => k + 1);
    },
    [interactive]
  );

  return (
    <div
      ref={containerRef}
      className={`hero-ripple-bg ${className}`}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: interactive ? "auto" : "none",
        zIndex: 1,
        contain: "strict",
        ...style,
      }}
      aria-hidden="true"
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${gridDim.cols}, ${isMobile ? 80 : cellSize}px)`,
          gridTemplateRows: `repeat(${gridDim.rows}, ${isMobile ? 80 : cellSize}px)`,
          width: "max-content",
          margin: "0 auto",
          willChange: "transform",
          transform: "translate3d(0, 0, 0)",
        }}
      >
        {cells.map((idx) => {
          const rowIdx = Math.floor(idx / gridDim.cols);
          const colIdx = idx % gridDim.cols;
          const distance = clickedCell ? Math.hypot(clickedCell.row - rowIdx, clickedCell.col - colIdx) : 0;
          const delay = clickedCell ? Math.max(0, distance * animationDelay) : 0;

          return (
            <div
              key={`${idx}-${rippleKey}`}
              style={{
                width: isMobile ? 80 : cellSize,
                height: isMobile ? 80 : cellSize,
                backgroundColor: fillColor,
                border: `0.5px solid ${borderColor}`,
                boxSizing: "border-box",
                cursor: interactive ? "pointer" : "default",
                transition: "opacity 0.25s ease, transform 0.25s ease, background-color 0.2s ease",
                animationDelay: `${delay}ms`,
              }}
              onClick={() => handleCellClick(rowIdx, colIdx)}
              onMouseEnter={(e) => {
                if (interactive && !isMobile) {
                  e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.04)";
                  e.currentTarget.style.transform = "scale(0.97)";
                }
              }}
              onMouseLeave={(e) => {
                if (interactive && !isMobile) {
                  e.currentTarget.style.backgroundColor = fillColor;
                  e.currentTarget.style.transform = "scale(1)";
                }
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default BackgroundRippleEffect;
