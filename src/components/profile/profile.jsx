import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({ weatherData, handleCardClick, clothingItems }) {
  return (
    <div className="profile">
      <section className="profile__sidebar"></section>
      <SideBar />
      <section className="profile__clothing-items"></section>
      <ClothesSection
        weatherData={weatherData}
        handleCardClick={handleCardClick}
        clothingItems={clothingItems}
      />
    </div>
  );
}
export default Profile;
