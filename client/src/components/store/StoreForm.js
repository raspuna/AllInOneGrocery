import React, { useState } from "react";
import { Container, Form, FormGroup, Button } from "react-bootstrap";
import { STATES } from "../util/State";
import { Loader } from "@googlemaps/js-api-loader";
import Header from "../Header";
//google api loader
const loader = new Loader({
  apiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
  version: "weekly",
  libraries: ["places"],
});
function StoreForm(props) {
  const [errors, setErrors] = useState({});
  const { store, setStore } = props;
  const submitHandler = (e) => {
    e.preventDefault();
    loader.load().then(async (google) => {
      const request = {
        query: store.address + ", " + store.zipCode,
        fields: ["geometry"],
      };
      var service = new google.maps.Geocoder();
      const { results } = await service.geocode({ address: request.query });

      const lat = results[0].geometry.location.lat();
      const lng = results[0].geometry.location.lng();
      console.log(lat, lng);
      store.lat = lat;
      store.lng = lng;

      //const storeUpdated  ={...store, lat:...}
      console.log(store);

      props.submitHandler(store, setErrors);
    });
  };
  const changeHandler = (e) => {
    setStore({ ...store, [e.target.name]: e.target.value });

    console.log(store);
  };
  return (
    <Container>
      <Header />
      <Form onSubmit={submitHandler}>
        <FormGroup>
          <Form.Label>
            Name<span className="text-danger">*</span>:
          </Form.Label>
          <Form.Control
            type="text"
            value={store.storeName}
            name="storeName"
            onChange={changeHandler}
          />
          {errors.storeName && (
            <Form.Text className="text-danger">
              {errors.storeName.message}
            </Form.Text>
          )}
          <FormGroup>
            <Form.Label>Address:</Form.Label>
            <Form.Control
              type="text"
              value={store.address}
              name="address"
              onChange={changeHandler}
            />
            {errors.address && (
              <Form.Text className="text-danger">
                {errors.address.message}
              </Form.Text>
            )}
          </FormGroup>
          <FormGroup>
            <Form.Label>Address Detail:</Form.Label>
            <Form.Control
              type="text"
              value={store.addressDetail}
              name="addressDetail"
              onChange={changeHandler}
            />
            {errors.addressDetail && (
              <Form.Text className="text-danger">
                {errors.addressDetail.message}
              </Form.Text>
            )}
          </FormGroup>
          <FormGroup>
            <Form.Label>City:</Form.Label>
            <Form.Control
              type="text"
              value={store.city}
              name="city"
              onChange={changeHandler}
            />
            {errors.city && (
              <Form.Text className="text-danger">
                {errors.city.message}
              </Form.Text>
            )}
          </FormGroup>
          <FormGroup>
            <Form.Label>State:</Form.Label>
            <Form.Select name="state" onSelect={changeHandler}>
              {STATES.map((state) => {
                return <option value={state}>{state}</option>;
              })}
            </Form.Select>
            {errors.state && (
              <Form.Text className="text-danger">
                {errors.state.message}
              </Form.Text>
            )}
          </FormGroup>
          <FormGroup>
            <Form.Label>Zip code:</Form.Label>
            <Form.Control
              type="text"
              value={store.zipCode}
              name="zipCode"
              onChange={changeHandler}
            />
            {errors.zipCode && (
              <Form.Text className="text-danger">
                {errors.zipCode.message}
              </Form.Text>
            )}
          </FormGroup>

          <div className="d-flex mt-2 justify-content-center">
            <Button variant="success" type="submit">
              Submit
            </Button>
          </div>
        </FormGroup>
      </Form>
    </Container>
  );
}

export default StoreForm;
