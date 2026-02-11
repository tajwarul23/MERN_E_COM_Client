import React, { use, useContext } from "react";
import AppContext from "../../Context/AppContext";

const Profile = () => {
  const { user } = useContext(AppContext);
  return (
    <>
      <div>
        <h1 className="text-center text-2xl pt-5 font-bold">
          Welcome {user?.name}
        </h1>
      </div>
    </>
  );
};

export default Profile;
