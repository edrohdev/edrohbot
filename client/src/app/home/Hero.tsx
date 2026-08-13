export default function Hero() {
  return (
    <section className="text-center py-8 border-b border-gray-700 mb-10">
      <h1 className="text-3xl font-bold text-gray-200 mb-2 tracking-wide">
        Robotics & Drone Intelligence
      </h1>
      <p className="text-lg text-gray-300/80 max-w-2xl mx-auto leading-6">
        Discover the latest in robotics, drones, and automation. This is a
        place where we cover the latest research and events info.
      </p>
      <div className="flex justify-center gap-6 mt-3 text-sm text-yellow-500/80 font-medium">
        <span>🤖 Robotics News</span>
        <span>🚁 Drone Tech</span>
        <span>⚙️ AI & Automation</span>
        <span>📅 Industry Events</span>
      </div>
    </section>
  );
}
