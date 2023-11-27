import axios from "axios";
const maps = async () => {
  const query = new URLSearchParams({
    q: "jak",
    locale: "id",
    limit: "5",
    reverse: "false",
    debug: "false",
    point: "",
    provider: "default",
    key: "5a684d84-23f1-442e-a28a-f89e6ed18838",
  }).toString();

  const resp = await axios.get(`https://graphhopper.com/api/1/geocode?${query}`);
  return resp;
};

const Google = () => {
  return <div></div>;
};

export default Google;
