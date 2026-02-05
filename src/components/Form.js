import { useState } from "react";

const DESTINATION_SUGGESTIONS = {
  Beach: [
    "Swimsuit",
    "Sunscreen",
    "Sunglasses",
    "Beach Towel",
    "Flip-flops",
    "Hat",
    "Aloe Vera",
  ],
  Mountain: [
    "Hiking Boots",
    "Jacket",
    "Gloves",
    "Water Bottle",
    "Backpack",
    "Trail Map",
    "First Aid Kit",
  ],
  City: [
    "Walking Shoes",
    "Day Bag",
    "Camera",
    "City Map",
    "Portable Charger",
    "Guidebook",
  ],
  Business: [
    "Suit",
    "Dress Shoes",
    "Laptop",
    "Charger",
    "Business Cards",
    "Notebook",
    "Tie",
  ],
  Camping: [
    "Tent",
    "Sleeping Bag",
    "Flashlight",
    "Camping Stove",
    "Matches",
    "Rope",
    "Cooler",
  ],
  Cruise: [
    "Formal Wear",
    "Swimsuit",
    "Sunscreen",
    "Seasickness Pills",
    "Binoculars",
    "Evening Dress",
  ],
  Desert: [
    "Sun Hat",
    "Sunscreen",
    "Light Clothing",
    "Water Bottle",
    "Sunglasses",
    "Scarf",
  ],
  Winter: [
    "Winter Coat",
    "Snow Boots",
    "Gloves",
    "Scarf",
    "Thermal Underwear",
    "Hand Warmers",
  ],
  All: ["Passport", "Phone Charger", "Toothbrush", "Medications", "Wallet"],
};

export default function Form({ onAddItems, currentDestination }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const suggestions = DESTINATION_SUGGESTIONS[currentDestination?.type] || [];

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = {
      description,
      quantity,
      packed: false,
      id: Date.now(),
      destinationId: currentDestination?.id || 0,
    };

    onAddItems(newItem);

    setDescription("");
    setQuantity(1);
  }

  function handleSuggestionClick(suggestion) {
    setDescription(suggestion);
    setShowSuggestions(false);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>
        Packing for: {currentDestination?.emoji} {currentDestination?.name}
      </h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <div className="input-with-suggestions">
        <input
          type="text"
          placeholder="Item..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        />
        {showSuggestions && suggestions.length > 0 && (
          <div className="suggestions-dropdown">
            <p className="suggestions-title">Suggested items:</p>
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                className="suggestion-item"
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleSuggestionClick(suggestion);
                }}
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>
      <button>Add</button>
    </form>
  );
}