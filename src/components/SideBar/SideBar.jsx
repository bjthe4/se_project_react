import Avatar from "../../assets/Avatar.png";

function SideBar() {
  return (
    <div className="sidebar">
      <img className="sidebar__Avatar" src={Avatar} alt="Default Avatar" />
      <p className="sidebar__username">User name</p>
    </div>
  );
}
export default SideBar;
