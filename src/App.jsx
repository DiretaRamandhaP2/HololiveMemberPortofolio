import { useEffect, useState } from "react";
import { generations } from "./data/members";
import Sidebar from "./components/Sidebar";
import EnterScreen from "./components/EnterScreen";
import MemberPage from "./pages/MemberPage";
import Footer from "./components/Footer";

const allMembers = generations.flatMap((g) =>
  g.members.map((m) => ({ ...m, generation: g.name }))
);

export default function App() {
  const [entered, setEntered] = useState(false);
  const [activeId, setActiveId] = useState("risu");
  const [menuOpen, setMenuOpen] = useState(false);
  const [muted, setMuted] = useState(() => {
    try {
      return localStorage.getItem("muted") === "1";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("muted", muted ? "1" : "0");
    } catch {
      /* abaikan */
    }
  }, [muted]);

  // Preload karakter setelah layar masuk agar tidak memblokir tampilan awal.
  useEffect(() => {
    if (!entered) return;
    allMembers.forEach((member) => {
      const image = new Image();
      image.src = member.character.startsWith("/")
        ? member.character
        : `/${member.character}`;
    });
  }, [entered]);

  // tutup drawer dengan tombol Escape
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  const activeMember = allMembers.find((m) => m.id === activeId);

  if (!entered) return <EnterScreen onEnter={() => setEntered(true)} />;

  const handleSelect = (id) => {
    setActiveId(id);
    setMenuOpen(false); // di HP, drawer menutup setelah memilih
  };

  return (
    <div className="flex h-dvh bg-neutral-950 text-white">
      {/* overlay gelap, hanya di mobile */}
      <div
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
        className={`fixed inset-0 z-30 bg-black/60 transition-opacity motion-reduce:transition-none md:hidden ${menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
      />

      <Sidebar
        generations={generations}
        activeId={activeId}
        onSelect={handleSelect}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
      />

      <main className={`relative min-w-0 flex-1 p-4 md:p-6 ${menuOpen ? "overflow-hidden" : "overflow-y-auto"}`}>
        {/* hamburger, hanya di mobile */}
        <button
          onClick={() => setMenuOpen(true)}
          aria-label="Buka menu member"
          aria-expanded={menuOpen}
          aria-controls="member-drawer"
          className="fixed left-4 top-4 z-50 rounded-full bg-black/50 px-3 py-2 text-lg backdrop-blur transition-colors hover:bg-black/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white motion-reduce:transition-none md:hidden"
        >
          ☰
        </button>

        <button
          onClick={() => setMuted((m) => !m)}
          aria-label={muted ? "Nyalakan suara" : "Matikan suara"}
          className="fixed right-4 top-4 z-20 rounded-full bg-black/50 px-3 py-2 text-sm backdrop-blur transition-colors hover:bg-black/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white motion-reduce:transition-none"
        >
          {muted ? "🔇 Muted" : "🔊 Suara"}
        </button>

        <MemberPage member={activeMember} muted={muted} />
        <Footer />
      </main>
    </div>
  );
}