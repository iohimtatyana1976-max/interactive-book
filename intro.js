function createStarfield(canvas) {
  const context = canvas.getContext("2d");
  let width = 0;
  let height = 0;
  let stars = [];
  let frameId = null;

  const resize = () => {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);

    const count = Math.max(80, Math.floor((width * height) / 11000));
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.4 + .25,
      alpha: Math.random() * .55 + .15,
      phase: Math.random() * Math.PI * 2
    }));
  };

  const draw = (time = 0) => {
    context.clearRect(0, 0, width, height);

    for (const star of stars) {
      const pulse = .22 * Math.sin(time * .0007 + star.phase);
      context.beginPath();
      context.fillStyle = `rgba(240, 222, 163, ${Math.max(.08, star.alpha + pulse)})`;
      context.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      context.fill();
    }

    frameId = requestAnimationFrame(draw);
  };

  resize();
  window.addEventListener("resize", resize, { passive: true });
  frameId = requestAnimationFrame(draw);

  return () => {
    cancelAnimationFrame(frameId);
    window.removeEventListener("resize", resize);
  };
}

export function startIntro({ onComplete }) {
  const canvas = document.querySelector("#starfield");
  const lines = [...document.querySelectorAll(".intro-line")];
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  createStarfield(canvas);

  if (reduced) {
    lines.forEach((line) => line.classList.add("is-visible"));
    window.setTimeout(onComplete, 1200);
    return;
  }

  const timings = [800, 2600, 4700];
  timings.forEach((delay, index) => {
    window.setTimeout(() => lines[index]?.classList.add("is-visible"), delay);
  });

  window.setTimeout(onComplete, 8200);
}
