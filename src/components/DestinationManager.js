import { useState } from "react";

const DESTINATION_PRESETS = {
    Beach: { emoji: "🏖️", color: "#FFD93D" },
    Mountain: { emoji: "⛰️", color: "#6BCB77" },
    City: { emoji: "🏙️", color: "#4D96FF" },
    Business: { emoji: "💼", color: "#9B59B6" },
    Camping: { emoji: "🏕️", color: "#95A99C" },
    Cruise: { emoji: "🚢", color: "#3498DB" },
    Desert: { emoji: "🏜️", color: "#E67E22" },
    Winter: { emoji: "❄️", color: "#5DADE2" },
    Custom: { emoji: "✈️", color: "#95E1D3" },
};

export default function DestinationManager({
    destinations,
    currentDestinationId,
    onAddDestination,
    onDeleteDestination,
    onSwitchDestination,
}) {
    const [isAdding, setIsAdding] = useState(false);
    const [newDestName, setNewDestName] = useState("");
    const [selectedType, setSelectedType] = useState("Beach");

    function handleSubmit(e) {
        e.preventDefault();
        if (!newDestName.trim()) return;

        const preset = DESTINATION_PRESETS[selectedType];
        const newDestination = {
            id: Date.now(),
            name: newDestName,
            type: selectedType,
            emoji: preset.emoji,
            color: preset.color,
        };

        onAddDestination(newDestination);
        setNewDestName("");
        setSelectedType("Beach");
        setIsAdding(false);
    }

    return (
        <div className="destination-manager">
            <div className="destination-tabs">
                {destinations.map((dest) => (
                    <button
                        key={dest.id}
                        className={`dest-tab ${currentDestinationId === dest.id ? "active" : ""
                            }`}
                        onClick={() => onSwitchDestination(dest.id)}
                        style={{
                            borderBottomColor:
                                currentDestinationId === dest.id ? dest.color : "transparent",
                        }}
                    >
                        <span className="dest-emoji">{dest.emoji}</span>
                        <span className="dest-name">{dest.name}</span>
                        {dest.type !== "All" && (
                            <button
                                className="dest-delete"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDeleteDestination(dest.id);
                                }}
                                title="Delete destination"
                            >
                                ×
                            </button>
                        )}
                    </button>
                ))}

                {!isAdding && (
                    <button
                        className="dest-tab add-dest-btn"
                        onClick={() => setIsAdding(true)}
                    >
                        + Add
                    </button>
                )}
            </div>

            {isAdding && (
                <form className="add-destination-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Destination name..."
                        value={newDestName}
                        onChange={(e) => setNewDestName(e.target.value)}
                        autoFocus
                    />
                    <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                    >
                        {Object.keys(DESTINATION_PRESETS).map((type) => (
                            <option key={type} value={type}>
                                {DESTINATION_PRESETS[type].emoji} {type}
                            </option>
                        ))}
                    </select>
                    <button type="submit">Add</button>
                    <button type="button" onClick={() => setIsAdding(false)}>
                        Cancel
                    </button>
                </form>
            )}
        </div>
    );
}
