export default function Success() {
  return (
    <section className="min-h-screen px-6 flex flex-col justify-center max-w-3xl mx-auto">

      <h1 className="text-3xl md:text-4xl font-semibold mb-6">
        Payment successful.
      </h1>

      <p className="text-lg mb-6">
        Thank you for registering for AutomateX.
      </p>

      <p className="text-lg mb-10">
        You’ll receive onboarding details shortly via email or WhatsApp.
      </p>

      <a
        href="/"
        className="border border-[#191970] px-8 py-4 hover:bg-[#191970] hover:text-white transition"
      >
        Return home
      </a>

    </section>
  );
}
