import { Link } from "react-router";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const sectionLinks = [
    {
      id: 1,
      section: "Catalog",
      links: [
        { id: "c1", name: "All Products" },
        { id: "c2", name: "Men's Clothing" },
        { id: "c3", name: "Women's Clothing" },
        { id: "c4", name: "Jewelry" },
        { id: "c5", name: "Best Sellers" },
      ],
    },
    {
      id: 2,
      section: "About Us",
      links: [
        { id: "au1", name: "Our Story", url: "/our_story" },
        { id: "au2", name: "Careers", url: "/careers" },
        { id: "au3", name: "Press", url: "/press" },
        { id: "au4", name: "Sustainability", url: "/sustainability" },
        { id: "au5", name: "Blog", url: "/blog" },
      ],
    },
    {
      id: 3,
      section: "Customer Service",
      links: [
        { id: "cs1", name: "Contact Us" },
        { id: "cs2", name: "Shipping Info" },
        { id: "cs3", name: "Returns" },
        { id: "cs4", name: "FAQ" },
        { id: "cs5", name: "Size Guide" },
      ],
    },
  ];

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

          {sectionLinks.map((group) => (
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
                      href="#"
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
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
