




export default function HamburgerMenu({ onToggle, isOpen, icon }) {
  return (
    <button 
      className="hamburger-menu" 
      onClick={onToggle}
      style={{
        position: "absolute",
        top: "50%",
        right: "15px",
        transform: "translateY(-50%)",
        zIndex: 1001,
        background: "rgba(255, 255, 255, 0.9)",
        border: "none",
        borderRadius: "6px",
        padding: "8px",
        cursor: "pointer",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        transition: "all 0.2s ease",
      }}
    >
      {icon || "☰"} {/* Si no se pasa icono, usa el clásico */}
    </button>
  );
}

