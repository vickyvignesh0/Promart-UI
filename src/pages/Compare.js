import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import {useEffect, useState} from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer, Grid,
} from '@mui/material';
// components
import {styled} from "@mui/material/styles";
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import Product from "./Product";
import ShopProductCard from "../sections/@dashboard/products/ProductCard";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Compare() {

  const [uids, setUids] = useState([sessionStorage.getItem('compare'), sessionStorage.getItem('compare1')]);
  const [titles, setTitles] = useState([sessionStorage.getItem('title'), sessionStorage.getItem('title1')]);
  const [tableHead, setTableHead] = useState([]);

  sessionStorage.removeItem("compare")
  sessionStorage.removeItem("compare1")

  useEffect(() => {
    setTableHead(TABLE_HEAD => [...TABLE_HEAD, { id: uids[0], label: titles[0], alignRight: false }])
    setTableHead(TABLE_HEAD => [...TABLE_HEAD, { id: uids[1], label: titles[1], alignRight: false }])
  },[]);

  return (

    <Page title="Compare">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
          <Typography variant="h4" gutterBottom>
            Compare
          </Typography>
        </Stack>

        <Grid container spacing={3}>
          {uids.map((uid) => (
              <Grid key={uid} item xs={6} >
                <Product uid={uid} />
              </Grid>
          ))}
        </Grid>
      </Container>
    </Page>
  );
}
