import { useRouter } from "next/router";
import VendorMenu from "../../components/vendor/VendorMenu";
const vendorPage = () => {
  const router = useRouter();
  const { vendorId } = router.query;

  return (
    <div>
      <p>VendorId: {vendorId}</p>
      <VendorMenu/>
    </div>
  );
};

export default vendorPage;