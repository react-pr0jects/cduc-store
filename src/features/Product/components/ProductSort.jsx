import React from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs } from '@material-ui/core';

ProductSort.propTypes = {
  currentSort: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

function ProductSort({ currentSort, onChange }) {
  const handleSortChange = (e, newValue) => {
    if (onChange) onChange(newValue);
  };

  return (
    <Tabs
      value={currentSort}
      indicatorColor='secondary'
      textColor='secondary'
      onChange={handleSortChange}
      aria-label='disabled tabs example'
    >
      <Tab label='Giá Thấp Đến Cao' value='salePrice:ASC'></Tab>
      <Tab label='Giá Cao Xuống Thấp' value='salePrice:DESC'></Tab>
    </Tabs>
  );
}

export default ProductSort;
