import React, { useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
// import GoogleMapAPI from "./util/GoogleMapPlace";

function DisplayStores(props) {
  // <div>GoogleMapAPI</div>
  const { storeList, setStoreList } = props;
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/stores")
      .then((res) => {
        console.log(res.data);
        setStoreList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(storeList);

  return (
    <div>
      {storeList &&
        storeList.map((store, index) => (
          <div key={index}>
            <p>
              <Link to={`/stores/${store._id}`}>{store.storeName}</Link>
            </p>
            {/* <p>Distance to: Would need the logic for searched location to store distance here?</p> */}
          </div>
        ))}
    </div>
  );
}
export default DisplayStores;
