import React from "react";

export default function Title() {
  return (
    <div>
      <div className="w-full max-w-4xl px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Web Scraper Tool
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-300">
            Enter the URL of the website and select the tag to scrape data.
          </p>
        </div>
      </div>
    </div>
  );
}
