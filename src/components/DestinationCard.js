export default function DestinationCard({ destination, items, onClick, isActive }) {
    const destItems = items.filter((item) => item.destinationId === destination.id);
    const packedItems = destItems.filter((item) => item.packed);
    const percentage = destItems.length > 0
        ? Math.round((packedItems.length / destItems.length) * 100)
        : 0;

    return (
        <div
            className={`destination-card ${isActive ? "active" : ""}`}
            onClick={() => onClick(destination.id)}
            style={{ borderLeftColor: destination.color }}
        >
            <div className="dest-card-header">
                <span className="dest-card-emoji">{destination.emoji}</span>
                <span className="dest-card-name">{destination.name}</span>
            </div>
            <div className="dest-card-stats">
                <span className="dest-card-count">
                    {packedItems.length}/{destItems.length} packed
                </span>
                <div className="dest-card-progress">
                    <div
                        className="dest-card-progress-bar"
                        style={{
                            width: `${percentage}%`,
                            backgroundColor: destination.color,
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
