// app/tools/[slug]/page.tsx

import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import FeatureComparison from '../../components/FeatureComparison';

import {
  client,
  getCommonContent,
  urlFor,
  type CommonContent,
  type Tool,
  type FeatureItem,
  type ComparisonPoint,
  type PricingTier,
  type ImageWithAlt
} from '../../../lib/sanity';

type ToolPageProps = {
  params: {
    slug: string;
  };
};

export const revalidate = 60;

const FeatureSection: React.FC<{ features: FeatureItem[] | undefined }> = ({ features }) => {
  if (!features || features.length === 0) return null;
  return (
    <section className="my-12">
      <h2 className="text-3xl font-bold mb-8">Key Features & Benefits</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => (
          <div key={feature._key} className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
            <p className="text-gray-600 leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const ComparisonSection: React.FC<{ 
  points: ComparisonPoint[] | undefined,
  toolName: string,
  usAlternativeName?: string,
  comparisonTitle?: string,
  comparisonSubtitle?: string,
  comparisonTagline?: string
}> = ({ 
  points, 
  toolName, 
  usAlternativeName,
  comparisonTitle,
  comparisonSubtitle,
  comparisonTagline
}) => {
  if (!points || points.length === 0) return null;
  
  return (
    <FeatureComparison 
      comparisonPoints={points} 
      toolName={toolName}
      usAlternativeName={usAlternativeName || 'US Alternative'} 
      comparisonTitle={comparisonTitle}
      comparisonSubtitle={comparisonSubtitle}
      comparisonTagline={comparisonTagline}
    />
  );
};

const PricingSection: React.FC<{ tiers: PricingTier[] | undefined }> = ({ tiers }) => {
  if (!tiers || tiers.length === 0) return null;
  return (
    <section className="my-12 bg-gray-50 py-12 px-6 rounded-xl">
      <h2 className="text-3xl font-bold mb-10 text-center">Pricing Plans</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tiers.map((tier) => (
          <div key={tier._key} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
            <div className="p-6">
              <h3 className="text-xl font-bold text-center mb-4">{tier.name}</h3>
              <p className="text-4xl font-bold text-center text-blue-600 mb-6">{tier.price}</p>
              <ul className="space-y-3 mb-8">
                {tier.featuresList?.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-auto p-6 pt-0">
              <button className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors">
                {tier.ctaText || 'Get Started'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const AboutUsSection: React.FC<{ content: string | undefined }> = ({ content }) => {
  if (!content) return null;
  return (
    <section className="my-12 bg-gray-50 p-8 rounded-lg">
      <h2 className="text-3xl font-bold mb-4">About Us</h2>
      <p className="text-gray-700 leading-relaxed">{content}</p>
    </section>
  );
};

const TestimonialsSection: React.FC<{ testimonials: string[] | undefined }> = ({ testimonials }) => {
  if (!testimonials || testimonials.length === 0) return null;
  return (
    <section className="my-12 bg-gray-50 p-8 rounded-lg">
      <h2 className="text-3xl font-bold mb-6">What Our Customers Say</h2>
      <div className="space-y-6">
        {testimonials.map((testimonial, index) => (
          <blockquote key={index} className="border-l-4 border-blue-500 pl-4 italic text-gray-700">
       &quot;{testimonial}&quot;
          </blockquote>
        ))}
      </div>
    </section>
  );
};

const WhyEuSection: React.FC<{ content: string | undefined }> = ({ content }) => {
  if (!content) return null;
  return (
    <section className="my-12 bg-blue-50 border border-blue-100 p-8 rounded-lg">
      <h2 className="text-3xl font-bold mb-4">Why Choose the EU Version?</h2>
      <p className="text-gray-700 leading-relaxed">{content}</p>
    </section>
  );
};

const GdprFocusSection: React.FC<{ content: string | undefined }> = ({ content }) => {
  if (!content) return null;
  return (
    <section className="my-12 bg-amber-50 border border-amber-100 p-8 rounded-lg">
      <h2 className="text-3xl font-bold mb-4">GDPR Compliance Focus</h2>
      <p className="text-gray-700 leading-relaxed">{content}</p>
    </section>
  );
};

const LogosSection: React.FC<{ logos: ImageWithAlt[] | undefined }> = ({ logos }) => {
  if (!logos || logos.length === 0) return null;
  return (
    <section className="my-12 py-10 px-6 bg-gray-50 rounded-lg text-center">
      <h2 className="text-xl font-medium text-gray-500 mb-8">Trusted By Leading EU Businesses</h2>
      <div className="flex flex-wrap justify-center items-center gap-10">
        {logos.map((logo) => logo.asset ? (
          <div key={logo._key} className="h-14 flex items-center">
            <Image
              src={urlFor(logo.asset).width(160).height(50).fit('max').auto('format').url()}
              alt={logo.alt || 'Customer logo'}
              width={160}
              height={50}
              className="object-contain grayscale opacity-70"
            />
          </div>
        ) : null)}
      </div>
    </section>
  );
};

export async function generateStaticParams() {
  const query = `*[_type == "tool" && defined(slug.current)][].slug.current`;
  const slugs = await client.fetch<string[]>(query);

  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export default async function ToolPage({ params }: ToolPageProps) {
  const slug = params.slug;

  try {
    const toolQuery = `*[_type == "tool" && slug.current == $slug][0]{
      _id, name, tagline, slug, primaryCTAText, secondaryCTAText, uniqueDescription,
      usAlternativeName,
      comparisonTitle, comparisonSubtitle, comparisonTagline,
      heroImage{alt, asset->{_id, url, metadata { dimensions }}},
      uniqueFeatures[]{_key, title, description},
      comparisonPoints[]{_key, featureName, euToolValue, usToolValue},
      pricingTiers[]{_key, name, price, featuresList, ctaText}
    }`;

    const [tool, commonContent] = await Promise.all([
      client.fetch<Tool | null>(toolQuery, { slug }),
      getCommonContent(),
    ]);

    if (!tool) {
      notFound();
    }

    return (
      <div className="bg-white text-gray-900 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Hero Section */}
          <section className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                  <span className="block">Everything you ever</span>
                  <span className="text-orange-500">wanted to know</span>
                  <span className="block">about {tool.name}</span>
                </h1>
                <p className="text-xl text-gray-600 mb-8">{tool.tagline}</p>
                <div className="flex flex-wrap gap-4">
                  {tool.primaryCTAText && (
                    <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors">
                      {tool.primaryCTAText}
                    </button>
                  )}
                  {tool.secondaryCTAText && (
                    <button className="px-6 py-3 bg-white text-blue-600 font-medium rounded-md border-2 border-blue-600 hover:bg-blue-50 transition-colors">
                      {tool.secondaryCTAText}
                    </button>
                  )}
                </div>
              </div>
              <div className="rounded-xl overflow-hidden shadow-lg">
                {tool.heroImage?.asset ? (
                  <Image
                    src={urlFor(tool.heroImage).width(600).height(400).auto('format').url()}
                    alt={tool.heroImage.alt || `${tool.name} hero image`}
                    width={600}
                    height={400}
                    className="w-full h-auto"
                    priority
                  />
                ) : (
                  <div className="bg-gray-100 w-full h-80 flex items-center justify-center">
                    <p className="text-gray-400">Tool image</p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Overview/Description */}
          {tool.uniqueDescription && (
            <section className="my-12">
              <h2 className="text-3xl font-bold mb-4">Overview</h2>
              <p className="text-lg text-gray-700 leading-relaxed">{tool.uniqueDescription}</p>
            </section>
          )}

          {/* EU & GDPR Sections */}
          <WhyEuSection content={commonContent?.whyEu} />
          <GdprFocusSection content={commonContent?.gdprFocus} />

          {/* Features, Comparison & Other Sections */}
          <FeatureSection features={tool.uniqueFeatures} />
          
          {/* Updated Comparison section with the tool name and US alternative name */}
          <ComparisonSection 
            points={tool.comparisonPoints} 
            toolName={tool.name}
            usAlternativeName={tool.usAlternativeName}
            comparisonTitle={tool.comparisonTitle}
            comparisonSubtitle={tool.comparisonSubtitle}
            comparisonTagline={tool.comparisonTagline}
          />
          
          <LogosSection logos={commonContent?.globalCustomerLogos} />
          <TestimonialsSection testimonials={commonContent?.globalTestimonials} />
          <PricingSection tiers={tool.pricingTiers} />
          <AboutUsSection content={commonContent?.aboutUs} />

          {/* Final CTA */}
          <section className="my-16 bg-gray-50 py-12 px-8 rounded-xl text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Experience {tool.name} in the EU?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Get started today and enjoy the benefits of EU-hosted software.
            </p>
            {tool.primaryCTAText && (
              <button className="px-8 py-4 text-xl bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors">
                {tool.primaryCTAText}
              </button>
            )}
          </section>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error in ToolPage:", error);
    return (
      <div className="p-10 text-center">
        <h2 className="text-2xl font-bold text-red-500 mb-4">
          Error loading tool information
        </h2>
        <p className="text-gray-600 mb-6">
          We encountered a problem fetching data for this tool. Please try again later.
        </p>
        <Link href="/" className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors">
          Return to Home
        </Link>
      </div>
    );
  }
}