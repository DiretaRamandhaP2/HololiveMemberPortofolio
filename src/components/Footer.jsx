const BASE = import.meta.env.BASE_URL;

export default function Footer() {
    return (
        <footer className="mt-10 border-t border-white/10 pt-6 text-sm text-white/60">
            <p>Fan-made, non-commercial. Hololive dan karakter terkait adalah milik COVER Corp.</p>
            <div className="mt-2 flex flex-wrap gap-4">
                <a href={`${BASE}CREDITS.md`} target="_blank" rel="noreferrer" className="underline underline-offset-4 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white motion-reduce:transition-none">Credits</a>
                <a href="https://hololivepro.com/terms/" target="_blank" rel="noreferrer" className="underline underline-offset-4 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white motion-reduce:transition-none">Pedoman karya turunan resmi</a>
            </div>
        </footer>
    );
}