function SelectedMeals({ selected, onRemove, onReset }) {
  const total = selected.reduce((sum, m) => sum + m.price, 0);

  // find most and least expensive ids
  let maxId = null;
  let minId = null;
  if (selected.length > 0) {
    const maxPrice = Math.max(...selected.map((m) => m.price));
    const minPrice = Math.min(...selected.map((m) => m.price));
    maxId = selected.find((m) => m.price === maxPrice)?.id;
    minId = selected.find((m) => m.price === minPrice)?.id;
    // if all same price, don't highlight anything special
    if (maxPrice === minPrice) {
      maxId = null;
      minId = null;
    }

  }

  if (selected.length === 0) {
    return (
      <div className="selected-section">
        <h2>Selected Meals</h2>
        <p className="empty-msg">Nothing added yet.</p>
      </div>
    );
  }
  

  return (
    <div className="selected-section">
      <div className="selected-header">
        <h2>Selected Meals</h2>
        <button className="reset-btn" onClick={onReset}>Reset All</button>
      </div>

      <ul className="selected-list">
        {selected.map((m) => {
          let highlight = "";
          if (m.id === maxId) highlight = "highlight-max";
          else if (m.id === minId) highlight = "highlight-min";

          return (
            <li key={m.id} className={`selected-item ${highlight}`}>
              <div className="selected-left">
                <span className="sel-name">{m.name}</span>
                {m.id === maxId && <span className="badge badge-max">Most Expensive</span>}
                {m.id === minId && <span className="badge badge-min">Least Expensive</span>}
              </div>
              <div className="selected-right">
                <span>₹{m.price}</span>
                <button className="remove-btn" onClick={() => onRemove(m.id)}>✕</button>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="total-row">
        <strong>Total:</strong>
        <strong>₹{total}</strong>
      </div>
    </div>
  );
}

export default SelectedMeals;
