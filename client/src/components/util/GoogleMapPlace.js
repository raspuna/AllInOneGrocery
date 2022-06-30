import React, { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { useNavigate } from "react-router-dom";

//google api loader
const loader = new Loader({
  apiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
  version: "weekly",
  libraries: ["places"],
});

function GoogleMapPlace(props) {
  const navigate = useNavigate();
  const { user, storeList } = props;
  const createMarker = (place, map, google) => {
    console.log(place);
    if (!place.geometry || !place.geometry.location) return;
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
  const createMarker2 = (store, map, google) => {
    console.log(store);
    const marker = new google.maps.Marker({
      map,
      position: store,
    });
    marker.setClickable(true);
    marker.addListener("click", () => {
      console.log(store.storeName);
      console.log(marker.position.lat());
      console.log(marker.position.lng());
      console.log(store._id);
      navigate(`/stores/${store._id}`);
    });
  };
  const ref = useRef();
  const containerStyle = { height: "400px" };
  const drawMap = () => {
    loader.load().then((google) => {
      const center = { lat: 33.872, lng: -118.252 };
      const map = new google.maps.Map(ref.current, {
        zoom: 12,
        center: center,
      });
      //location of the user
      const request = {
        query: user.address + ", " + user.zipCode,
        fields: ["geometry"],
      };
      console.log(request);
      if (request.query === null) {
        return;
      }
      var service = new google.maps.places.PlacesService(map);
      service.findPlaceFromQuery(request, function (results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          createMarker(results[0], map, google);
          for (var i = 0; i < storeList.length; i++) {
            //TODO: distance function...
            //if (distance(results[0], stores[i]) > 5 ) continue;
            createMarker2(storeList[i], map, google);
          }
          map.setCenter(results[0].geometry.location);
        }
      });
    });
  };
  useEffect(() => {
    drawMap();
  }, [storeList]);
  return (
    <>
      <div ref={ref} id="map" style={containerStyle}></div>
    </>
  );
}

window.initMap = GoogleMapPlace;

export default GoogleMapPlace;
