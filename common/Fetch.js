const baseurl = "http://localhost:3000";
function Fetch(props) {
  console.log("Sending request : ", props);
  return fetch(baseurl + props.route, {
    method: props.type,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: new URLSearchParams(props.body),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Sending data : ", data);
      return data;
    });
}
export default Fetch;
