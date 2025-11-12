function Overlay({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      className="sidebar-overlay"
      onClick={onClose}
      aria-hidden="true"
      role="button"
      tabIndex={-1}
    />
  );
}

export default Overlay;
