import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../../style/CategoryPage.scss";
import { ReactComponent as ArrowIcon } from "../../image/arrow-icon.svg";
import ProductApiService from "../../service/api/product/ProductService";
import CategoryApiService from "../../service/api/product/CategoryService";
import PaginationScooter from "../other/pagination/Pagination";


const CategoryPage = () => {
  const location = useLocation();
  const initialCategoryId = location.state?.categoryId || null;


  const [selectedCategory, setSelectedCategory] = useState(initialCategoryId);
  const [categories, setCategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [filters, setFilters] = useState({ minPrice: "", maxPrice: "", sort: false });
  const [filteredProductsList, setFilteredProductsList] = useState([]);


  // Обновление категории при изменении состояния
  useEffect(() => {
    setSelectedCategory(initialCategoryId);
  }, [initialCategoryId]);

  // Обновление списка товаров при смене категории/подкатегории
  useEffect(() => {
    filteredProducts();
  }, [selectedCategory, selectedSubcategory, filters]);

  // Получаем список товаров
  useEffect(() => {
    ProductApiService.filterProducts(null, initialCategoryId? initialCategoryId : null).then((productData) => {

      // Устанавливаем данные
      setFilteredProductsList(productData);

    });

    CategoryApiService.allCategories().then((cat) => {
      setCategories(cat.categories);
    }).catch((er) => {
      setCategories([]);
    })
  }, []);


  const toggleCategory = (categoryId) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    setSelectedSubcategory(null);
  };

  const handleSubcategoryClick = (subcategoryId) => {
    setSelectedSubcategory(subcategoryId);
  };

  const getCategoryName = () => {
    const category = categories.find((cat) => cat.id === selectedCategory);
    return category ? category.name : "Выберите категорию";
  };

  const getSubcategoryName = () => {
    if (!selectedSubcategory) return null;
    const category = categories.find((cat) => cat.id === selectedCategory);
    if (category) {
      const subcategory = category.subcategories.find((sub) => sub.id === selectedSubcategory);
      return subcategory ? subcategory.name : null;
    }
    return null;
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Reset filters to initial state
  const handleResetFilters = () => {
    setFilters({ minPrice: "", maxPrice: "", sort: "default" });
    filteredProducts();
  };

  /**
   * Фильтрация продуктов
   */
  const filteredProducts = () => {
    let availability = filters.sort === "availability";
    let desc = null;
    
    switch (filters.sort) {
      case "asc": {
        desc = "asc";
        break;
      }
      case "desc": {
        desc = "desc";
        break;
      }
      default: {
        desc = "default";
        break;
      }
    }

    ProductApiService.filterProducts(
      null,
      selectedCategory ? selectedCategory : null,
      selectedSubcategory ? selectedSubcategory : null,
      Number(filters.minPrice) ? Number(filters.minPrice) : null,
      Number(filters.maxPrice) ? Number(filters.maxPrice) : null,
      desc,
      availability
    ).then((filtProductList) => {

      // Установка отфильтрованных продуктов
      setFilteredProductsList(filtProductList);
    })
  }

  return (
    <main className="containers">
      <aside className="sidebar">
        <nav className="categories-nav">
          <h2>Категории</h2>
          <ul>
            {categories.map((category) => (
              <li key={category.id_category}>
                <button
                  onClick={() => {
                    toggleCategory(category.id_category);
                    handleCategoryClick(category.id_category);
                  }}
                  className={`category-button ${expandedCategories[category.id_category] ? "active" : ""}`}
                >
                  {category.name_category}
                  <ArrowIcon
                    className={`arrow-icon ${expandedCategories[category.id_category] ? "rotated" : ""}`}
                  />
                </button>
                {expandedCategories[category.id_category] && (
                  <ul className={`subcategories ${expandedCategories[category.id_category] ? "expanded" : ""}`}>
                    {category.subcategory.map((sub) => (
                      <li key={sub.id_subcategory}>
                        <button
                          onClick={() => handleSubcategoryClick(sub.id_subcategory)}
                          className={`subcategory-button ${selectedSubcategory === sub.id_subcategory ? "active" : ""}`}
                        >
                          {sub.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}

              </li>
            ))}
          </ul>
        </nav>
        <div className="filter-container">
          <h2>Фильтры</h2>
          <div className="filter">
            <label>Цена:</label>
            <input
              type="number"
              name="minPrice"
              placeholder="Мин"
              value={filters.minPrice}
              onChange={handleFilterChange}
            />
            <input
              type="number"
              name="maxPrice"
              placeholder="Макс"
              value={filters.maxPrice}
              onChange={handleFilterChange}
            />
          </div>
          <div className="filter">
            <label>Сортировать по:</label>
            <select name="sort" value={filters.sort} onChange={handleFilterChange}>
              <option value="default">По умолчанию</option>
              <option value="asc">Цена: по возрастанию</option>
              <option value="desc">Цена: по убыванию</option>
              <option value="availability">Наличие на складе</option>
            </select>
          </div>
          <button className="reset-filters" onClick={handleResetFilters}>
            Сбросить фильтры
          </button>
        </div>
      </aside>
      <section className="main-content">
        <h2>
          {getSubcategoryName() || getCategoryName()}
        </h2>
        <hr className="dashed-line" />
        <PaginationScooter type="rounded" items={filteredProductsList}></PaginationScooter>
      </section>
    </main>
  );
};

export default CategoryPage;
