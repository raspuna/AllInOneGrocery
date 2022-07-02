import React, { useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Container, Row, Col } from "react-bootstrap";
import {
  ALDI,
  CVS,
  BIGY,
  FRESH,
  SHAWS,
  STOPSHOP,
  PRICERITE,
  WALMART,
  WEGMANS,
} from "../AssetsIndex";

// import GoogleMapAPI from "./util/GoogleMapPlace";

function DisplayStores(props) {
  // <div>GoogleMapAPI</div>
  const { storeList, setStoreList } = props;
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_ADDRESS}/api/stores`)
      .then((res) => {
        console.log(res.data);
        setStoreList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(storeList);

  return (
    <>
      <Container>
        <Row md={7}>
          {storeList &&
            storeList.map((store, index) => (
              <div key={index}>
                <p>
                  <Link to={`/stores/${store._id}`}>{store.storeName}</Link>
                </p>
                <p>
                  Distance to: Would need the logic for searched location to
                  store distance here?
                </p>
              </div>
            ))}

          <Col>
            <Swiper
              slidesPerView={5}
              spaceBetween={30}
              loop={true}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Pagination, Navigation]}
              className="mySwiper"
            >
              <SwiperSlide className="felx">
                <div className="circ">
                  <ALDI />
                </div>
                <h1 className="title"> Delivery & Pickup</h1>
                <span className="info"> 20.5 mi away </span>
              </SwiperSlide>
              {/*  */}
              <SwiperSlide className="felx">
                <div className="circ">
                  <BIGY />
                </div>
                <h1 className="title"> Delivery & Pickup</h1>
                <span className="info"> 10.2 mi away </span>
              </SwiperSlide>
              {/*  */}
              <SwiperSlide className="felx">
                <div className="circ">
                  <CVS />
                </div>
                <h1 className="title"> Delivery & Pickup</h1>
                <span className="info"> 10.2 mi away </span>
              </SwiperSlide>
              {/*  */}
              <SwiperSlide className="felx">
                <div className="circ">
                  <FRESH />
                </div>
                <h1 className="title"> Delivery & Pickup</h1>
                <span className="info"> 10.2 mi away </span>
              </SwiperSlide>
              {/*  */}
              <SwiperSlide className="felx">
                <div className="circ">
                  <SHAWS />
                </div>
                <h1 className="title"> Delivery & Pickup</h1>
                <span className="info"> 10.2 mi away </span>
              </SwiperSlide>
              {/*  */}
              <SwiperSlide className="felx">
                <div className="circ">
                  <STOPSHOP />
                </div>
                <h1 className="title"> Delivery & Pickup</h1>
                <span className="info"> 10.2 mi away </span>
              </SwiperSlide>
              {/*  */}
              <SwiperSlide className="felx">
                <div className="circ">
                  <WALMART />
                </div>
                <h1 className="title"> Delivery & Pickup</h1>
                <span className="info"> 10.2 mi away </span>
              </SwiperSlide>
              {/*  */}
              <SwiperSlide className="felx">
                <div className="circ">
                  <PRICERITE />
                </div>
                <h1 className="title"> Delivery & Pickup</h1>
                <span className="info"> 10.2 mi away </span>
              </SwiperSlide>
              {/*  */}
              <SwiperSlide className="felx">
                <div className="circ">
                  <WEGMANS />
                </div>
                <h1 className="title"> Delivery & Pickup</h1>
                <span className="info"> 10.2 mi away </span>
              </SwiperSlide>
            </Swiper>
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default DisplayStores;
