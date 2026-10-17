const make = ({
    count = 40,
    shape = "circle",
    colors = ["#ffffff"],
    size = { min: 3, max: 6 },
    speed = 1.5,
    direction = "bottom",
    random = false,
    rotate = false,
    opacity = { min: 0.4, max: 0.9 },
    fade = false,   // true = memudar lalu hilang (cocok untuk percikan)
    twinkle = false, // true = berkedip
    stroke,
}) => ({
    fullScreen: { enable: false },
    background: { color: "transparent" },
    fpsLimit: 60,
    detectRetina: true,
    pauseOnBlur: true, // pause saat tab/jendela tidak aktif
    particles: {
        number: { value: count },
        color: { value: colors },
        shape: { type: shape },
        stroke,
        size: { value: size },
        opacity: {
            value: opacity,
            animation: fade
                ? { enable: true, speed: 0.8, startValue: "max", destroy: "min", sync: false }
                : twinkle
                    ? { enable: true, speed: 1.2, sync: false }
                    : { enable: false },
        },
        rotate: rotate
            ? {
                value: { min: 0, max: 360 },
                direction: "random",
                animation: { enable: true, speed: 6 },
            }
            : undefined,
        move: {
            enable: true,
            direction,
            speed,
            random,
            straight: false,
            outModes: { default: "out" },
        },
    },
});

export const presets = {
    leaves: (n) =>
        make({ count: n, shape: "polygon", colors: ["#c2410c", "#92400e", "#65a30d", "#facc15"], size: { min: 5, max: 11 }, speed: 1.4, direction: "bottom-right", random: true, rotate: true }),
    stars: (n) =>
        make({ count: n, shape: "star", colors: ["#ffffff", "#fde68a", "#c4b5fd"], size: { min: 2, max: 6 }, speed: 0.4, direction: "none", random: true, twinkle: true, opacity: { min: 0.1, max: 1 } }),
    sparkles: (n) =>
        make({ count: n, shape: "star", colors: ["#7bdf0e", "#14b8a6", "#facc15", "#f97316", "#a855f7"], size: { min: 3, max: 8 }, speed: 2, direction: "top", random: true, fade: true }),
    hearts: (n) =>
        make({ count: n, shape: "circle", colors: ["#d60e54", "#7e22ce", "#65a30d", "#d9f99d"], size: { min: 3, max: 8 }, speed: 0.8, direction: "top", random: true, opacity: { min: 0.3, max: 0.75 }, twinkle: true }),
    petals: (n) =>
        make({ count: n, shape: "polygon", colors: ["#fef3c7", "#facc15", "#d97706", "#92400e"], size: { min: 4, max: 9 }, speed: 1.1, direction: "bottom", random: true, rotate: true }),
    feathers: (n) =>
        make({ count: n, shape: "polygon", colors: ["#0f766e", "#06b6d4", "#facc15", "#38bdf8"], size: { min: 4, max: 10 }, speed: 1, direction: "bottom", random: true, rotate: true }),
    data: (n) =>
        make({ count: n, shape: "line", colors: ["#94a3b8", "#a78bfa", "#111827"], size: { min: 5, max: 12 }, speed: 1.5, direction: "bottom-right", random: true, rotate: true, opacity: { min: 0.25, max: 0.65 } }),
    sparks: (n) =>
        make({ count: n, colors: ["#f97316", "#facc15", "#fb923c"], size: { min: 1, max: 3 }, speed: 3, direction: "top", random: true, fade: true }),
    // rain: (n) =>
    //     make({ count: n, shape: "line", colors: ["#bfdbfe"], stroke: { width: 1, color: "#bfdbfe" }, size: { min: 8, max: 16 }, speed: 12, direction: "bottom", opacity: { min: 0.3, max: 0.6 } }),
};

export const DEFAULT_COUNT = 50;