import { useEffect, useState } from "react";
import DestinationManager from "./DestinationManager";
import Form from "./Form";
import Logo from "./Logo";
import PackingList from "./PackingList";
import Stats from "./Stats";

const INITIAL_DESTINATIONS = [
  {
    id: 0,
    name: "All Trip",
    type: "All",
    emoji: "🌍",
    color: "#76c7ad",
  },
];

export default function App() {
  const [destinations, setDestinations] = useState(() => {
    const saved = localStorage.getItem("destinations");
    return saved ? JSON.parse(saved) : INITIAL_DESTINATIONS;
  });

  const [currentDestinationId, setCurrentDestinationId] = useState(() => {
    const saved = localStorage.getItem("currentDestinationId");
    return saved ? Number(saved) : 0;
  });

  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("items");
    return saved ? JSON.parse(saved) : [];
  });

  const [viewMode, setViewMode] = useState("current");

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem("destinations", JSON.stringify(destinations));
  }, [destinations]);

  useEffect(() => {
    localStorage.setItem("currentDestinationId", currentDestinationId);
  }, [currentDestinationId]);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  function handleAddDestination(destination) {
    setDestinations((dests) => [...dests, destination]);
    setCurrentDestinationId(destination.id);
  }

  function handleDeleteDestination(id) {
    if (id === 0) return; // Can't delete "All Trip"

    const confirmed = window.confirm(
      "Delete this destination? Items will be moved to 'All Trip'."
    );

    if (confirmed) {
      setDestinations((dests) => dests.filter((d) => d.id !== id));
      setItems((items) =>
        items.map((item) =>
          item.destinationId === id ? { ...item, destinationId: 0 } : item
        )
      );
      if (currentDestinationId === id) setCurrentDestinationId(0);
    }
  }

  function handleSwitchDestination(id) {
    setCurrentDestinationId(id);
  }

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleClearList() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items?"
    );

    if (confirmed) setItems([]);
  }

  // Filter items based on view mode
  const displayedItems =
    viewMode === "all"
      ? items
      : items.filter((item) => item.destinationId === currentDestinationId);

  const currentDestination = destinations.find(
    (d) => d.id === currentDestinationId
  );

  return (
    <div className="app">
      <Logo />
      <DestinationManager
        destinations={destinations}
        currentDestinationId={currentDestinationId}
        onAddDestination={handleAddDestination}
        onDeleteDestination={handleDeleteDestination}
        onSwitchDestination={handleSwitchDestination}
      />
      <Form
        onAddItems={handleAddItems}
        currentDestination={currentDestination}
      />
      <PackingList
        items={displayedItems}
        allItems={items}
        destinations={destinations}
        currentDestinationId={currentDestinationId}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onClearList={handleClearList}
      />
      <Stats
        items={items}
        destinations={destinations}
        currentDestinationId={currentDestinationId}
        viewMode={viewMode}
      />
    </div>
  );
}



