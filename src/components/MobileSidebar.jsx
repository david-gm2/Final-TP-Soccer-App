import { IconMenu } from "../icons/IconSidebar.jsx";

function MobileSidebar({
  onOpenMenu,
  logo = "/imagen-logo.png",
  logoAlt = "Kickhub logo",
}) {
  return (
    <div className="main-sidebar">
      <img src={logo} alt={logoAlt} />
      <button
        type="button"
        className="mobile-menu-toggle"
        onClick={onOpenMenu}
        aria-label="Open menu"
      >
        <IconMenu />
      </button>
    </div>
  );
}

export default MobileSidebar;
