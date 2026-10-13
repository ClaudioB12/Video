"""Compone y sintetiza la música de fondo (piano + cuerdas suaves), 100% original.

Uso: python3 scripts/componer_musica.py public/musica/musica-sentimental.wav
Progresión tipo "Canon" (C G Am Em F C F G) a 72 BPM, ~60 s.
"""
import sys
import wave

import numpy as np

SR = 44100
BPM = 72
BEAT = 60 / BPM
BAR = 4 * BEAT
DURACION = 18 * BAR + 3.0  # 18 compases + cola de reverberación

rng = np.random.default_rng(7)
izq = np.zeros(int(DURACION * SR))
der = np.zeros(int(DURACION * SR))


def midi_hz(m):
    return 440.0 * 2 ** ((m - 69) / 12)


def piano(m, dur, vel):
    """Nota de piano aproximada: armónicos con decaimiento e inarmonicidad."""
    f = midi_hz(m)
    largo = dur + 1.6
    t = np.arange(int(largo * SR)) / SR
    decay = 0.9 + (m - 40) * 0.035
    s = np.zeros_like(t)
    for n in range(1, 9):
        fn = f * n * np.sqrt(1 + 0.0004 * n * n)
        if fn > SR / 2.2:
            break
        s += np.sin(2 * np.pi * fn * t) * (1 / n**1.6) * np.exp(-t * decay * (1 + 0.35 * n))
    ataque = np.clip(t / 0.006, 0, 1)
    soltar = np.where(t > dur, np.exp(-(t - dur) * 3.5), 1.0)  # se apaga al soltar la tecla
    return s * ataque * soltar * vel


def cuerdas(midis, dur, vel):
    """Colchón de cuerdas: sinusoides desafinadas con vibrato y ataque lento."""
    t = np.arange(int((dur + 1.5) * SR)) / SR
    s = np.zeros_like(t)
    for m in midis:
        for det in (-0.12, 0.0, 0.12):
            f = midi_hz(m + det)
            vib = 0.004 * np.sin(2 * np.pi * 5.2 * t + rng.uniform(0, 6))
            fase = 2 * np.pi * f * np.cumsum(1 + vib) / SR
            s += np.sin(fase) + 0.25 * np.sin(2 * fase) + 0.1 * np.sin(3 * fase)
    env = np.clip(t / 1.2, 0, 1) * np.where(t > dur, np.exp(-(t - dur) * 2.5), 1.0)
    return s * env * vel / (len(midis) * 3)


def poner(señal, inicio, pan=0.0):
    i = int(inicio * SR)
    j = min(i + len(señal), len(izq))
    señal = señal[: j - i]
    izq[i:j] += señal * np.sqrt((1 - pan) / 2)
    der[i:j] += señal * np.sqrt((1 + pan) / 2)


# Acordes: (raíz grave, tercera mayor/menor, notas del colchón)
ACORDES = {
    "C": (48, 4, [60, 64, 67]),
    "G": (43, 4, [59, 62, 67]),
    "Am": (45, 3, [57, 60, 64]),
    "Em": (40, 3, [55, 59, 64]),
    "F": (41, 4, [57, 60, 65]),
}
CANON = ["C", "G", "Am", "Em", "F", "C", "F", "G"]
COMPASES = ["C"] + CANON + CANON + ["C"]

# Melodía: (nota MIDI, pulsos). None = silencio.
INTRO = [(None, 4)]
MELODIA_A = [
    (76, 2), (79, 1), (76, 1),
    (74, 3), (71, 1),
    (72, 2), (76, 1), (81, 1),
    (79, 3), (76, 1),
    (77, 2), (81, 1), (79, 1),
    (76, 3), (72, 1),
    (74, 1), (72, 1), (69, 1), (72, 1),
    (74, 4),
]
MELODIA_B = [
    (79, 1), (76, 1), (79, 1), (84, 1),
    (83, 2), (86, 1), (83, 1),
    (84, 2), (83, 1), (81, 1),
    (79, 2), (76, 1), (79, 1),
    (81, 1), (79, 1), (77, 1), (81, 1),
    (79, 2), (76, 1), (72, 1),
    (77, 1), (76, 1), (74, 1), (72, 1),
    (74, 2), (71, 1), (74, 1),
]
FINAL = [(72, 4)]

# Mano izquierda: arpegio en corcheas.
for c, nombre in enumerate(COMPASES):
    raiz, tercera, pad = ACORDES[nombre]
    inicio = c * BAR
    ultimo = c == len(COMPASES) - 1
    patron = [0, 7, 12, 12 + tercera, 19, 12 + tercera, 12, 7]
    if ultimo:
        for k, iv in enumerate([0, 7, 12, 12 + tercera, 19]):
            poner(piano(raiz + iv, 3.5 - k * 0.3, 0.30), inicio + k * BEAT / 2, -0.3)
    else:
        for k, iv in enumerate(patron):
            vel = 0.30 if k == 0 else 0.20
            poner(piano(raiz + iv, BEAT / 2 * 1.8, vel), inicio + k * BEAT / 2, -0.3)
    # Cuerdas desde la segunda vuelta del canon
    if c >= 9:
        poner(cuerdas(pad, BAR * (1.0 if not ultimo else 1.4), 0.10), inicio, 0.1)

# Mano derecha: melodía.
t = 0.0
for frase, vel in ((INTRO, 0), (MELODIA_A, 0.42), (MELODIA_B, 0.46), (FINAL, 0.42)):
    for nota, pulsos in frase:
        if nota is not None:
            dur = pulsos * BEAT
            poner(piano(nota, dur * 0.95, vel), t, 0.25)
            if frase is MELODIA_B:  # refuerzo una octava abajo, más suave
                poner(piano(nota - 12, dur * 0.95, vel * 0.35), t, 0.15)
        t += pulsos * BEAT


# Reverberación: respuesta al impulso de ruido con decaimiento exponencial.
def reverb(x, semilla):
    r = np.random.default_rng(semilla)
    n = int(2.8 * SR)
    ti = np.arange(n) / SR
    ir = r.standard_normal(n) * np.exp(-ti / 0.55)
    ir[: int(0.02 * SR)] = 0
    ir /= np.sqrt(np.sum(ir**2))
    tam = 1 << int(np.ceil(np.log2(len(x) + n)))
    y = np.fft.irfft(np.fft.rfft(x, tam) * np.fft.rfft(ir, tam), tam)[: len(x)]
    return x * 0.75 + y * 0.45


L, R = reverb(izq, 1), reverb(der, 2)
# Fundido de salida en los últimos 3 s
fin = np.ones(len(L))
k = int(3.0 * SR)
fin[-k:] = np.linspace(1, 0, k) ** 2
L, R = L * fin, R * fin
pico = max(np.abs(L).max(), np.abs(R).max())
L, R = L / pico * 0.89, R / pico * 0.89

salida = sys.argv[1] if len(sys.argv) > 1 else "musica.wav"
datos = (np.stack([L, R], axis=1) * 32767).astype(np.int16)
with wave.open(salida, "wb") as w:
    w.setnchannels(2)
    w.setsampwidth(2)
    w.setframerate(SR)
    w.writeframes(datos.tobytes())
print(f"{salida}: {len(L) / SR:.1f} s")
