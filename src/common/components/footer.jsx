export function Footer() {
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
        { id: "au1", name: "Our Story" },
        { id: "au2", name: "Carrers" },
        { id: "au3", name: "Press" },
        { id: "au4", name: "Sustainabilty" },
        { id: "au5", name: "Blog" },
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
    <footer className="bg-linear-to-b from-[#101727] to-[#000000]">
      <div className="max-w-7xl w-[90%] mx-auto">
        <h3 className="text-white text-xl mb-5">About Coral</h3>
        <p className="text-sm leading-relaxed mb-6 text-gray-400">
          Your marketplace for unique, handcrafted items. Discover one-of-a-kind
          pieces created by independent artisans from around the world.
        </p>
        {sectionLinks.map((section) => (
          <ul className="space-y-3 text-sm" key={section.id}>
            <h3 className="text-white text-xl mb-5">{section.section}</h3>
            {section.links.map((link) => (
              <li className="text-sm" key={link.id}>
                <a
                  className="text-gray-400 hover:text-coral-400 transition-colors hover:translate-x-1 inline-block"
                  href="#"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </footer>
  );
}
