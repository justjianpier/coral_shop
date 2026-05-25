import { Header } from "../common/components/header";
import { Footer } from "../common/components/footer";
import { Hero } from "../components/hero";
// import { Category } from "../components/category";
import { Brands } from "../components/brands";
import { Subscribe } from "../components/subscribe";
import { Products } from "../components/products";

export function HomePage() {
  return (
    <>
      <Header />
      <Hero />
      {/* <Category /> */}
      <Products />
      <Brands />
      <Subscribe />
      <Footer />
    </>
  );
}
