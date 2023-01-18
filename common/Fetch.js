// require('dotenv').config()
const baseurl = process.env.BACKEND_URL

function Fetch(props) {
  console.log("Sending request : ", props);
  console.log("Base url" , baseurl)
  return fetch(baseurl + props.route, {
    headers:props.header,
    method: props.type,
    body: (props.body),
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
}

export default Fetch;
