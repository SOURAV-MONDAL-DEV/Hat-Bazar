import Head from "next/head";
import AppStoreBanner from "@/Components/CommonComponents/AppStoreBanner/AppStoreBanner";
import CategoryCard from "@/Components/CustomerComponents/Cards/CategoryCard/CategoryCard";
import MobileAdsBanner from "@/Components/CommonComponents/MobileAdsBanner/MobileAdsBanner";
import ProductCard from "@/Components/CustomerComponents/Cards/ProductCard/ProductCard";
import HeroSection from "@/Components/CustomerComponents/HomeComponents/HeroSection";
import CustomerLayout from "@/Layouts/CustomerLayout";
import getCategories from "@/utils/getCategories";
import getProducts from "@/utils/getProducts";
import isLoggedIn from "@/auth/isLoggedIn";
import { useSelector } from "react-redux";
import { offeredProductItems } from "@/data/productData";

const home = ({ categories, products, loggedIn }) => {
  const { cart } = useSelector((state) => state.cart);


  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Home</title>
      </Head>
      <main>
        <section className="py-10">
          <HeroSection />
        </section>

        {/* ======================Featured Categories Part Start====================== */}
        <section className="py-10">
          <div className="container">
            <div className="text-center">
              <h2 className="font-bold text-xl sm:text-2xl">
                Featured Categories
              </h2>
              <p className="text-gray-primary text-sm sm:text-base">
                Choose your necessary products from this feature categories.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-2 mt-8">
              {categories?.map((category) => (
                <CategoryCard data={category} key={category.id} />
              ))}
            </div>
            {/* <UserSideNav /> */}
          </div>
        </section>
        {/* ======================Featured Categories Part End====================== */}

        {/* ======================Regular Products Part Start====================== */}
        <section className="py-10">
          <div className="container">
            <div>
              <div className="text-center">
                <h2 className="font-bold text-xl sm:text-2xl">
                  Regular Products for Daily Shopping
                </h2>
                <p className="text-gray-primary text-sm sm:text-base max-w-2xl mx-auto">
                  See all our popular products in this week. You can choose your
                  daily needs products from this list and get some special offer
                  with free shipping.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 pt-10">
                {offeredProductItems &&
                  offeredProductItems?.length > 0 &&
                  offeredProductItems.map((product) => (
                    <ProductCard
                      key={product.id}
                      data={product}
                      loggedIn={loggedIn}
                      existsInCart={cart?.some(
                        (item) => item?.product?.id === product.id
                      )}
                    />
                  ))}
              </div>
            </div>
          </div>
        </section>

        {/* ======================Regular Products Part End====================== */}

        {/* ======================Mobile Ads Banner Part Start====================== */}
        <MobileAdsBanner />

        {/* ======================Mobile Ads Banner Part End====================== */}

        <section className="py-10">
          <div className="container">
            <div>
              <div className="text-center space-y-4">
                <h2 className="font-bold text-xl sm:text-2xl">
                  Popular Products for Daily Shopping
                </h2>
                <p className="text-gray-primary text-sm sm:text-base max-w-2xl mx-auto">
                  See all our popular products in this week. You can choose your
                  daily needs products from this list and get some special offer
                  with free shipping.
                </p>
              </div>
              <div className="pt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {products &&
                  products?.length > 0 &&
                  products.map((product) => (
                    <ProductCard
                      key={product.id}
                      data={product}
                      loggedIn={loggedIn}
                      existsInCart={cart?.some(
                        (item) => item?.product?.id === product.id
                      )}
                    />
                  ))}
              </div>
            </div>
          </div>
        </section>

        {/* ======================App Store Section Part Start====================== */}
        <section className="py-10 bg-indigo-50">
          <div className="container">
            <AppStoreBanner />
          </div>
        </section>
        {/* ======================App Store Section Part End====================== */}
      </main>
    </>
  );
};

export async function getServerSideProps(context) {
  // const customer = await getCustomer(context);
  const categories = await getCategories();
  const products = await getProducts();
  const { loggedIn } = await isLoggedIn(context);

  return { props: { loggedIn, categories, products } };
}

home.getLayout = (page) => {
  const loggedIn = page.props.children.props.children[1].props.loggedIn;

  return <CustomerLayout loggedIn={loggedIn}>{page}</CustomerLayout>;
};
export default home;
