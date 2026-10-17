const FACT_LABELS = {
    birthday: "Ulang tahun",
    height: "Tinggi",
    fanName: "Nama fans",
    fanbase: "Fanbase",
};

const LINK_LABELS = {
    youtube: "YouTube",
    x: "X (Twitter)",
};

export default function MemberInfo({ member }) {
    const facts = Object.entries(FACT_LABELS).filter(
        ([key]) => member.facts?.[key]
    );
    const links = Object.entries(member.links ?? {}).filter(([, url]) => url);
    const tags = Object.entries(member.hashtags ?? {}).filter(([, tag]) => tag);

    return (
        <div
            className="mt-6 grid gap-6 md:grid-cols-3"
            style={{ "--primary": member.theme.primary }}
        >
            {/* Kolom kiri: nama, generasi, deskripsi */}
            <section className="md:col-span-2">
                <span className="inline-block rounded-full bg-[var(--primary)] px-3 py-1 text-xs font-semibold uppercase tracking-widest text-black">
                    {member.generation}
                </span>
                <h1 className="mt-3 text-3xl font-bold text-[var(--primary)]">
                    {member.name}
                </h1>
                <p className="mt-3 leading-relaxed text-white/75">{member.about}</p>

                {links.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-3">
                        {links.map(([key, url]) => (
                            <a
                                key={key}
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-black transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                            >
                                {LINK_LABELS[key] ?? key}
                            </a>
                        ))}
                    </div>
                )}
            </section>

            {/* Kolom kanan: fakta + hashtag */}
            {(facts.length > 0 || tags.length > 0) && (
                <aside className="rounded-xl border border-white/10 bg-white/5 p-4">
                    {facts.length > 0 && (
                        <dl className="space-y-3 text-sm">
                            {facts.map(([key, label]) => (
                                <div key={key}>
                                    <dt className="text-xs uppercase tracking-wider text-white/50">
                                        {label}
                                    </dt>
                                    <dd className="font-medium">{member.facts[key]}</dd>
                                </div>
                            ))}
                        </dl>
                    )}

                    {tags.length > 0 && (
                        <div className="mt-4 border-t border-white/10 pt-4">
                            <p className="mb-2 text-xs uppercase tracking-wider text-white/50">
                                Hashtag
                            </p>
                            <ul className="flex flex-wrap gap-2">
                                {tags.map(([key, tag]) => (
                                    <li
                                        key={key}
                                        className="rounded-md border border-[var(--primary)] px-2 py-1 text-xs text-[var(--primary)]"
                                    >
                                        {tag}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </aside>
            )}
        </div>
    );
}