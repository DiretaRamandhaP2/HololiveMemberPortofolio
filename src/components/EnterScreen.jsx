export default function EnterScreen({ onEnter }) {
    return (
        <button
            onClick={onEnter}
            aria-label="Masuk ke portofolio Hololive ID"
            className="flex h-dvh w-full flex-col items-center justify-center gap-4 bg-neutral-950 text-white transition-colors hover:bg-neutral-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-8px] focus-visible:outline-white motion-reduce:transition-none"
        >
            <span className="text-4xl font-black tracking-widest">HOLOLIVE ID</span>
            <span className="animate-pulse text-sm text-white/60">
                Klik untuk masuk
            </span>
        </button>
    );
}