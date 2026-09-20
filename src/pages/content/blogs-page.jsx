import { ArrowUpRight, BookOpen, Gem, House, Leaf } from "lucide-react";
import { ContentCard, ContentPage } from "./components/content-page";

const ARTICLES = [
  {
    category: "Design",
    readTime: "5 min read",
    title: "The Art of Handcrafted Jewelry",
    description:
      "Explore the intricate process and dedication behind every handcrafted piece in our spring collection.",
    icon: Gem,
    accent: "from-rose-100 to-orange-50",
  },
  {
    category: "Sustainability",
    readTime: "4 min read",
    title: "An Eco-Friendly Packaging Guide",
    description:
      "Learn how recyclable and compostable materials help us deliver every order with less impact.",
    icon: Leaf,
    accent: "from-emerald-100 to-lime-50",
  },
  {
    category: "Lifestyle",
    readTime: "6 min read",
    title: "Decorating with Artisan Goods",
    description:
      "Bring warmth and personality into your home through objects made slowly, thoughtfully, and by hand.",
    icon: House,
    accent: "from-amber-100 to-stone-50",
  },
];

export function BlogsPage() {
  return (
    <ContentPage
      eyebrow="Stories & inspiration"
      title="Notes from the Coral community"
      description="Thoughtful stories about craft, conscious living, and the people behind the pieces we love."
      icon={BookOpen}
    >
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {ARTICLES.map((article) => {
          const Icon = article.icon;

          return (
            <ContentCard
              key={article.title}
              className="group overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_80px_-42px_rgba(15,23,42,0.45)] motion-reduce:transform-none"
            >
              <div
                className={`grid h-48 place-items-center bg-linear-to-br ${article.accent}`}
              >
                <span className="grid h-20 w-20 place-items-center rounded-[1.75rem] border border-white/80 bg-white/70 text-slate-700 shadow-xl shadow-slate-900/5 backdrop-blur">
                  <Icon className="h-8 w-8" aria-hidden="true" />
                </span>
              </div>
              <div className="p-5 sm:p-6">
                <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#e94727]">
                  <span>{article.category}</span>
                  <span className="text-stone-300" aria-hidden="true">
                    •
                  </span>
                  <span className="text-slate-400">{article.readTime}</span>
                </div>
                <h2 className="text-xl font-black tracking-tight text-slate-950">
                  {article.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {article.description}
                </p>
                <p className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#e94727]">
                  Article coming soon
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </p>
              </div>
            </ContentCard>
          );
        })}
      </div>
    </ContentPage>
  );
}
