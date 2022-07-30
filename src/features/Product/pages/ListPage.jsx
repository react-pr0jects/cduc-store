import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { useMemo, useState } from 'react';
import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import productApi from '../../../api/productApi';
import FilterViewer from '../components/FilterViewer';
import ProductFilters from '../components/ProductFilters';
import ProductList from '../components/ProductList';
import ProductSkeletonList from '../components/ProductSkeletonList';
import ProductSort from '../components/ProductSort';
import queryString from 'query-string';

ListPage.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: {},

  left: {
    width: '250px',
  },

  right: {
    flex: '1 1 0',
  },
  pagination: {
    display: 'flex',
    flexDirection: 'row nowrap',
    justifyContent: 'center',
    marginTop: '30px',
    paddingBottom: '20px',
  },
}));
function ListPage(props) {
  const classes = useStyles();

  const history = useHistory();
  const location = useLocation();
  const queryParams = useMemo(() => {
    //Chuyển đổi chuỗi queryString về lại objects
    const params = queryString.parse(location.search);
    return {
      ...params,
      _page: Number.parseInt(params._page) || 1,
      _limit: Number.parseInt(params._limit) || 9,
      _sort: params._sort || 'salePrice:ASC',
      isPromotion: params.isPromotion === 'true',
      isFreeShip: params.isFreeShip === 'true',
    };
  }, [location.search]);

  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [pagination, setPagination] = useState({
    limit: 9,
    total: 10,
    page: 1,
  });

  //Call API
  useEffect(() => {
    (async () => {
      try {
        const { data, pagination } = await productApi.getAll(queryParams);
        setProductList(data);
        // console.log('hey: ', { data, pagination });
        setPagination(pagination);
      } catch (error) {
        console.log('Failed to fetch product list: ', error);
      }
      setLoading(false);
    })();
  }, [queryParams]);

  const handlePageChange = (e, page) => {
    const filters = {
      ...queryParams,
      _page: page,
    };
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters), //Chuyển đổi object Filters thành chuỗi queryString
    });
  };

  const handleSortChange = (newSortValue) => {
    const filters = {
      ...queryParams,
      _sort: newSortValue,
    };
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters), 
    });
  };

  const handleFiltersChange = (newFilters) => {
    const filters = {
      ...queryParams,
      ...newFilters,
    };
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters), 
    });
  };

  const setNewFilters = (newFilters) => {
    // setFilters(newFilters);
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(newFilters),
    });
  };

  return (
    <Box>
      <Container>
        <Grid container spacing={2}>
          <Grid item className={classes.left}>
            <Paper elevation={0}>
              <ProductFilters filters={queryParams} onChange={handleFiltersChange} />
            </Paper>
          </Grid>
          <Grid item className={classes.right}>
            <Paper elevation={0}>
              <ProductSort currentSort={queryParams._sort} onChange={handleSortChange} />
              <FilterViewer filters={queryParams} onChange={setNewFilters} />

              {loading ? <ProductSkeletonList length={9} /> : <ProductList data={productList} />}

              <Box className={classes.pagination}>
                <Pagination
                  onChange={handlePageChange}
                  color='secondary'
                  count={Math.ceil(pagination.total / pagination.limit)}
                  page={pagination.page}
                ></Pagination>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ListPage;

/* =============================================================================

import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { useMemo, useState } from 'react';
import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import productApi from '../../../api/productApi';
import FilterViewer from '../components/FilterViewer';
import ProductFilters from '../components/ProductFilters';
import ProductList from '../components/ProductList';
import ProductSkeletonList from '../components/ProductSkeletonList';
import ProductSort from '../components/ProductSort';
import queryString from 'query-string';

ListPage.propTypes = {};

function ListPage(props) {
  const classes = useStyles();

  const history = useHistory();
  const location = useLocation();
  const queryParams = queryString.parse(location.search); //Chuyển đổi chuỗi queryString về lại objects

  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [pagination, setPagination] = useState({
    limit: 9,
    total: 10,
    page: 1,
  });

  const [filters, setFilters] = useState({
    ...queryParams,
    _page: Number.parseInt(queryParams._page) || 1,
    _limit: Number.parseInt(queryParams._limit) || 9,
    _sort: queryParams._sort || 'salePrice:ASC',
  });

  //Đồng bộ filter lên URL
  useEffect(() => {
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters), //Chuyển đổi object Filters thành chuỗi queryString
    });
  }, [history, filters]);

  //Call API
  useEffect(() => {
    (async () => {
      try {
        const { data, pagination } = await productApi.getAll(filters);
        setProductList(data);
        console.log('hey: ', { data, pagination });
        setPagination(pagination);
      } catch (error) {
        console.log('Failed to fetch product list: ', error);
      }
      setLoading(false);
    })();
  }, [filters]);

  const handlePageChange = (e, page) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      _page: page,
    }));
  };

  const handleSortChange = (newSortValue) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      _sort: newSortValue,
    }));
  };

  const handleFiltersChange = (newFilters) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }));
  };

  const setNewFilters = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <Box>
      <Container>
        <Grid container spacing={2}>
          <Grid item className={classes.left}>
            <Paper elevation={0}>
              <ProductFilters filters={filters} onChange={handleFiltersChange} />
            </Paper>
          </Grid>
          <Grid item className={classes.right}>
            <Paper elevation={0}>
              <ProductSort currentSort={filters._sort} onChange={handleSortChange} />
              <FilterViewer filters={filters} onChange={setNewFilters} />

              {loading ? <ProductSkeletonList length={9} /> : <ProductList data={productList} />}

              <Box className={classes.pagination}>
                <Pagination
                  onChange={handlePageChange}
                  color='primary'
                  count={Math.ceil(pagination.total / pagination.limit)}
                  page={pagination.page}
                ></Pagination>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

============================================================================= */
