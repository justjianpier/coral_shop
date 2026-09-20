import { Brands } from "./components/brands";
import { Category } from "./components/category";
import { FeaturedProducts } from "./components/featured-products";
import { Hero } from "./components/hero";
import { Subscribe } from "./components/subscribe";

export function HomePage() {
  return (
    <>
      <Hero />
      <Category />
      <FeaturedProducts />
      <Brands />
      <Subscribe />
    </>
  );
}
