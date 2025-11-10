import { IconClose } from "../../public/icons/IconsHeader";
import { useState } from "react";
import MobileHeader from "./MobileHeader";
import Overlay from "./Overlay";
import RoleBadge from "./RoleBadge";
import Navigation from "./Navigation";
import UserInfo from "./UserInfo";
import "../styles/Header.css";

function Header({
  // TODO sincronizar con la base de datos
  role = { dot: "violet", name: "ADMIN" },
  user = { name: "Doye", email: "doyel.gusmerotti@gm", avatar: "avatar.jpg" },
  logo = "imagen-logo.png",
  onSignOut,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const handleSignOut = () => {
    if (onSignOut) {
      console.info("Te deslogueaste hehe");
      onSignOut();
    }
  };

  return (
    <>
      <MobileHeader logo={logo} onOpenMenu={toggleMenu} />

      <Overlay
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen((prev) => !prev)}
      />

      <header className={`header ${isMenuOpen ? "header-open" : ""}`}>
        <div className="header-top">
          <div className="header-logo">
            <img src={logo} alt="Kickhub logo" />
          </div>

          <button
            type="button"
            className="header-close-btn"
            onClick={toggleMenu}
            aria-label="Cerrar menú"
          >
            <IconClose />
          </button>

          <RoleBadge role={role} />

          <Navigation onItemClick={toggleMenu} />
        </div>

        <UserInfo user={user} onSignOut={handleSignOut} />
      </header>
    </>
  );
}

export default Header;
