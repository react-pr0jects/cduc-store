import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Box, Chip, makeStyles } from '@material-ui/core';

FilterViewer.propTypes = {
  filters: PropTypes.object,
  onChange: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row nowrap',
    alignItems: 'center',
    listStyleType: 'none',
    margin: theme.spacing(2, 1),
    padding: 0,
    
    '& > li': {
      margin: 0,
      padding: theme.spacing(1),
    },
  },
}));

const FILTER_LIST = [
  { 
    id: 1,
    getLabel: () => 'Miễn Phí Giao Hàng',
    isActive: (filters) => filters.isFreeShip, //Active khi isFreeShip = true
    isVisible: () => true, //Luôn luôn show nên k truyền gì
    isRemovable: false, //Mặc định là không thể remove
    onRemove: () => {},  //Không có nút xóa
    onToggle: (filters) => {
      const newFilters = {...filters}
      //Nếu isFreeShip đang bật thì xóa
      if(newFilters.isFreeShip){
        delete newFilters.isFreeShip
      }else {
        //Nếu isFreeShip đang tắt thì bật lên
        newFilters.isFreeShip = true
      }
      return newFilters
    },
  },
  { 
    id: 2,
    getLabel: () => 'Có Khuyễn Mãi',
    isActive: () => true,
    isVisible: (filters) => filters.isPromotion,
    isRemovable: true,
    onRemove: (filters) => {
      const newFilters = {...filters}
      delete newFilters.isPromotion
      return newFilters
    },
    onToggle: () => {},
  
  },
  { 
    id: 3,
    getLabel: (filters) => `Từ ${filters.salePrice_gte} đến ${filters.salePrice_lte}`,
    isActive: () => true,
    //Check object Filters có chứa key là (salePrice_lte && salePrice_gte) thì trả về true
    isVisible: (filters) => Object.keys(filters).includes('salePrice_lte') && Object.keys(filters).includes('salePrice_gte'),
    isRemovable: true,
    onRemove: (filters) => {
      const newFilters = {...filters}
      delete newFilters.salePrice_gte
      delete newFilters.salePrice_lte
      return newFilters
    },
    onToggle: () => {},
  
  },
  // { 
  //   id: 4,
  //   getLabel: () => 'Danh Mục',
  //   isActive: () => true,
  //   isVisible: (filters) => true,
  //   isRemovable: true,
  //   onRemove: (filters) => {},
  //   onToggle: (filters) => {},
  
  // }
]

function FilterViewer({ filters = {}, onChange = null }) {
  const classes = useStyles();

  const visibleFilters = useMemo(() => {
    return FILTER_LIST.filter((x) => x.isVisible(filters))
  }, [filters])

  return (
    <Box component="ul" className={classes.root}>
      {visibleFilters.map((x) => (
        <li key={x.id}>
          <Chip
            size='small'
            label = {x.getLabel(filters)}
            color = {x.isActive(filters) ? 'secondary' : 'default'}
            clickable = {!x.isRemovable}
            onClick={x.isRemovable ? null : () => {
              if(!onChange) return;
              const newFilters = x.onToggle(filters)
              onChange(newFilters)
            }}
            onDelete = {x.isRemovable ? () => {
              if(!onChange) return;
              const newFilters = x.onRemove(filters)
              onChange(newFilters)
            } : null}
          />
        </li>
      ))}
    </Box>
  )

}

export default FilterViewer;
