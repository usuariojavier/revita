import { useState } from "react";

export default function Filters({ onFilter }) {
  const [filters, setFilters] = useState({ category: "", price: "", size: "" });

 


    const handleFilterChange = (e) => {
      const { name, value } = e.target;
      setFilters({ ...filters, [name]: value });
      onFilter(filters);
    };

}


