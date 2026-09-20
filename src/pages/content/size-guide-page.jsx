import { Info, Ruler } from "lucide-react";
import { ContentCard, ContentPage } from "./components/content-page";

const SIZES = [
  ["Small (S)", "4–6", "34–35", "26–27", "36–37"],
  ["Medium (M)", "8–10", "36–37", "28–29", "38–39"],
  ["Large (L)", "12–14", "38.5–40", "30.5–32", "40.5–42"],
  ["X-Large (XL)", "16–18", "41.5–43", "33.5–35", "43.5–45"],
];

export function SizeGuidePage() {
  return (
    <ContentPage
      eyebrow="Fit & measurements"
      title="Find the size that feels like you"
      description="Use the measurements below as a general guide. Individual product notes may include more specific fit details."
      icon={Ruler}
    >
      <ContentCard className="mx-auto max-w-5xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[42rem] text-left">
            <caption className="sr-only">Coral clothing size measurements in inches</caption>
            <thead className="bg-slate-950 text-white">
              <tr>
                {['Size', 'US', 'Bust (in)', 'Waist (in)', 'Hips (in)'].map((heading) => (
                  <th key={heading} scope="col" className="px-5 py-4 text-xs font-black uppercase tracking-wider sm:px-6">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {SIZES.map((size) => (
                <tr key={size[0]} className="transition-colors hover:bg-[#fff8f4]">
                  {size.map((value, index) => (
                    <td
                      key={value}
                      className={`px-5 py-5 text-sm sm:px-6 ${index === 0 ? 'font-black text-slate-900' : 'font-medium text-slate-500'}`}
                    >
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ContentCard>

      <div className="mx-auto mt-6 flex max-w-5xl items-start gap-4 rounded-2xl border border-[#ff5331]/15 bg-[#fff0eb] p-5">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-[#ff5331]" aria-hidden="true" />
        <div>
          <h2 className="font-black text-slate-900">How to measure</h2>
          <p className="mt-1 text-sm leading-6 text-slate-600">
            Keep the measuring tape level and comfortably close to your body. If
            you fall between sizes, choose the larger size for a more relaxed fit.
          </p>
        </div>
      </div>
    </ContentPage>
  );
}
