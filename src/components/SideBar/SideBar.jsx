// import Avatar from "../../assets/Avatar.png";
import "./SideBar.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";

function SideBar({ handleSignOut, handleEditModal }) {
  const { currentUser } = useContext(CurrentUserContext);
  return (
    <div className="sidebar">
      <img
        className="sidebar__avatar"
        src={currentUser.avatar}
        alt="user Avatar"
      />
      <p className="sidebar__username">{currentUser.name}</p>
      <div className="sidebar__nav">
        <button className="sidebar__profile-edit-btn" onClick={handleEditModal}>
          Change profile data
        </button>
        <button className="sidebar__logout" onClick={handleSignOut}>
          Log Out
        </button>
      </div>
    </div>
  );
}
export default SideBar;
