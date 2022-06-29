import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Header";

function AdminMain() {
  const [user, setUser] = useState([{}]);
  useEffect(
    {
      //axios.get("....store/${user.store")
    },
    []
  );

  return (
    <div>
      <Header user={user} setUser={setUser} />
      {/* add button for the addGrocery */}
      <Link to="/newItem">add Item</Link>
    </div>
  );
}

export default AdminMain;
