// app/tools/[slug]/page.tsx
import { SanityDocument } from "next-sanity";
// Corrected: Use named imports for sanityClient and urlFor
import { sanityClient, urlFor } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import Image from 'next/image';
// Removed incorrect default import for urlFor as it's now imported above
import FeatureComparison from '@/app/components/FeatureComparison'; // Import the component

// Define the expected structure for the tool page data
interface ToolPageData extends SanityDocument {
  title?: string;
  description?: string;
  slug?: { current?: string };
  mainImage?: any; // Replace 'any' with a more specific type if available
  body?: any[]; // Portable Text content
  features?: any[]; // Adjust type based on your feature structure
  comparisonTable?: any; // Adjust type based on your comparison table structure
  customerLogos?: {
    title?: string;
    logos?: Logo[]; // Use the Logo interface here
  };
  // Add other fields as necessary
}

// Define the structure for a single logo
interface Logo {
  _key: string; // Sanity adds this key to array items
  asset?: any; // Replace 'any' with a specific Sanity image asset type if possible
  alt?: string;
}

// Define the structure for the props expected by ToolPageContent
interface ToolPageContentProps {
  data: ToolPageData;
}

// Reusable component for rendering the page content
const ToolPageContent: React.FC<ToolPageContentProps> = ({ data }) => {
  const {
    title = 'Missing Title',
    description = 'Missing Description',
    mainImage,
    body,
    features,
    comparisonTable,
    customerLogos
  } = data;

  const logos = customerLogos?.logos || [];

  // Function to resolve Portable Text components (optional, customize as needed)
  const ptComponents = {
    types: {
      image: ({ value }: { value: any }) => {
        if (!value?.asset?._ref) {
          return null;
        }
        // Use the correctly imported urlFor
        const imageUrl = urlFor(value).width(800).height(600).fit('max').auto('format').url();
        return (
          <Image
            src={imageUrl}
            alt={value.alt || ' '}
            loading="lazy"
            width={800}
            height={600}
            className="my-4 rounded-md shadow-lg" // Added some styling
          />
        );
      },
      featureComparison: ({ value }: { value: any }) => <FeatureComparison data={value} />,
    },
    marks: {
      link: ({ children, value }: { children: React.ReactNode, value: any }) => {
        const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
        return (
          <a href={value.href} rel={rel} className="text-blue-600 hover:underline">
            {children}
          </a>
        );
      },
    },
    block: {
      h1: ({ children }: { children: React.ReactNode }) => <h1 className="text-4xl font-bold my-6">{children}</h1>,
      h2: ({ children }: { children: React.ReactNode }) => <h2 className="text-3xl font-semibold my-5">{children}</h2>,
      h3: ({ children }: { children: React.ReactNode }) => <h3 className="text-2xl font-semibold my-4">{children}</h3>,
      blockquote: ({ children }: { children: React.ReactNode }) => <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4">{children}</blockquote>,
    },
    list: {
      bullet: ({ children }: { children: React.ReactNode }) => <ul className="list-disc list-inside my-4 ml-4">{children}</ul>,
      number: ({ children }: { children: React.ReactNode }) => <ol className="list-decimal list-inside my-4 ml-4">{children}</ol>,
    },
    listItem: {
      bullet: ({ children }: { children: React.ReactNode }) => <li className="mb-2">{children}</li>,
      number: ({ children }: { children: React.ReactNode }) => <li className="mb-2">{children}</li>,
    },
  };


  return (
    <article className="container mx-auto px-4 py-8">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900">{title}</h1>
      {description && <p className="text-lg text-gray-600 mb-6">{description}</p>}

      {mainImage && (
        <div className="mb-8 shadow-lg rounded-lg overflow-hidden">
          {/* Use the correctly imported urlFor */}
          <Image
            src={urlFor(mainImage).width(1200).height(600).fit('crop').auto('format').url()}
            alt={title} // Use page title as alt text fallback
            width={1200}
            height={600}
            priority // Load main image eagerly
            className="w-full h-auto"
          />
        </div>
      )}

      {body && (
        <div className="prose prose-lg max-w-none mx-auto">
          <PortableText value={body} components={ptComponents} />
        </div>
      )}

      {features && features.length > 0 && (
        <section className="my-12">
          <h2 className="text-3xl font-semibold mb-6 text-center">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
                <h3 className="text-xl font-semibold mb-2">{feature.title || 'Feature Title'}</h3>
                <p className="text-gray-700">{feature.description || 'Feature description.'}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {logos && logos.length > 0 && (
        <section className="my-16 py-10 bg-gray-50 rounded-lg">
          <h2 className="text-2xl font-semibold mb-8 text-center text-gray-700">
            {customerLogos?.title || "Trusted By"}
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-10">
            {logos.map((logo) => logo.asset ? (
              <div key={logo._key as string} className="h-14 flex items-center">
                {/* Use the correctly imported urlFor */}
                <Image
                  src={urlFor(logo.asset).width(160).height(50).fit('max').auto('format').url()}
                  alt={logo.alt || 'Customer logo'}
                  width={160}
                  height={50}
                  className="object-contain"
                />
              </div>
            ) : null)}
          </div>
        </section>
      )}

    </article>
  );
};


const TOOL_PAGE_QUERY = `*[_type == "toolPage" && slug.current == $slug][0]{
  ...,
  mainImage {asset->},
  body[]{
    ...,
    _type == "image" => { ..., asset-> },
    _type == "featureComparison" => { ..., table{ ..., rows[]{ ..., cells[]{ ..., content[]{ ..., _type == "image" => { ..., asset-> } } } } } }
  },
  customerLogos {
    ...,
    logos[]{ ..., asset-> }
  },
}`;

interface PageProps {
  params: { slug: string };
}

export default async function ToolPage({ params }: PageProps) {
  // Corrected: Use sanityClient.fetch to execute the query
  const data = await sanityClient.fetch<ToolPageData>(
    TOOL_PAGE_QUERY,
    { slug: params.slug },
    // Note: The third argument for tags might differ depending on your exact sanityClient setup.
    // If your original sanityFetch function handled tags specifically, you might need to adjust.
    // Standard fetch often uses { next: { tags: [...] } } or similar.
    // Check your sanityClient configuration or documentation if caching/tags are critical.
    // For now, assuming basic fetch:
    // { next: { tags: [`toolPage:${params.slug}`] } } // Example if using Next.js App Router fetch extension
  );


  if (!data) {
    return <div className="container mx-auto px-4 py-8 text-center">Tool page not found.</div>;
  }

  return <ToolPageContent data={data} />;
}

// export async function generateStaticParams() {
//   const slugs = await sanityClient.fetch<string[]>(`*[_type == "toolPage" && defined(slug.current)][].slug.current`);
//   return slugs.map((slug) => ({ slug }));
// }

