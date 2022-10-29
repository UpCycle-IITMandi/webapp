const baseurl = "http://localhost:3000";
function Fetch(props) {
  console.log("Sending request : ", props);
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
