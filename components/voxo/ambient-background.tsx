/** Fond discret — pas de décor excessif, améliore la profondeur perçue. */
export function AmbientBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden
    >
      <div className="voxo-ambient-orb voxo-ambient-orb-a" />
      <div className="voxo-ambient-orb voxo-ambient-orb-b" />
      <div className="absolute inset-0 bg-[#02050b]" />
    </div>
  );
}
