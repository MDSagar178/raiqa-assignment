function MealItem({ meal, onAdd, isAdded }) {
  return (
    <div className={`meal-card ${!meal.available ? "unavailable-card" : ""}`}>
      <div className="meal-info">
        <span className="meal-name">{meal.name}</span>
        <span className="meal-price">₹{meal.price}</span>

      </div>
      <div className="meal-footer">
        <span className={meal.available ? "tag available" : "tag unavailable"}>
          {meal.available ? "Available" : "Unavailable"}
        </span>
        <button

          onClick={() => onAdd(meal)}
          disabled={!meal.available || isAdded}
          className="add-btn"
        >
          {isAdded ? "✓ Added" : "Add"}
        </button>
      </div>
      
    </div>
  );
}

export default MealItem;
