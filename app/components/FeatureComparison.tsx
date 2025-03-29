// app/components/FeatureComparison.tsx
import React from 'react';

type FeatureComparisonProps = {
  comparisonPoints: {
    _key: string;
    featureName?: string;
    euToolValue?: string;
    usToolValue?: string;
  }[];
  toolName: string;
  usAlternativeName?: string;
  comparisonTitle?: string;
  comparisonSubtitle?: string;
  comparisonTagline?: string;
};

const FeatureComparison: React.FC<FeatureComparisonProps> = ({
  comparisonPoints,
  toolName,
  usAlternativeName = 'US Alternative',
  comparisonTitle = 'FEATURE COMPARISON',
  comparisonSubtitle = 'Everything You Need—',
  comparisonTagline = 'Just Without the Brand Price Tag',
}) => {
  if (!comparisonPoints || comparisonPoints.length === 0) return null;

  // Function to render check or cross marks
  const renderMark = (value: string) => {
    // Check if value is just "Yes", "✓", "true" etc. for a checkmark
    const positiveValues = ['yes', 'true', '✓', 'y', 'available', 'included'];
    const negativeValues = ['no', 'false', '✗', 'x', 'n', 'unavailable', 'not included'];
    
    const lowercaseValue = value.toLowerCase();
    
    if (positiveValues.includes(lowercaseValue)) {
      return (
        <span className="text-green-500 text-2xl flex justify-center">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </span>
      );
    } else if (negativeValues.includes(lowercaseValue)) {
      return (
        <span className="text-red-500 text-2xl flex justify-center">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </span>
      );
    } else {
      // For any other value, return the text
      return <span>{value}</span>;
    }
  };

  return (
    <section className="my-16">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-center text-3xl font-bold text-purple-600 mb-4">{comparisonTitle}</h2>
        <h3 className="text-center text-4xl font-bold mb-12">
          {comparisonSubtitle}<br />
          {comparisonTagline}
        </h3>
        
        <div className="overflow-hidden border border-gray-200 rounded-lg shadow-md">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-4 text-lg font-semibold text-gray-800 border-b border-r">Feature</th>
                <th className="px-6 py-4 text-lg font-semibold text-gray-800 text-center border-b border-r">{toolName}</th>
                <th className="px-6 py-4 text-lg font-semibold text-red-500 text-center border-b">{usAlternativeName}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {comparisonPoints.map((point) => (
                <tr key={point._key} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium border-r">{point.featureName}</td>
                  <td className="px-6 py-4 text-center border-r">
                    {renderMark(point.euToolValue || '')}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {renderMark(point.usToolValue || '')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-8 flex items-center justify-center">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
          <p className="text-xl font-medium">
          You shouldn&apos;t have to sacrifice quality just to go with the name everyone knows.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeatureComparison;