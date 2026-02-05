import { useState } from "react";
import Item from "./Item";

export default function PackingList({
  items,
  allItems,
  destinations,
  currentDestinationId,
  viewMode,
  onViewModeChange,
  onDeleteItem,
  onToggleItem,
  onClearList,
}) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  if (sortBy === "input") sortedItems = items;

  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  // Group items by destination for grouped view
  const groupedItems =
    viewMode === "grouped"
      ? destinations.map((dest) => ({
        destination: dest,
        items: allItems
          .filter((item) => item.destinationId === dest.id)
          .sort((a, b) => {
            if (sortBy === "description")
              return a.description.localeCompare(b.description);
            if (sortBy === "packed")
              return Number(a.packed) - Number(b.packed);
            return 0;
          }),
      }))
      : null;

  return (
    <div className="list">
      {viewMode === "grouped" ? (
        <div className="grouped-list">
          {groupedItems.map(
            ({ destination, items: destItems }) =>
              destItems.length > 0 && (
                <div key={destination.id} className="destination-group">
                  <h3 className="group-header" style={{ color: destination.color }}>
                    {destination.emoji} {destination.name} ({destItems.length}{" "}
                    items)
                  </h3>
                  <ul>
                    {destItems.map((item) => (
                      <Item
                        item={item}
                        onDeleteItem={onDeleteItem}
                        onToggleItem={onToggleItem}
                        key={item.id}
                        showDestinationBadge={false}
                      />
                    ))}
                  </ul>
                </div>
              )
          )}
        </div>
      ) : (
        <ul>
          {sortedItems.map((item) => {
            const itemDest = destinations.find(
              (d) => d.id === item.destinationId
            );
            return (
              <Item
                item={item}
                destination={itemDest}
                onDeleteItem={onDeleteItem}
                onToggleItem={onToggleItem}
                key={item.id}
                showDestinationBadge={viewMode === "all"}
              />
            );
          })}
        </ul>
      )}

      <div className="actions">
        <select
          value={viewMode}
          onChange={(e) => onViewModeChange(e.target.value)}
        >
          <option value="current">Current destination</option>
          <option value="all">All destinations</option>
          <option value="grouped">Group by destination</option>
        </select>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={onClearList}>Clear list</button>
      </div>
    </div>
  );
}