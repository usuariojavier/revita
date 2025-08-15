// src/components/HamburgerMenu.jsx
export default function HamburgerMenu({ onToggle, isOpen }) {
  return (
    <button
      className="hamburger-menu"
      onClick={onToggle}
      aria-label="Abrir menú"
    >
      ☰
    </button>
  );
}
