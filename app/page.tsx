import SearchForm from '@/components/SearchForm';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Premium Flight Experience Search
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Compare Business and First Class flights based on actual cabin features.
            No subjective scores - just factual data to help you choose.
          </p>
        </div>

        {/* Search Form */}
        <SearchForm />

        {/* Features Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center">
            <div className="text-4xl mb-3">🛏️</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Objective Data</h3>
            <p className="text-gray-600">
              See actual measurements and specifications, not subjective ratings
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">📊</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Visual Indicators</h3>
            <p className="text-gray-600">
              Quick visual status indicators help you scan options at a glance
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">🔍</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Full Transparency</h3>
            <p className="text-gray-600">
              Detailed specs and comparisons show exactly what you're getting
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
