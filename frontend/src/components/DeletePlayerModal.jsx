function DeletePlayerModal({ isOpen, onClose, onConfirm, player }) {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <>
      <div className="modal-overlay" onClick={handleOverlayClick} />
      <div className="modal-player">
        <div className="modal-header">
          <h2 className="modal-title">Delete player</h2>
        </div>

        <h3>
          Are you sure you want to delete{" "}
          <strong>{player?.name ?? "this player"}</strong>? This action cannot
          be undone.
        </h3>

        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={onConfirm}>
            Confirm delete
          </button>
        </div>
      </div>
    </>
  );
}

export default DeletePlayerModal;
