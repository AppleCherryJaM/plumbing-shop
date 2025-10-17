import { useState, useMemo } from "react";
import {
  Box,
  Grid,
  Typography,
  Paper,
  useTheme,
  useMediaQuery,
  Drawer,
  IconButton
} from "@mui/material";
import { FilterList as FilterIcon, Close as CloseIcon } from "@mui/icons-material";
import { ProductGrid, FiltersPanel } from "../../components/components";
import mockProducts from "../../mock-data/mockData";

const CatalogPage = () => {
  const [filters, setFilters] = useState({
    categories: [],
    brands: [],
    priceRange: [0, 1000],
    inStock: false
  });
  
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Фильтрация товаров
  const filteredProducts = useMemo(() => {
    return mockProducts.data.filter(product => {
      // Фильтр по категориям
      if (filters.categories.length > 0) {
        const hasCategory = product.categories.some(cat => 
          filters.categories.includes(cat.id)
        );
        if (!hasCategory) return false;
      }

      // Фильтр по брендам
      if (filters.brands.length > 0) {
        if (!filters.brands.includes(product.brand.id)) return false;
      }

      // Фильтр по цене
      const price = product.prices.discount || product.prices.retail;
      if (price < filters.priceRange[0] || price > filters.priceRange[1]) {
        return false;
      }

      // Фильтр по наличию
      if (filters.inStock && product.stock.available === 0) {
        return false;
      }

      return true;
    });
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const filtersPanel = (
    <FiltersPanel
      filters={filters}
      onFilterChange={handleFilterChange}
      filterOptions={mockProducts.meta.filters}
      priceRange={mockProducts.meta.filters.priceRange}
    />
  );

  return (
    <Box sx={{ p: { xs: 1, md: 3 } }}>
      {/* Заголовок и мобильный фильтр */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Каталог товаров
        </Typography>
        
        {isMobile && (
          <IconButton
            onClick={() => setMobileFiltersOpen(true)}
            sx={{ 
              backgroundColor: '#add8e6',
              color: '#000',
              '&:hover': { backgroundColor: '#8bc3d8' }
            }}
          >
            <FilterIcon />
          </IconButton>
        )}
      </Box>

      <Grid container spacing={3}>
        {/* Боковая панель фильтров - десктоп */}
        {!isMobile && (
          <Grid item md={3}>
            {filtersPanel}
          </Grid>
        )}

        {/* Основной контент */}
        <Grid item xs={12} md={9}>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            Найдено товаров: {filteredProducts.length}
          </Typography>

          <ProductGrid products={filteredProducts} />
        </Grid>
      </Grid>

      {/* Мобильный фильтр */}
      {isMobile && (
        <Drawer
          anchor="left"
          open={mobileFiltersOpen}
          onClose={() => setMobileFiltersOpen(false)}
          sx={{
            '& .MuiDrawer-paper': { 
              width: '85%', 
              maxWidth: 400,
              p: 2 
            }
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">Фильтры</Typography>
            <IconButton onClick={() => setMobileFiltersOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          {filtersPanel}
        </Drawer>
      )}
    </Box>
  );
};

export default CatalogPage;