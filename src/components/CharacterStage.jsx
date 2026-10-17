import { useState } from "react";
import ParticleLayer from "./ParticleLayer";

export default function CharacterStage({ member, speaking }) {
    const { theme } = member;
    const [imageState, setImageState] = useState("loading");

    return (
        <section
            className="relative h-[50dvh] min-h-[320px] overflow-hidden rounded-2xl md:h-[60vh]"
            style={{
                background: `linear-gradient(135deg, ${theme.secondary}, ${theme.primary})`,
            }}
        >
            {/* z-0: nama besar di belakang karakter */}
            <div className="pointer-events-none absolute inset-0 z-0 flex items-center px-6 animate-enter-left">
                <span className="max-w-full select-none break-words text-4xl font-black uppercase leading-none text-white opacity-25 sm:text-6xl md:text-8xl">
                    {member.name}
                </span>
            </div>

            {/* z-10: slot untuk ParticleLayer di Tahap 9 */}

            {/* z-20: karakter */}
            <div className="absolute inset-x-0 bottom-0 z-20 flex h-full justify-center animate-enter-up md:justify-end md:pr-16">
                {imageState === "loading" && (
                    <div
                        aria-label={`Memuat karakter ${member.name}`}
                        className="absolute inset-x-1/4 bottom-0 h-4/5 animate-pulse rounded-t-full bg-white/15 motion-reduce:animate-none"
                    />
                )}
                {imageState === "error" && (
                    <div className="flex h-full w-full items-center justify-center text-6xl font-black text-white/70" aria-label={`Karakter ${member.name} tidak tersedia`}>
                        {member.name.charAt(0)}
                    </div>
                )}
                <img
                    src={member.character}
                    alt={`Karakter ${member.name}`}
                    onLoad={() => setImageState("loaded")}
                    onError={() => setImageState("error")}
                    fetchPriority="high"
                    decoding="async"
                    className={`h-full object-contain animate-float ${imageState === "error" ? "hidden" : ""}`}
                />
            </div>
            <div className="pointer-events-none absolute inset-0 z-10">
                <ParticleLayer type={member.particle} />
            </div>

            {speaking && (
                <div className="absolute bottom-4 left-4 z-30 flex items-center gap-2 rounded-full bg-black/50 px-3 py-1 text-xs text-white backdrop-blur md:top-4 md:bottom-auto">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
                    sedang berbicara…
                </div>
            )}
        </section>
    );
}