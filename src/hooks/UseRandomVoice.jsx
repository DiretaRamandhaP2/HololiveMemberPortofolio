import { useCallback, useEffect, useRef, useState } from "react";

const INTERVAL_MS = 60_000;

export default function useRandomVoice(voices, enabled) {
    const audioRef = useRef(null);      // audio yang sedang jalan
    const lastIndexRef = useRef(-1);    // index terakhir, agar tidak berulang
    const [speaking, setSpeaking] = useState(false);

    const stop = useCallback(() => {
        const audio = audioRef.current;
        if (audio) {
            audio.pause();
            audioRef.current = null;
        }
        setSpeaking(false);
    }, []);

    const playRandom = useCallback(() => {
        if (!voices || voices.length === 0) return;

        // pilih index acak, hindari yang sama dengan sebelumnya
        let index = Math.floor(Math.random() * voices.length);
        if (voices.length > 1) {
            while (index === lastIndexRef.current) {
                index = Math.floor(Math.random() * voices.length);
            }
        }
        lastIndexRef.current = index;

        stop(); // hentikan voice sebelumnya agar tidak numpuk

        const audio = new Audio(voices[index]);
        audioRef.current = audio;

        // cek audioRef agar event dari audio lama tidak mengubah state audio baru
        audio.onplaying = () => {
            if (audioRef.current === audio) setSpeaking(true);
        };
        audio.onended = () => {
            if (audioRef.current === audio) {
                audioRef.current = null;
                setSpeaking(false);
            }
        };

        audio.play().catch((err) => {
            // AbortError wajar saat ganti member cepat; sisanya (404, autoplay) dicatat
            if (err.name !== "AbortError") console.warn("Voice gagal diputar:", err);
            if (audioRef.current === audio) {
                audioRef.current = null;
                setSpeaking(false);
            }
        });
    }, [voices, stop]);

    useEffect(() => {
        if (!enabled || !voices || voices.length === 0) {
            stop();
            return;
        }

        lastIndexRef.current = -1;
        playRandom(); // langsung bunyi saat member dipilih
        const id = setInterval(playRandom, INTERVAL_MS);

        return () => {
            clearInterval(id);
            stop();
        };
    }, [voices, enabled, playRandom, stop]);

    return { speaking, playNow: playRandom };
}