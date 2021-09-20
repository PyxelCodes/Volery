import { useState, useEffect } from "react";
import { Serverbar } from "../modules/ui/Serverbar";
import { getUser } from "../modules/fetch/user";

export default function Home() {
  let [loading, setLoading] = useState(true);
  let [user, setUser] = useState({});

  useEffect(() => {
    getUser().then(setUser);
  }, []);

  if (loading) return <p>loading</p>;

  return (
    <>
      <Serverbar />
    </>
  );
}
