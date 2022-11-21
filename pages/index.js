import Detail from "../modules/property-details";
import {Banner} from "../components/banner"
import {QueryClient, QueryClientProvider} from 'react-query';
import DetailFromAPI from "../modules/property-details/property-details-api.js";

const queryClient = new QueryClient();

export default function PropertyDetails() {
  return (
    <>
      <Banner>Property Details</Banner>
      <Detail/>
      {/* <QueryClientProvider client={queryClient}>
          <DetailFromAPI/>
		  </QueryClientProvider> */}
    </>   
  );
}
