import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import GoogleMapAPI from "./util/GoogleMapPlace";
function Index() {
  const [user, setUser] = useState(null);

  return (
    <div>
      <Header user={user} setUser={setUser} />
      {user && <GoogleMapAPI user={user} />}
      <div>Store List HERE</div>
    </div>
  );
}

export default Index;
