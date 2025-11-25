function DeletePlayerModal({ isOpen, onClose, onConfirm, player }) {
  if (!isOpen) return null;

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) onClose();
  };

  const handleConfirm = () => {
    if (typeof onConfirm === "function") {
      onConfirm();
    }
  };

  const playerName = player?.nick || player?.name || "this player";

  return (
    <>
      <div className="modal-overlay" onClick={handleOverlayClick} />
      <div className="modal-player delete">
        <div className="modal-header">
          <h2 className="modal-title">Delete player</h2>
        </div>

        <h3 className="modal-message">
          Are you sure you want to delete <strong>{playerName}</strong>? This
          action cannot be undone.
        </h3>

        <div className="modal-actions">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="btn btn-danger" onClick={handleConfirm}>
            Delete
          </button>
        </div>
      </div>
    </>
  );
}

export default DeletePlayerModal;
