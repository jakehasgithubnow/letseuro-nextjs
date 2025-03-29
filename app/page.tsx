// app/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import { client, type Tool } from '../lib/sanity';

export const revalidate = 60;

export default async function HomePage() {
  // Fetch data directly within the Server Component
  const query = `*[_type == "tool" && defined(slug.current)]{
    _id,
    name,
    tagline,
    slug,
    heroImage{alt, asset->}
  }`;
  const tools = await client.fetch<Tool[]>(query);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                <span className="block">Everything you ever</span>
                <span className="text-orange-500">wanted to know</span>
                <span className="block">about EU software alternatives</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Your one-stop directory for EU-based alternatives to popular US tools with enhanced GDPR compliance.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/tools" className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors">
                  Get started
                </Link>
                <Link href="/contact" className="px-6 py-3 bg-white text-blue-600 font-medium rounded-md border-2 border-blue-600 hover:bg-blue-50 transition-colors">
                  Contact sales
                </Link>
              </div>
              <p className="text-gray-500 mt-4 text-sm">No credit card required. Upgrade any time.</p>
            </div>
            <div className="rounded-xl overflow-hidden">
              <Image
                src="/globe.svg"
                alt="EU Software Clones"
                width={600}
                height={400}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Tools List Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Discover EU-Based Software Alternatives</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Browse our curated collection of GDPR-compliant tools hosted in the European Union
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools?.length > 0 ? (
              tools.map((tool) => (
                <Link
                  key={tool._id}
                  href={`/tools/${tool.slug.current}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="h-40 bg-gray-100 relative">
                    {tool.heroImage?.asset ? (
                      <Image
                        src={tool.heroImage.asset.url}
                        alt={tool.heroImage.alt || tool.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Image
                          src="/window.svg"
                          alt="Tool icon"
                          width={48}
                          height={48}
                          className="opacity-50"
                        />
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{tool.name}</h3>
                    {tool.tagline && <p className="text-gray-600">{tool.tagline}</p>}
                    <div className="mt-4 flex justify-end">
                      <span className="text-blue-600 font-medium flex items-center">
                        Learn more
                        <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <p className="text-gray-500">No tools found. Add some in your Sanity Studio!</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose EU Alternatives?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Enjoy the benefits of software designed with European values and regulations in mind
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-blue-600 mb-4">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Enhanced GDPR Compliance</h3>
              <p className="text-gray-600">
                Software built from the ground up with European data protection regulations in mind.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-blue-600 mb-4">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">EU Data Hosting</h3>
              <p className="text-gray-600">
                All your data stays within EU borders, ensuring compliance with data residency requirements.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-blue-600 mb-4">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Competitive Pricing</h3>
              <p className="text-gray-600">
                Get all the features you need at prices that compete with or beat US-based alternatives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to explore EU-based alternatives?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover software solutions that respect your privacy, comply with EU regulations, and deliver the features you need.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/tools" a
              className="px-8 py-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
            >
              Browse All Tools
            </Link>
            <Link 
              href="/contact" 
              className="px-8 py-4 bg-white text-blue-600 font-medium rounded-md border-2 border-blue-600 hover:bg-blue-50 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}