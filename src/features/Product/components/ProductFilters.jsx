import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import FilterByCategory from './Filters/FilterByCategory';
import FilterByPrice from './Filters/FilterByPrice';
import FilterByService from './Filters/FilterByService';

ProductFilters.propTypes = {
  filters: PropTypes.object.isRequired,
  onChange: PropTypes.func,
};

function ProductFilters({ filters, onChange }) {
  const handleByCategory = (newCategoryId) => {
    if(!onChange) return;
    const newFilters = { 
      ...filters,
      "category.id": newCategoryId,
    }
    onChange(newFilters)
  }
  const handleByPrice = (value) => {
    if(onChange) onChange(value)
  }

  const handleByService = (value) => {
    if(onChange) onChange(value)
  }

    return (
        <Box>
            <FilterByCategory onChange={handleByCategory} />
            <FilterByPrice onChange={handleByPrice} />
            <FilterByService filters={filters} onChange={handleByService} />
        </Box>
    );
}

export default ProductFilters;