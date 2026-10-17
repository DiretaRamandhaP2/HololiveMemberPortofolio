import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { presets, DEFAULT_COUNT } from "./ParticlePresets";

export default function ParticleLayer({ type }) {
    const [ready, setReady] = useState(false);

    // engine hanya perlu diinisialisasi sekali
    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => setReady(true)).catch(() => setReady(false));
    }, []);

    const options = useMemo(() => {
        const isSmall = typeof window !== "undefined" && window.innerWidth < 768;
        const count = isSmall ? Math.round(DEFAULT_COUNT / 2) : DEFAULT_COUNT;
        const build = presets[type] ?? presets.stars; // tipe tidak dikenal → bintang
        return build(count);
    }, [type]);

    const reduceMotion = typeof window !== "undefined" && window.matchMedia
        ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
        : false;
    if (!ready || reduceMotion) return null;

    return (
        <Particles
            id={`particles-${type}`}
            options={options}
            className="pointer-events-none absolute inset-0 h-full w-full"
        />
    );
}