/**
 * audio.js — AudioManager
 * Sons procedurais via Web Audio API. Nenhum arquivo externo necessário.
 */
const AudioManager = (function () {
  let ctx = null;
  let enabled = true;

  function init() {
    if (ctx) return;
    try {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      console.warn('Web Audio API não disponível.');
    }
  }

  function isEnabled() { return enabled; }
  function toggle()    { enabled = !enabled; }

  function _play(type, freq, duration, volume = 0.3, decay = true) {
    if (!enabled || !ctx) return;
    try {
      const osc  = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type      = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(volume, ctx.currentTime);
      if (decay) gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {}
  }

  return {
    init,
    isEnabled,
    toggle,

    playStep() {
      _play('sine', 480, 0.08, 0.12);
    },

    playIceBreak() {
      _play('sawtooth', 220, 0.18, 0.2);
      setTimeout(() => _play('sawtooth', 140, 0.12, 0.15), 80);
    },

    playDeath() {
      _play('sawtooth', 300, 0.4, 0.4);
      setTimeout(() => _play('sawtooth', 150, 0.3, 0.4), 200);
    },

    playVictory() {
      const notes = [523, 659, 784, 1047];
      notes.forEach((f, i) => setTimeout(() => _play('sine', f, 0.25, 0.3), i * 120));
    },

    playMenuClick() {
      _play('sine', 660, 0.08, 0.18);
    },

    playTimeout() {
      _play('square', 200, 0.5, 0.35);
    },
  };
})();