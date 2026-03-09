export default function HeaderBanner({ onCohortOpen }) {
  return (
    <div className="fixed top-0 left-0 w-full z-[100] bg-[#191970] text-white text-center py-3.5 px-4">
      <span className="text-sm">
        <strong>AutomateX Cohort 2</strong> registration is now open — Begins May · ₦25,000
      </span>
      <button
        onClick={onCohortOpen}
        className="underline ml-2 text-sm font-semibold hover:text-white/80 transition"
      >
        Reserve your spot →
      </button>
    </div>
  );
}