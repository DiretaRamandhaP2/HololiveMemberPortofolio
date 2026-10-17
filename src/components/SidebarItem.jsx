export default function SidebarItem({ member, isActive, onSelect }) {
    return (
        <button
            onClick={() => onSelect(member.id)}
            aria-current={isActive ? "true" : undefined}
            className={`flex w-full items-center gap-3 rounded-lg p-2 text-left transition-colors duration-200 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none ${isActive ? "font-semibold" : "text-white/80"
                }`}
            style={
                isActive
                    ? {
                        backgroundColor: member.theme.primary + "33", // +33 = opacity ±20%
                        boxShadow: `inset 3px 0 0 ${member.theme.primary}`,
                    }
                    : undefined
            }
        >
            <img
                src={member.face}
                alt={member.name}
                loading="lazy"
                decoding="async"
                className="h-12 w-12 rounded-full object-cover"
            />
            <span>{member.name}</span>
        </button>
    );
}