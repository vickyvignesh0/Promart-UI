import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import {useEffect, useState} from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination, Box,
} from '@mui/material';
// components
import {styled} from "@mui/material/styles";
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';

import {db} from "../services/FirebaseService";

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

  const ProductImgStyle = styled('img')({
    top: 0,
    width: '65%',
    height: '100%',
    objectFit: 'contain',
    position: 'absolute',
  });

  const [products, setProducts] = useState([]);
  const [specification,setSpecification] = useState([]);
  const [ratings,setRatings] = useState([]);
  const [positive, setPositive] = useState([]);
  const [neutral, setNeutral] = useState([]);
  const [negative, setNegative] = useState([]);
  const [tableHead, setTableHead] = useState([]);

  useEffect(() => {
    const uids = [sessionStorage.getItem('compare'), sessionStorage.getItem('compare1')];
    for (let i = 0; i < uids.length; i+1) {
      db.collection("products").doc(uids[i]).get().then((Snapshot) => {

        // Loop through the data and store
        // it in array to display
        let data = {};
        if (Snapshot.exists) {
          data = Snapshot.data();
          console.log(data);
          setProducts(products => [...products, data]);
          setSpecification(specifications => [...specifications,data.specifications.specifications_flat]);
          setRatings(ratings => [...ratings, data.ratings.rating_text]);
          if(data.analysis) {
            setPositive(positive => [...positive, data.analysis.analysis.positive]);
            setNeutral(neutral => [...neutral, data.analysis.analysis.neutral]);
            setNegative(negative => [...negative, data.analysis.analysis.negative]);
          }
          setTableHead(TABLE_HEAD => [...TABLE_HEAD, { id: uids[i], label: data.title, alignRight: false }])
        } else {
          const request = new XMLHttpRequest();
          request.open("GET", `http://localhost:8007/product/${uids[i]}`);
          request.send();
          request.onload = () => {
            if (request.status === 200) {
              const resp = JSON.parse(request.response);
              setProducts(products => [...products, resp]);
              setSpecification(specifications => [...specifications,resp.specifications.specifications_flat]);
              setRatings(ratings => [...ratings, resp.ratings.rating_text]);
              if(resp.analysis) {
                setPositive(positive => [...positive, resp.analysis.analysis.positive]);
                setNeutral(neutral => [...neutral, resp.analysis.analysis.neutral]);
                setNegative(negative => [...negative, resp.analysis.analysis.negative]);
              }
              setTableHead(TABLE_HEAD => [...TABLE_HEAD, { id: uids[i], label: data.title, alignRight: false }])
            } else {
              console.log(`error ${request.status} ${request.statusText}`)
            }
          }
        }
      });
    }
  },[]);

  return (

    <Page title="Compare">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Compare
          </Typography>
        </Stack>

        <Card>
          <Scrollbar>
            <TableContainer sx={{mt:'30px', minWidth: 800 }}>
              <Table>
                <UserListHead
                  headLabel={tableHead}
                  rowCount={products.length}
                />
                <TableBody>
                  <TableRow>
                    <TableCell padding="checkbox">
                      {/* <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, name)} /> */}
                    </TableCell>
                    <TableCell align="left">
                      <Box sx={{ pt: '100%', position: 'relative' }}>
                        <ProductImgStyle alt="Product Image" src={products[0].image} />
                      </Box>
                    </TableCell>
                    <TableCell align="left">
                      <Box sx={{ pt: '100%', position: 'relative' }}>
                        <ProductImgStyle alt="Product Image" src={products[1].image} />
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      {/* <UserMoreMenu /> */}
                    </TableCell>
                  </TableRow>
                  <TableRow
                      hover
                      tabIndex={-1}
                  >
                    <TableCell padding="checkbox">
                      {/* <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, name)} /> */}
                    </TableCell>
                    <TableCell align="left">{products[0].price}</TableCell>
                    <TableCell align="left">{products[1].price}</TableCell>
                    {/* <TableCell align="left">{isVerified ? 'Yes' : 'No'}</TableCell> */}
                    {/* <TableCell align="left"> */}
                    {/*  <Label variant="ghost" color={(status === 'banned' && 'error') || 'success'}> */}
                    {/*    {sentenceCase(status)} */}
                    {/*  </Label> */}
                    {/* </TableCell> */}

                    <TableCell align="right">
                      {/* <UserMoreMenu /> */}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                      <TableCell colSpan={6} />
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>
      </Container>
    </Page>
  );
}
