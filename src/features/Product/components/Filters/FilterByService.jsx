import { Box, Checkbox, FormControlLabel, makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

FilterByService.propTypes = {
  filters: PropTypes.object,
  onChange: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.grey[300]}`,
  },

  list: {
    padding: 0,
    margin: 0,
    listStyleType: 'none',
    '& > li': {
      margin: 0,
    },
  },
}));

function FilterByService({ filters = {}, onChange }) {
  const classes = useStyles();

  // const [values, setValues] = useState({
    //Nếu isPromotion = null || undefined thì trả về false (Tức là chỉ có 2 giá trị true và false)
  //   isPromotion: Boolean(filters.isPromotion),
  //   isFreeShip: Boolean(filters.isFreeShip),
  // });

  const handleChange = (e) => {
    if(!onChange) return;
    const { name, checked } = e.target;
    onChange({ [name]: checked })
  };

  return (
    <Box className={classes.root}>
      <Typography variant='subtitle2'>DỊCH VỤ</Typography>

      <ul className={classes.list}>
        {[{value: 'isPromotion', label: 'Có Khuyến Mãi'},
          {value: 'isFreeShip', label: 'Vận Chuyển Miễn Phí'}
        ].map((service) => (
          <li key={service.value}>
            <FormControlLabel
              control={
                <Checkbox checked={Boolean(filters[service.value])} onChange={handleChange} name={service.value} color='secondary' />
              }
              label={service.label}
            />
          </li>
        ))}
      </ul>
    </Box>
  );
}

export default FilterByService;
