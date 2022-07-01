import React, { useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Container, Row, Col } from "react-bootstrap";

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
        <Row>
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
            {" "}
            <Swiper
              slidesPerView={7}
              spaceBetween={30}
              loop={true}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Pagination, Navigation]}
              className="mySwiper"
            >
              <SwiperSlide>Slide 1</SwiperSlide>
              <SwiperSlide>Slide 2</SwiperSlide>
              <SwiperSlide>Slide 3</SwiperSlide>
              <SwiperSlide>Slide 4</SwiperSlide>
              <SwiperSlide>Slide 5</SwiperSlide>
              <SwiperSlide>Slide 6</SwiperSlide>
              <SwiperSlide>Slide 7</SwiperSlide>
              <SwiperSlide>Slide 8</SwiperSlide>
              <SwiperSlide>Slide 9</SwiperSlide>
            </Swiper>
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default DisplayStores;
