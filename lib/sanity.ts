// lib/sanity.ts
import { createClient, type ClientConfig } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url'; // Import image URL builder
import type { Image, Slug } from '@sanity/types'; // Import specific Sanity types

// --- INTERFACES matching your updated Sanity Schemas ---

// Interface for Sanity Image object with the 'alt' field
export interface ImageWithAlt extends Image {
    alt?: string;
}

// Interface for the objects inside the 'uniqueFeatures' array in 'tool' schema
export interface FeatureItem {
    _key: string; // Automatically added by Sanity for array items
    title?: string;
    description?: string;
}

// Interface for the objects inside the 'comparisonPoints' array in 'tool' schema
export interface ComparisonPoint {
    _key: string;
    featureName?: string;
    euToolValue?: string;
    usToolValue?: string;
}

// Interface for the objects inside the 'pricingTiers' array in 'tool' schema
export interface PricingTier {
    _key: string;
    name?: string;
    price?: string;
    featuresList?: string[];
    ctaText?: string;
}

// --- Updated CommonContent Interface (matches commonContent.ts schema) ---
export interface CommonContent {
  _type: 'commonContent'; // Document type
  _id: string; // Document ID
  aboutUs?: string;
  whyEu?: string;
  gdprFocus?: string; // Added field
  globalTestimonials?: string[];
  globalCustomerLogos?: ImageWithAlt[]; // Added field (array of images with alt)
}

// --- Updated Tool Interface (matches tool.ts schema) ---
export interface Tool {
    _id: string; // Document ID
    _type: 'tool'; // Document type
    name: string; // Required field
    tagline?: string;
    slug: Slug; // Use the imported Slug type
    usAlternativeName?: string; // Added field
    heroImage?: ImageWithAlt; // Added field
    primaryCTAText?: string; // Added field
    secondaryCTAText?: string; // Added field
    uniqueDescription?: string;
    uniqueFeatures?: FeatureItem[]; // Updated field (array of FeatureItem objects)
    comparisonTitle?: string; // Comparison section title
    comparisonSubtitle?: string; // Comparison section subtitle (first line)
    comparisonTagline?: string; // Comparison section tagline (second line)
    comparisonPoints?: ComparisonPoint[]; // Added field
    pricingTiers?: PricingTier[]; // Added field
}

// --- Sanity Client Configuration ---
const config: ClientConfig = {
  // Ensure NEXT_PUBLIC_SANITY_PROJECT_ID is set in your .env.local file
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production', // Default to 'production'
  // Use CDN only in production environments (typically in the browser)
  useCdn: typeof document !== 'undefined' && process.env.NODE_ENV === 'production',
  apiVersion: '2023-05-03', // Use a recent API version date
  // token: process.env.SANITY_API_READ_TOKEN // Add this for private datasets
};

// Runtime check to ensure projectId is configured
if (typeof process !== 'undefined' && !config.projectId) {
  throw new Error(
    "Configuration Error: The environment variable NEXT_PUBLIC_SANITY_PROJECT_ID is missing or invalid. Please check your .env.local file."
  );
}

// --- Export configured Sanity Client ---
export const client = createClient(config);

// --- Image URL Builder Helper ---
const builder = imageUrlBuilder(client);

// Helper function to generate image URLs from Sanity image objects
// Usage: urlFor(sanityImageObject).width(300).url()
export function urlFor(source: Image) { // Takes a Sanity 'Image' object
    return builder.image(source);
}

// --- Helper function to fetch the singleton Common Content document ---
export async function getCommonContent(): Promise<CommonContent | null> {
  // Fetches the first document of type 'commonContent'.
  // Using '...' fetches all top-level fields defined in the interface.
  const query = `*[_type == "commonContent"][0]{
      ...,
      // Explicitly expand image references if needed
      globalCustomerLogos[]{..., asset->}
    }`;
  try {
    const commonData = await client.fetch<CommonContent>(query);
    return commonData;
  } catch (error) {
    console.error("Error fetching common content from Sanity:", error);
    return null; // Return null or handle the error appropriately
  }
}