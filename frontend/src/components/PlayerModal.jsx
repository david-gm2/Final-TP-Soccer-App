import { IconClose } from "../../public/icons/IconSidebar";
import "../styles/PlayerModal.css";

function PlayerModal({ isOpen, onClose, onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const playerData = {
      profilePicture: formData.get("profilePicture"),
      name: formData.get("name"),
      position: formData.get("position"),
      number: formData.get("number"),
      rating: formData.get("rating"),
    };

    if (onSubmit) {
      onSubmit(playerData);
    }
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="modal-overlay" onClick={handleOverlayClick} />
      <div className="modal-player">
        <div className="modal-header">
          <h2 className="modal-title">New player</h2>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Cerrar modal"
          >
            <IconClose />
          </button>
        </div>

        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="profile-picture" className="form-label">
              Profile Picture
            </label>
            <input
              type="file"
              id="profile-picture"
              name="profilePicture"
              accept="image/*"
              className="form-input form-input-file"
            />
          </div>

          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-input"
              placeholder="Enter player name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="position" className="form-label">
              Position
            </label>
            <select
              id="position"
              name="position"
              className="form-input form-select"
              required
            >
              <option value="">Select one...</option>
              <option value="Goalkeeper">Goalkeeper</option>
              <option value="Defender">Defender</option>
              <option value="Midfielder">Midfielder</option>
              <option value="Forward">Forward</option>
            </select>
          </div>

          <div className="form-number-rating">
            <div className="form-group">
              <label htmlFor="number" className="form-label">
                Number
              </label>
              <input
                type="number"
                id="number"
                name="number"
                className="form-input"
                placeholder="Enter jersey number"
                min="1"
                max="99"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="rating" className="form-label">
                Rating
              </label>
              <input
                type="number"
                id="rating"
                name="rating"
                className="form-input"
                placeholder="Enter rating"
                min="0"
                max="100"
                step="0.1"
                required
              />
            </div>
          </div>

          <div className="modal-actions">
            <button type="submit" className="btn btn-primary">
              Add
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default PlayerModal;
