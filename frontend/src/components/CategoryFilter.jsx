// ============================================
// components/CategoryFilter.jsx – Filtro por categoría
// ============================================

import './CategoryFilter.css';

const CATEGORIES = [
  { value: null,         label: 'Todos' },
  { value: 'camisetas',  label: 'Camisetas' },
  { value: 'pantalones', label: 'Pantalones' },
  { value: 'sudaderas',  label: 'Sudaderas' },
  { value: 'chaquetas',  label: 'Chaquetas' },
  { value: 'zapatillas', label: 'Zapatillas' },
];

const CategoryFilter = ({ selected, onChange }) => {
  return (
    <div className="cat-filter">
      {CATEGORIES.map(cat => (
        <button
          key={cat.label}
          className={`cat-filter__btn ${selected === cat.value ? 'active' : ''}`}
          onClick={() => onChange(cat.value)}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
