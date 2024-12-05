import { FeaturedProducts, Hero } from "../components";
import { customFetch } from "../utils/index"

const url = '/products?featured=true';

const featuredProductQuery = {
  queryKey: ['featuredProducts'],
  queryFn: () => customFetch(url)

}

export const loader = (queryClient) => async ({request}) => {  
  //const response = await customFetch(url);
  const response = await queryClient.ensureQueryData(featuredProductQuery);
  console.log(response);
  const products = response.data.data;
  return {products};
}

const Landing = () => {
  return (
    <>
      <Hero />
      <FeaturedProducts />
    </>
  )
}
export default Landing;