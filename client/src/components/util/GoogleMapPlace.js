import React, { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import Header from "../Header";

//google api loader
const loader = new Loader({
  apiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
  version: "weekly",
  libraries: ["places"],
});

function GoogleMapPlace() {
  const createMarker = (place, map, google) => {
    if (!place.geometry || !place.geometry.location) return;
    console.log(place);
    const marker = new google.maps.Marker({
      map,
      position: place.geometry.location,
    });
    marker.setClickable(true);
    marker.addListener("click", () => {
      console.log("User's address");
      //map.setCenter(marker.getPosition());
      console.log(marker.position.lat());
      console.log(marker.position.lng());
      //setTest(marker.position);
    });
  };
  const createMarker2 = (latLng, map, google) => {
    console.log(latLng);
    const marker = new google.maps.Marker({
      map,
      position: latLng,
    });
    marker.setClickable(true);
    marker.addListener("click", () => {
      //map.setCenter(marker.getPosition());

      console.log(latLng.name);
      console.log(marker.position.lat());
      console.log(marker.position.lng());

      //setTest(marker.position);
    });
  };
  const [test, setTest] = useState("");
  const ref = useRef();
  const containerStyle = { height: "400px" };
  const drawMap = () => {
    loader.load().then((google) => {
      const center = { lat: 33.872, lng: -118.252 };
      const map = new google.maps.Map(ref.current, {
        zoom: 15,
        center: center,
      });
      //location of the user
      const request = {
        query: "12333 W Olympic Blvd",
        fields: ["geometry"],
      };
      //stores near the user,
      const stores = [
        { lat: 34.0263599, lng: -118.455773, name: "trader Joe's" },
        { lat: 34.0224926, lng: -118.4390551, name: "whole foods...?" },
      ];
      var service = new google.maps.places.PlacesService(map);
      service.findPlaceFromQuery(request, function (results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          createMarker(results[0], map, google);
          for (var i = 0; i < stores.length; i++) {
            //TODO: distance function...
            //if (distance(results[0], stores[i]) > 5 ) continue;
            createMarker2(stores[i], map, google);
          }
          map.setCenter(results[0].geometry.location);
        }
      });
    });
  };
  useEffect(() => {
    drawMap();
  }, []);
  return (
    <>
      <div ref={ref} id="map" style={containerStyle}></div>
      {test && <div>{test}</div>}
    </>
  );
}

window.initMap = GoogleMapPlace;

export default GoogleMapPlace;
