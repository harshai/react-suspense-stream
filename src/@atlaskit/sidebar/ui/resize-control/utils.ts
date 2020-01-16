const easeInOutQuad = (t: number) => t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

export type AnimateArgs = {
  from: number,
  onComplete: () => void;
  setWidth: (x: number) => void;
  to: number,
};

export const animate = ({ from, onComplete, setWidth, to }: AnimateArgs) => {
  const duration = 500;
  const start = performance.now();
  const transition = (t: number) => {
    const delta = t - start;
    // Progress = 0 -> 1
    const progress = Math.min(delta / duration, 1);
    const position = from + (to - from) * easeInOutQuad(progress);
    const currentWidth = Math.round(position);

    if (delta < duration) {
      setWidth(currentWidth);
      requestAnimationFrame(transition);
    } else {
      setWidth(to);
      onComplete();
    }
  };

  requestAnimationFrame(transition);
};
