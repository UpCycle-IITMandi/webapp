import React, { useEffect, useState } from "react";
import { Box, Grid, Button } from "@mui/material";
import Fetch from "../../common/Fetch";
import VendorCard from "./VendorCard";
import Cookies from "js-cookie";
import AddVendorModal from "./AddVendorModal";

function Vendors({ size = 3, isEditable = false }) {
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    const getVendors = async () => {
      var response = await Fetch({
        header: {
          "Content-type": "application/json",
          Authorization: Cookies.get("super user token")
            ? Cookies.get("super user token")
            : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InBhc3N3b3JkIjoiaGVsbG8ifSwiaWF0IjoxNjY4MTE3MDg3fQ.o-eqcZ8yTfD8grMjsEsHymx_RXlw0HLGAuWz2QxuP3w",
        },
        route: "/api/v1/vendor/getAll",
      });
      console.log(response.vendors);
      setVendors(response.vendors);
    };
    getVendors();
  }, []);

  const updateVendors = (vendor) => {
    let _vendors = JSON.parse(JSON.stringify(vendors));
    const i = _vendors.findIndex((vendors) => vendors._id === vendor._id);
    if (i > -1) _vendors[i] = vendor;
    else _vendors.push(vendor);
    setVendors(_vendors);
  };

  return (
    <>
      {Cookies.get("super user token") && (
        <Button color="primary" variant="contained" style={{"margin-top":"10px"}}>
          <AddVendorModal updateFunction={updateVendors} />
        </Button>
      )}
      <Box sx={{ flexGrow: 1, paddingTop: "18px" }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {vendors.map((i) => (
            <Grid item xs={2} sm={4} md={size} key={i._id}>
              <VendorCard
                data={i}
                isEditable={isEditable}
                updateFunction={updateVendors}
              ></VendorCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}

export default Vendors;
