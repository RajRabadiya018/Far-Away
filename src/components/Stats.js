export default function Stats({
  items,
  destinations,
  currentDestinationId,
  viewMode,
}) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding some items to your packing list 🚀</em>
      </p>
    );

  const currentDest = destinations.find((d) => d.id === currentDestinationId);

  // Stats for current destination
  const currentItems = items.filter(
    (item) => item.destinationId === currentDestinationId
  );
  const currentPacked = currentItems.filter((item) => item.packed).length;
  const currentPercentage =
    currentItems.length > 0
      ? Math.round((currentPacked / currentItems.length) * 100)
      : 0;

  // Overall stats
  const totalItems = items.length;
  const totalPacked = items.filter((item) => item.packed).length;
  const totalPercentage =
    totalItems > 0 ? Math.round((totalPacked / totalItems) * 100) : 0;

  if (viewMode === "current") {
    return (
      <footer className="stats">
        <em>
          {currentItems.length === 0
            ? `No items for ${currentDest?.name} yet. Start adding! 🎒`
            : currentPercentage === 100
              ? `${currentDest?.emoji} ${currentDest?.name} is ready to go! ✈️`
              : `${currentDest?.emoji} ${currentDest?.name}: ${currentItems.length} items, ${currentPacked} packed (${currentPercentage}%)`}
        </em>
      </footer>
    );
  }

  if (viewMode === "all" || viewMode === "grouped") {
    const destStats = destinations
      .map((dest) => {
        const destItems = items.filter((item) => item.destinationId === dest.id);
        const destPacked = destItems.filter((item) => item.packed).length;
        const destPercentage =
          destItems.length > 0
            ? Math.round((destPacked / destItems.length) * 100)
            : 0;
        return { dest, count: destItems.length, packed: destPacked, percentage: destPercentage };
      })
      .filter((stat) => stat.count > 0);

    return (
      <footer className="stats">
        <em>
          {totalPercentage === 100
            ? "All destinations ready! Have a great trip! ✈️🎉"
            : `Overall: ${totalPacked}/${totalItems} packed (${totalPercentage}%) | ${destStats
              .map((s) => `${s.dest.emoji} ${s.percentage}%`)
              .join(" | ")}`}
        </em>
      </footer>
    );
  }

  return null;
}
