export function Careers() {
  return (
    <div className="min-h-screen bg-linear-to-br from-rose-50 via-orange-50 to-rose-50 py-16">
      <div className="max-w-7xl w-[90%] mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block bg-[#FFE8E3] px-4 py-2 rounded-full mb-6 font-medium text-[#FF623F]">
            Join Our Team
          </span>
          <h1 className="font-semibold text-4xl lg:text-5xl tracking-tight mb-6">
            Careers
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We are always looking for passionate, creative individuals to join
            the Coral Shop family.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Example Job Listing */}
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold mb-2">Frontend Developer</h3>
            <p className="text-gray-500 mb-4">Remote • Full-time</p>
            <button className="text-[#FF623F] font-medium hover:underline">
              View Details &rarr;
            </button>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold mb-2">Marketing Manager</h3>
            <p className="text-gray-500 mb-4">New York, NY • Full-time</p>
            <button className="text-[#FF623F] font-medium hover:underline">
              View Details &rarr;
            </button>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold mb-2">Customer Success</h3>
            <p className="text-gray-500 mb-4">Remote • Part-time</p>
            <button className="text-[#FF623F] font-medium hover:underline">
              View Details &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
