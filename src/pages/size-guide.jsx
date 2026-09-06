import { Header } from "../common/components/header";
import { Footer } from "../common/components/footer";

export function SizeGuide() {
  return (
    <>
      <Header />
      <main className="grow bg-linear-to-br from-rose-50 via-orange-50 to-rose-50 py-16">
        <div className="max-w-7xl w-[90%] mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-[#FFE8E3] px-4 py-2 rounded-full mb-6 font-medium text-[#FF623F]">
              Customer Service
            </span>
            <h1 className="font-semibold text-4xl lg:text-5xl tracking-tight mb-6">
              Size Guide
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find your perfect fit with our comprehensive sizing charts.
            </p>
          </div>
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 max-w-4xl mx-auto">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-700">
                    <th className="py-4 px-6 font-semibold border-b border-gray-200">
                      Size
                    </th>
                    <th className="py-4 px-6 font-semibold border-b border-gray-200">
                      US
                    </th>
                    <th className="py-4 px-6 font-semibold border-b border-gray-200">
                      Bust (in)
                    </th>
                    <th className="py-4 px-6 font-semibold border-b border-gray-200">
                      Waist (in)
                    </th>
                    <th className="py-4 px-6 font-semibold border-b border-gray-200">
                      Hips (in)
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-6 font-medium text-gray-900">
                      Small (S)
                    </td>
                    <td className="py-4 px-6">4-6</td>
                    <td className="py-4 px-6">34-35</td>
                    <td className="py-4 px-6">26-27</td>
                    <td className="py-4 px-6">36-37</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-6 font-medium text-gray-900">
                      Medium (M)
                    </td>
                    <td className="py-4 px-6">8-10</td>
                    <td className="py-4 px-6">36-37</td>
                    <td className="py-4 px-6">28-29</td>
                    <td className="py-4 px-6">38-39</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-6 font-medium text-gray-900">
                      Large (L)
                    </td>
                    <td className="py-4 px-6">12-14</td>
                    <td className="py-4 px-6">38.5-40</td>
                    <td className="py-4 px-6">30.5-32</td>
                    <td className="py-4 px-6">40.5-42</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-medium text-gray-900">
                      X-Large (XL)
                    </td>
                    <td className="py-4 px-6">16-18</td>
                    <td className="py-4 px-6">41.5-43</td>
                    <td className="py-4 px-6">33.5-35</td>
                    <td className="py-4 px-6">43.5-45</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
