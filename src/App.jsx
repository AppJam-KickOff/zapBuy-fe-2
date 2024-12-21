import { Link, useNavigate } from "react-router-dom";
import Loading from "./components/Loading";
import { useEffect, useState } from "react";
import { serverUrl } from "./util";

export default function App() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`${serverUrl}/user/profile`)
      .then((response) => {
        if (!response.ok) {
          navigate("/login");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched profile:", data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
        setLoading(false);
      });
  });
  return (
    <div className="p-4">
      <h1 className="text-3xl text-center">ZapBuy</h1>
      <Link to="/login">login</Link>
      {loading ? <Loading /> : null}
    </div>
  );
}
