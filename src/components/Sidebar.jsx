import SidebarItem from "./SidebarItem";

export default function Sidebar({ generations, activeId, onSelect, open, onClose }) {
    return (
        <aside
            id="member-drawer"
            aria-label="Daftar member"
            className={`fixed inset-y-0 left-0 z-40 w-72 shrink-0 overflow-y-auto border-r border-white/10 bg-neutral-900 p-3 transition-transform duration-300 motion-reduce:transition-none md:static md:z-auto md:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"
                }`}
        >
            <div className="mb-3 flex justify-end md:hidden">
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Tutup menu member"
                    className="rounded-full px-3 py-2 text-lg transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white motion-reduce:transition-none"
                >
                    ×
                </button>
            </div>
            {generations.map((gen) => (
                <section key={gen.id} className="mb-6">
                    <h2 className="mb-2 px-2 text-xs font-semibold uppercase tracking-widest text-white/50">{gen.name}</h2>
                    <ul className="space-y-1">
                        {gen.members.map((member) => (
                            <li key={member.id}>
                                <SidebarItem
                                    member={member}
                                    isActive={member.id === activeId}
                                    onSelect={onSelect}
                                />
                            </li>
                        ))}
                    </ul>
                </section>
            ))}
        </aside>
    );
}
