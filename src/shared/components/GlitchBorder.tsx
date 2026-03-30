import { useEffect, useRef } from "react";

/**
 * Animated glitch border — gold segments that flicker, shift, and pulse.
 * Wraps children in a container with the animated border effect.
 */
export default function GlitchBorder({ children }: { children: React.ReactNode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d")!;
    let animFrame: number;
    let time = 0;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    // Segment configuration
    const SEGMENT_COUNT = 60;
    const GLITCH_CHANCE = 0.03;
    const FLICKER_CHANCE = 0.06;

    interface Segment {
      side: number; // 0=top, 1=right, 2=bottom, 3=left
      pos: number;  // 0-1 position along the side
      len: number;  // length as fraction of side
      opacity: number;
      targetOpacity: number;
      offset: number; // perpendicular glitch offset
      targetOffset: number;
      hue: number;
      thickness: number;
      speed: number;
    }

    const segments: Segment[] = Array.from({ length: SEGMENT_COUNT }, () => ({
      side: Math.floor(Math.random() * 4),
      pos: Math.random(),
      len: 0.02 + Math.random() * 0.12,
      opacity: Math.random() * 0.6 + 0.2,
      targetOpacity: Math.random() * 0.6 + 0.2,
      offset: 0,
      targetOffset: 0,
      hue: 36 + Math.random() * 8, // gold range 36-44
      thickness: 1 + Math.random() * 1.5,
      speed: 0.0002 + Math.random() * 0.0008,
    }));

    const draw = () => {
      time++;
      const rect = container.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      const r = 16; // border radius

      ctx.clearRect(0, 0, w, h);

      for (const seg of segments) {
        // Glitch triggers
        if (Math.random() < GLITCH_CHANCE) {
          seg.targetOffset = (Math.random() - 0.5) * 6;
          seg.targetOpacity = Math.random() * 0.4 + 0.1;
          // Occasionally a bright flash
          if (Math.random() < 0.3) {
            seg.targetOpacity = 0.8 + Math.random() * 0.2;
          }
        }

        if (Math.random() < FLICKER_CHANCE) {
          seg.targetOpacity = Math.random() < 0.5 ? 0 : seg.opacity + 0.3;
        }

        // Reset glitch offset
        if (Math.random() < 0.05) {
          seg.targetOffset = 0;
        }

        // Smooth interpolation
        seg.opacity += (seg.targetOpacity - seg.opacity) * 0.08;
        seg.offset += (seg.targetOffset - seg.offset) * 0.12;

        // Slow drift along the border
        seg.pos = (seg.pos + seg.speed) % 1;

        if (seg.opacity < 0.02) continue;

        // Calculate start/end points along the border perimeter
        const perimeter = 2 * (w + h) - 8 * r + 2 * Math.PI * r;
        const startDist = getPerimeterPos(seg.side, seg.pos, w, h, r, perimeter);
        const endDist = startDist + seg.len * (w + h) / 2;

        const p1 = getPointOnPerimeter(startDist % perimeter, w, h, r, perimeter);
        const p2 = getPointOnPerimeter(endDist % perimeter, w, h, r, perimeter);

        // Apply glitch offset perpendicular to the border
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const len = Math.sqrt(dx * dx + dy * dy) || 1;
        const nx = -dy / len * seg.offset;
        const ny = dx / len * seg.offset;

        ctx.beginPath();
        ctx.moveTo(p1.x + nx, p1.y + ny);
        ctx.lineTo(p2.x + nx, p2.y + ny);

        const alpha = Math.max(0, Math.min(1, seg.opacity));
        ctx.strokeStyle = `hsla(${seg.hue}, 80%, 55%, ${alpha})`;
        ctx.lineWidth = seg.thickness;
        ctx.shadowColor = `hsla(${seg.hue}, 80%, 55%, ${alpha * 0.6})`;
        ctx.shadowBlur = 4 + alpha * 8;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // Occasional full-border flash
      if (Math.random() < 0.004) {
        ctx.beginPath();
        drawRoundedRect(ctx, 0.5, 0.5, w - 1, h - 1, r);
        ctx.strokeStyle = `hsla(38, 80%, 55%, ${0.15 + Math.random() * 0.1})`;
        ctx.lineWidth = 1;
        ctx.shadowColor = `hsla(38, 80%, 55%, 0.3)`;
        ctx.shadowBlur = 12;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      animFrame = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animFrame);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-10"
        style={{ borderRadius: "16px" }}
      />
      {/* Subtle static border underneath */}
      <div className="rounded-2xl border border-primary/10 bg-card/5 backdrop-blur-sm p-8 md:p-10">
        {children}
      </div>
    </div>
  );
}

// --- Geometry helpers ---

function getPerimeterPos(
  side: number, t: number, w: number, h: number, r: number, perimeter: number
): number {
  const topLen = w - 2 * r;
  const rightLen = h - 2 * r;
  const bottomLen = w - 2 * r;
  const leftLen = h - 2 * r;
  const cornerLen = (Math.PI * r) / 2;

  const sideLengths = [
    topLen, cornerLen, rightLen, cornerLen,
    bottomLen, cornerLen, leftLen, cornerLen,
  ];

  let offset = 0;
  const sideIndex = side * 2; // each side has a straight + corner
  for (let i = 0; i < sideIndex; i++) offset += sideLengths[i];

  return offset + t * sideLengths[sideIndex];
}

function getPointOnPerimeter(
  dist: number, w: number, h: number, r: number, _perimeter: number
): { x: number; y: number } {
  const topLen = w - 2 * r;
  const rightLen = h - 2 * r;
  const bottomLen = w - 2 * r;
  const leftLen = h - 2 * r;
  const cornerLen = (Math.PI * r) / 2;

  const sections = [
    { len: topLen, calc: (t: number) => ({ x: r + t, y: 0 }) },
    { len: cornerLen, calc: (t: number) => {
      const angle = -Math.PI / 2 + (t / cornerLen) * (Math.PI / 2);
      return { x: w - r + Math.cos(angle) * r, y: r + Math.sin(angle) * r };
    }},
    { len: rightLen, calc: (t: number) => ({ x: w, y: r + t }) },
    { len: cornerLen, calc: (t: number) => {
      const angle = 0 + (t / cornerLen) * (Math.PI / 2);
      return { x: w - r + Math.cos(angle) * r, y: h - r + Math.sin(angle) * r };
    }},
    { len: bottomLen, calc: (t: number) => ({ x: w - r - t, y: h }) },
    { len: cornerLen, calc: (t: number) => {
      const angle = Math.PI / 2 + (t / cornerLen) * (Math.PI / 2);
      return { x: r + Math.cos(angle) * r, y: h - r + Math.sin(angle) * r };
    }},
    { len: leftLen, calc: (t: number) => ({ x: 0, y: h - r - t }) },
    { len: cornerLen, calc: (t: number) => {
      const angle = Math.PI + (t / cornerLen) * (Math.PI / 2);
      return { x: r + Math.cos(angle) * r, y: r + Math.sin(angle) * r };
    }},
  ];

  let remaining = dist;
  for (const section of sections) {
    if (remaining <= section.len) {
      return section.calc(remaining);
    }
    remaining -= section.len;
  }

  return { x: r, y: 0 };
}

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number, r: number
) {
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}
