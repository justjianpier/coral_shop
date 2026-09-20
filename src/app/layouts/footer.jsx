import { Link } from "react-router";

const FOOTER_SECTIONS = [
  {
    id: 1,
    section: "Catalog",
    links: [
      { id: "c1", name: "All Products", url: "/products" },
      {
        id: "c2",
        name: "Men's Clothing",
        url: "/products?category=men%27s%20clothing",
      },
      {
        id: "c3",
        name: "Women's Clothing",
        url: "/products?category=women%27s%20clothing",
      },
      { id: "c4", name: "Jewelry", url: "/products?category=jewelery" },
      {
        id: "c5",
        name: "Best Sellers",
        url: "/products?sort=best-sellers",
      },
    ],
  },
  {
    id: 2,
    section: "About Us",
    links: [
      { id: "au1", name: "Our Story", url: "/our-story" },
      { id: "au2", name: "Careers", url: "/careers" },
      { id: "au3", name: "Press", url: "/press" },
      { id: "au4", name: "Sustainability", url: "/sustainability" },
      { id: "au5", name: "Blogs", url: "/blogs" },
    ],
  },
  {
    id: 3,
    section: "Customer Service",
    links: [
      { id: "cs1", name: "Contact Us", url: "/contact-us" },
      { id: "cs2", name: "Shipping Info", url: "/shipping-info" },
      { id: "cs3", name: "Returns", url: "/returns" },
      { id: "cs4", name: "FAQ", url: "/faq" },
      { id: "cs5", name: "Size Guide", url: "/size-guide" },
    ],
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-linear-to-b from-[#101727] to-[#000000] text-gray-400 pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl w-[90%] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 xl:gap-16 pb-12">
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h2 className="text-white text-2xl font-bold tracking-wider">
              CORAL
            </h2>
            <p className="text-sm leading-relaxed max-w-sm">
              Your marketplace for unique, handcrafted items. Discover
              one-of-a-kind pieces created by independent artisans from around
              the world.
            </p>
          </div>

          {FOOTER_SECTIONS.map((group) => (
            <div key={group.id} className="flex flex-col gap-4">
              <h3 className="text-white font-semibold uppercase tracking-wider text-sm">
                {group.section}
              </h3>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.id}>
                    <Link
                      to={link.url}
                      className="text-sm hover:text-coral-400 transition-all hover:translate-x-1 inline-block duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-8 mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>&copy; {currentYear} Coral Store. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
