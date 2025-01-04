import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({
  weatherData,
  handleCardClick,
  clothingItems,
  handleAddClick,
  handleSignOut,
  handleEditModal,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar"></section>
      <SideBar
        handleSignOut={handleSignOut}
        handleEditModal={handleEditModal}
      />
      <section className="profile__clothing-items"></section>
      <ClothesSection
        weatherData={weatherData}
        handleCardClick={handleCardClick}
        clothingItems={clothingItems}
        handleAddClick={handleAddClick}
      />
    </div>
  );
}
export default Profile;
