import { Box, Button, makeStyles, TextField, Typography } from '@material-ui/core';
import { useState } from 'react';
import PropTypes from 'prop-types';

FilterByPrice.propTypes = {
  onChange: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.grey[300]}`,
  },
  
  range: {
    display: 'flex',
    flexDirection: 'row nowrap',
    alignItems: 'center',
    margin: '8px 0',
    '& > span': {
      margin: '0 8px',
    },
  },

  button: {
    // marginRight: '8px',
    display: 'flex',
    flexDirection: 'row nowrap',
    justifyContent: 'space-between',

    '& > button': {
      width: '45%',
    }
  }

}));

function FilterByPrice({ onChange }) {
  const classes = useStyles();

  const [values, setValues] = useState({
    salePrice_gte: 0,
    salePrice_lte: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (onChange) onChange(values);
  };

  const handleDeletePrice = () => {
    //Set 2 giá trị gte và lte về 0 khi submit
    setValues({
      salePrice_gte: 0,
      salePrice_lte: 0,
    });
  };



  return (
    <Box className={classes.root}>
      <Typography variant='subtitle2'>CHỌN KHOẢNG GIÁ</Typography>

      <Box className={classes.range}>
        <TextField name='salePrice_gte' value={values.salePrice_gte} onChange={handleChange} />
        <span> - </span>
        <TextField name='salePrice_lte' value={values.salePrice_lte} onChange={handleChange} />
      </Box>

      <Box className={classes.button}>
        <Button  variant='outlined' color='secondary' size='small' onClick={handleSubmit}>
          Áp Dụng
        </Button>
        <Button variant='outlined' color='secondary' size='small' onClick={handleDeletePrice}>
          Xóa
        </Button>
      </Box>
    </Box>
  );
}

export default FilterByPrice;
