import CharacterStage from "../components/CharacterStage";
import MemberInfo from "../components/MemberInfo";
import useRandomVoice from "../hooks/UseRandomVoice";
import { useEffect } from "react";

export default function MemberPage({ member, muted }) {
    const { speaking } = useRandomVoice(member.voices, !muted);

    useEffect(() => {
        document.title = `${member.name} | Hololive ID Portfolio`;
    }, [member.name]);

    return (
        <div className="min-w-0 overflow-x-hidden">
            <CharacterStage key={member.id} member={member} speaking={speaking} />

            <MemberInfo member={member} />
        </div>
    );
}