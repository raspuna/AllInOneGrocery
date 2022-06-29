import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import DisplayStores from "./store/DisplayStores";
import GoogleMapAPI from "./util/GoogleMapPlace";
function Index() {
  const [user, setUser] = useState(null);
  const [storeList, setStoreList] = useState([]);

  return (
    <div>
      <Header user={user} setUser={setUser} />
      {user && <GoogleMapAPI user={user} />}
      <DisplayStores storeList={storeList} setStoreList={setStoreList} />
    </div>
  );
}

export default Index;
