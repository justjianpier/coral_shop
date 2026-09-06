import { Hero } from "../components/hero";
import { Brands } from "../components/brands";
import { Products } from "../components/products";
import { Category } from "../components/category";
import { Subscribe } from "../components/subscribe";
import { Header } from "../common/components/header";
import { Footer } from "../common/components/footer";

export function HomePage() {
  return (
    <>
      <Header />
      <Hero />
      <Category />
      <Products />
      <Brands />
      <Subscribe />
      <Footer />
    </>
  );
}
