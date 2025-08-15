




export default function HamburgerMenu({ onToggle, isOpen, icon }) {
  return (
    <button className="hamburger-menu" onClick={onToggle}>
      {icon || "☰"} {/* Si no se pasa icono, usa el clásico */}
    </button>
  );
}

