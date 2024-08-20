// import { defaultClothingItems } from "../../utils/constants.js";
import ItemCard from "../ItemCard/ItemCard.jsx";

function ClothesSection({ handleCardClick, clothingItems, weatherData }) {
  return (
    <div className="clothes-section">
      <div>
        <p>Your Items</p>
        <button>Add New</button>
      </div>
      <ul className="clothes-section-items">
        {clothingItems
          .filter((item) => {
            return item.weather === weatherData.type;
          })
          .map((item) => {
            return (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={handleCardClick}
              />
            );
          })}
      </ul>
    </div>
  );
}

export default ClothesSection;
