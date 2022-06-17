import { faker } from '@faker-js/faker';
import { useTheme } from '@mui/material/styles';
import {Grid, Container, Typography, Card, CardMedia, CardContent, CardActions, Button} from '@mui/material';
import {useEffect, useState} from "react";
import Page from '../components/Page';
import Iconify from '../components/Iconify';
import {
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppWidgetSummary,
} from '../sections/@dashboard/app';
import {db} from "../services/FirebaseService";
import RelatedProductCard from "../sections/@dashboard/products/RelatedProductCard";

// ----------------------------------------------------------------------

export default function DashboardApp() {

    const [product, setProduct] = useState({});
    const [offer, setOffer] = useState({});
    const [specification,setSpecification] = useState("");
    const [specTitle,setSpecTitle] = useState([]);
    const [specText,setSpecText] = useState([]);
    const [chartLabel, setChartLabel] = useState([]);
    const [chartPrice, setChartPrice] = useState([]);
    const [chartSource, setChartSource] = useState([]);
    const [ratings,setRatings] = useState({});
    const [positive, setPositive] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [negative, setNegative] = useState(0);
    const [related, setRelated] = useState([]);
    const [show, setShow] = useState(false);
    const [compare, setCompare] = useState("")

    useEffect(() => {
        const chartL = [];
        const chartP = [];
        const chartS = [];
        const uid = sessionStorage.getItem('uid');
        db.collection("products").doc(uid).get().then((querySnapshot) => {

            // Loop through the data and store
            // it in array to display
            let data = {};
            if(querySnapshot.exists){
                data = querySnapshot.data();
                setProduct(data);
                setSpecTitle(data.specifications.details.title);
                setSpecText(data.specifications.details.text);
                setSpecification(data.specifications.specifications_flat);
                setRatings(data.ratings.ratings_breakdown);
                setRelated(data.related);
                setOffer(data.best_offer);

                if(data.offers) {
                    // eslint-disable-next-line react/prop-types
                    for (let i = 0; i < data.offers.length; i += 1) {
                        // eslint-disable-next-line react/prop-types
                        chartL.push(data.offers[i].shop);
                        // eslint-disable-next-line react/prop-types
                        chartP.push(data.offers[i].price);
                        chartS.push(data.offers[i].source);
                    }
                    setChartLabel(chartL);
                    setChartPrice(chartP);
                    setChartSource(chartS);
                }

                setPositive(data.analysis.analysis.positive);
                setNeutral(data.analysis.analysis.neutral);
                setNegative(data.analysis.analysis.negative);
            }
            else{
                const request = new XMLHttpRequest();
                request.open("GET", `http://localhost:8007/product/${uid}`);
                request.send();
                request.onload = () => {
                    if(request.status === 200){
                        const resp = JSON.parse(request.response);
                        console.log(resp);
                        setProduct(resp);
                        setSpecTitle(resp.specifications.details.title);
                        setSpecText(resp.specifications.details.text);
                        setSpecification(resp.specifications.specifications_flat);
                        setRatings(resp.ratings.ratings_breakdown);
                        setRelated(resp.related);
                        setOffer(resp.best_offer);

                        if(resp.offers) {
                            // eslint-disable-next-line react/prop-types
                            for (let i = 0; i < resp.offers.length; i += 1) {
                                // eslint-disable-next-line react/prop-types
                                chartL.push(resp.offers[i].shop);
                                // eslint-disable-next-line react/prop-types
                                chartP.push(resp.offers[i].price);
                                chartS.push(resp.offers[i].source);
                            }
                            setChartLabel(chartL);
                            setChartPrice(chartP);
                            setChartSource(chartS);
                        }

                        if(resp.analysis){
                            setPositive(resp.analysis.analysis.positive);
                            setNeutral(resp.analysis.analysis.neutral);
                            setNegative(resp.analysis.analysis.negative);
                        }
                    }else{
                        console.log(`error ${request.status} ${request.statusText}`)
                    }
                }
            }
        });
    },[]);

  const theme = useTheme();
  window.onload = () => {
      const compare = sessionStorage.getItem('compare');
      setCompare(compare);
  }

  const handleCompare = () => {
    console.log(product.uid);
    if(compare){
        sessionStorage.setItem('compare1', product.uid);
        sessionStorage.setItem('title', product.title);
        window.location.href = '/dashboard/compare'
    }else{
        sessionStorage.setItem('compare', product.uid)
        sessionStorage.setItem('title1', product.title)
    }
  }

  return (
      // eslint-disable-next-line react/prop-types
    <Page title={product.title}>
      <Container maxWidth="xl">
        <Typography variant="h3" sx={{ mb: 5 }}>
            {/* eslint-disable-next-line react/prop-types */}
            PRO-MART ANALYSIS
        </Typography>

        <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
                <Card style={{height: '29rem', padding:'20px'}}>
                    <CardMedia
                        style={{top:0, marginTop:'30px'}}
                        component="img"
                        // eslint-disable-next-line react/prop-types
                        image={product.image}
                        alt="green iguana"
                    />
                </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={8}>
                <Card style={{height: '29rem',display:"inline-block", padding:'10px'}}>
                    <CardContent>
                        <Typography gutterBottom variant="h4" component="div">
                            {/* eslint-disable-next-line react/prop-types */}
                            {product.title}
                        </Typography>
                        <Typography gutterBottom variant="h6" component="div">
                            {/* eslint-disable-next-line react/prop-types */}
                            ₹ {offer.price}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" maxHeight="13.5rem" overflow='hidden'>
                            {/* eslint-disable-next-line react/prop-types */}
                            {specification}.
                        </Typography>
                    </CardContent>
                    <CardActions style={{position:'absolute', bottom:0, marginBottom:'10px', marginLeft:'5px'}}>
                        <Button size="medium" href={offer.url} target='_blank'>
                            <Iconify icon="emojione-v1:shopping-bags" sx={{mr:'5px'}}/>Shop @ {offer.shop}
                        </Button>
                    </CardActions>
                    <CardActions style={{position:'absolute', right:0, bottom:0, marginBottom:'10px', marginRight:'10px'}}>
                        <Button size="medium" onClick={handleCompare}>
                            <Iconify icon="eva:pie-chart-2-fill" sx={{mr:'2px'}}/> Compare
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <AppWidgetSummary title="Five Star" total={ratings.five_star} icon={'twemoji:smiling-face-with-halo'} />
          </Grid>

          <Grid item xs={12} sm={6} md={2.4}>
            <AppWidgetSummary title="Four Star" total={ratings.four_star} color="info" icon={'twemoji:grinning-face-with-big-eyes'} />
          </Grid>

          <Grid item xs={12} sm={6} md={2.4}>
            <AppWidgetSummary title="Three Star" total={ratings.three_star} color="warning" icon={'twemoji:neutral-face'} />
          </Grid>

          <Grid item xs={12} sm={6} md={2.4}>
            <AppWidgetSummary title="Two Star" total={ratings.two_star} color="error" icon={'twemoji:anguished-face'} />
          </Grid>

            <Grid item xs={12} sm={6} md={2.4}>
                <AppWidgetSummary title="One Star" total={ratings.one_star} color="error" icon={'twemoji:angry-face'} />
            </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Price Comparisons"
              subheader=""
              chartSource={chartSource}
              chartLabels={chartLabel}
              chartData={[
                  {
                      name: 'Team A',
                      type: 'column',
                      fill: 'solid',
                      data: chartPrice,
                  }
              ]}
            />
          </Grid>

           <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Pro-Mart Analysis"
              chartData={[
                { label: 'Positive', value: positive },
                { label: 'Neutral', value: neutral },
                { label: 'Negative', value: negative },
              ]}
              chartColors={[
                theme.palette.chart.green[0],
                theme.palette.chart.yellow[0],
                  theme.palette.chart.red[0],
              ]}
            />
           </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Specifications"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: specTitle[index],
                type: `order${index + 1}`,
                str: specText[index]
              }))}
            />
          </Grid>

            <Grid item xs={12} md={6} lg={4}>
                <AppOrderTimeline
                    title=""
                    style={{paddingTop:'25px'}}
                    list={[...Array(5)].map((_, index) => ({
                        id: faker.datatype.uuid(),
                        title: specTitle[index + 5],
                        type: `order${index + 1}`,
                        str: specText[index + 5],
                    }))}
                />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
                <AppOrderTimeline
                    title=""
                    style={{paddingTop:'25px'}}
                    list={[...Array(5)].map((_, index) => ({
                        id: faker.datatype.uuid(),
                        title:specTitle[index + 10],
                        type: `order${index + 1}`,
                        str: specText[index + 10],
                    }))}
                />
            </Grid>

            <Grid item xs={12} md={12} lg={12}>
                <Typography variant="h5">
                    {/* eslint-disable-next-line react/prop-types */}
                    Related Products
                </Typography>
            </Grid>

            {related.map((product) => (
                <Grid key={product.title} item xs={12} sm={6} md={3}>
                    <RelatedProductCard product={product} />
                </Grid>
            ))}

          {/* <Grid item xs={12} md={6} lg={4}> */}
          {/*  <AppTrafficBySite */}
          {/*    title="Traffic by Site" */}
          {/*    list={[ */}
          {/*      { */}
          {/*        name: 'FaceBook', */}
          {/*        value: 323234, */}
          {/*        icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} height={32} />, */}
          {/*      }, */}
          {/*      { */}
          {/*        name: 'Google', */}
          {/*        value: 341212, */}
          {/*        icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} height={32} />, */}
          {/*      }, */}
          {/*      { */}
          {/*        name: 'Linkedin', */}
          {/*        value: 411213, */}
          {/*        icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} height={32} />, */}
          {/*      }, */}
          {/*      { */}
          {/*        name: 'Twitter', */}
          {/*        value: 443232, */}
          {/*        icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} height={32} />, */}
          {/*      }, */}
          {/*    ]} */}
          {/*  /> */}
          {/* </Grid> */}
          
          {/* <Grid item xs={12} md={6} lg={8}> */}
          {/*  <AppTasks */}
          {/*    title="Tasks" */}
          {/*    list={[ */}
          {/*      { id: '1', label: 'Create FireStone Logo' }, */}
          {/*      { id: '2', label: 'Add SCSS and JS files if required' }, */}
          {/*      { id: '3', label: 'Stakeholder Meeting' }, */}
          {/*      { id: '4', label: 'Scoping & Estimations' }, */}
          {/*      { id: '5', label: 'Sprint Showcase' }, */}
          {/*    ]} */}
          {/*  /> */}
          {/* </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
}
