import {
  Paper,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Slider,
  Box,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from "@mui/material";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";

const FiltersPanel = ({ filters, onFilterChange, filterOptions, priceRange }) => {
  const handleCategoryChange = (categoryId) => {
    const newCategories = filters.categories.includes(categoryId)
      ? filters.categories.filter(id => id !== categoryId)
      : [...filters.categories, categoryId];
    
    onFilterChange({ ...filters, categories: newCategories });
  };

  const handleBrandChange = (brandId) => {
    const newBrands = filters.brands.includes(brandId)
      ? filters.brands.filter(id => id !== brandId)
      : [...filters.brands, brandId];
    
    onFilterChange({ ...filters, brands: newBrands });
  };

  const handlePriceChange = (event, newValue) => {
    onFilterChange({ ...filters, priceRange: newValue });
  };

  const handleStockChange = (event) => {
    onFilterChange({ ...filters, inStock: event.target.checked });
  };

  return (
    <Paper sx={{ p: 2, position: 'sticky', top: 100 }}>
      <Typography variant="h6" gutterBottom fontWeight="bold">
        Фильтры
      </Typography>

      {/* Фильтр по цене */}
      <Accordion defaultExpanded sx={{ mb: 1, '&:before': { display: 'none' } }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight="medium">Цена</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ px: 1 }}>
            <Slider
              value={filters.priceRange}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              min={priceRange.min}
              max={priceRange.max}
              sx={{ color: '#add8e6' }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
              <Typography variant="body2">{filters.priceRange[0]} USD</Typography>
              <Typography variant="body2">{filters.priceRange[1]} USD</Typography>
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>

      <Divider sx={{ my: 1 }} />

      {/* Фильтр по наличию */}
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox 
              checked={filters.inStock}
              onChange={handleStockChange}
              sx={{ color: '#add8e6', '&.Mui-checked': { color: '#add8e6' } }}
            />
          }
          label="В наличии"
        />
      </FormGroup>

      <Divider sx={{ my: 1 }} />

      {/* Категории */}
      <Accordion defaultExpanded sx={{ mb: 1, '&:before': { display: 'none' } }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight="medium">Категории</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {filterOptions.categories.map((category) => (
              <FormControlLabel
                key={category.id}
                control={
                  <Checkbox
                    checked={filters.categories.includes(category.id)}
                    onChange={() => handleCategoryChange(category.id)}
                    sx={{ color: '#add8e6', '&.Mui-checked': { color: '#add8e6' } }}
                  />
                }
                label={`${category.name} (${category.count})`}
              />
            ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>

      <Divider sx={{ my: 1 }} />

      {/* Бренды */}
      <Accordion defaultExpanded sx={{ '&:before': { display: 'none' } }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight="medium">Бренды</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {filterOptions.brands.map((brand) => (
              <FormControlLabel
                key={brand.id}
                control={
                  <Checkbox
                    checked={filters.brands.includes(brand.id)}
                    onChange={() => handleBrandChange(brand.id)}
                    sx={{ color: '#add8e6', '&.Mui-checked': { color: '#add8e6' } }}
                  />
                }
                label={`${brand.name} (${brand.count})`}
              />
            ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
};

export default FiltersPanel;