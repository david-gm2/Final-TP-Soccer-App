import { IconMenu } from "../../public/icons/IconsHeader";

function MobileHeader({
  onOpenMenu,
  logo = "imagen-logo.png",
  logoAlt = "Kickhub logo",
}) {
  return (
    <div className="main-header">
      <img src={logo} alt={logoAlt} />
      <button
        type="button"
        className="mobile-menu-toggle"
        onClick={onOpenMenu}
        aria-label="Abrir menú"
      >
        <IconMenu />
      </button>
    </div>
  );
}

export default MobileHeader;
