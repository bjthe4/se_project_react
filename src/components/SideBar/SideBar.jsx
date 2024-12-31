// import Avatar from "../../assets/Avatar.png";
import "./SideBar.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";

function SideBar({ handleSignOut, handleEditModal }) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <div className="sidebar">
      <img
        className="sidebar__Avatar"
        src={currentUser.avatar}
        alt="user Avatar"
      />
      <p className="sidebar__username">{currentUser.name}</p>
    </div>
  );
}
export default SideBar;
