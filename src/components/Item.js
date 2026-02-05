export default function Item({
  item,
  destination,
  onDeleteItem,
  onToggleItem,
  showDestinationBadge = false,
}) {
  return (
    <li>
      <input
        type="checkbox"
        checked={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      {showDestinationBadge && destination && (
        <span
          className="dest-badge"
          style={{ backgroundColor: destination.color }}
          title={destination.name}
        >
          {destination.emoji}
        </span>
      )}
      <button onClick={() => onDeleteItem(item.id)}>❎</button>
    </li>
  );
}
