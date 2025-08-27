import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import productos from '../data/productos';

export default function Filters({ onFilter }) {
  const { t } = useTranslation();

  // Estado local para los filtros seleccionados
  const [filters, setFilters] = useState({
    category: '',
    price: '',
    size: ''
  });

  // ✅ Solo llamamos a onFilter cuando cambian los filtros
  useEffect(() => {
    if (onFilter && typeof onFilter === 'function') {
      onFilter(filters);
    }
  }, [filters, onFilter]);

  const handleCategoryChange = (category) => {
    setFilters(prev => ({
      ...prev,
      category
    }));
  };

  const handlePriceChange = (price) => {
    setFilters(prev => ({
      ...prev,
      price
    }));
  };

  const handleSizeChange = (size) => {
    setFilters(prev => ({
      ...prev,
      size
    }));
  };

  return (
    <div>
      {/* Categorías */}
      

      {/* Marcas */}
      

      {/* Precio */}
      

      {/* Talla */}
      
    </div>
  );
}

const styles = {
  filterSection: {
    marginBottom: "25px",
    padding: "20px",
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
  },
  filterTitle: {
    fontSize: "16px",
    fontWeight: "600",
    marginBottom: "15px",
    color: "#333",
  },
  filterOptions: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  filterLabel: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "14px",
    color: "#555",
    cursor: "pointer",
  }
};
