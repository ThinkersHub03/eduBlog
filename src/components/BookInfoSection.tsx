import React from "react";

export default function BookInfoSection() {
  return (
    <section className="w-full mx-auto max-w-5xl py-8 px-4 sm:px-8">
      <div className="bg-white rounded-2xl shadow-md p-6 space-y-4 border border-gray-100">
        <h2 className="text-xl sm:text-2xl font-bold text-green-700">Why Use Our Books Collection?</h2>
        <p className="text-gray-700 text-sm sm:text-base">
          Our digital library offers a vast collection of textbooks and reference materials to support your academic journey. Access high-quality educational resources anytime, anywhere.
        </p>
        <ul className="list-disc pl-6 text-gray-700 text-sm sm:text-base">
          <li>Comprehensive textbooks for all subjects and class levels.</li>
          <li>Reference guides and study materials from trusted sources.</li>
          <li>Free downloads and online access to enhance your learning.</li>
          <li>Organized by board, class, and subject for easy navigation.</li>
        </ul>
        <p className="text-gray-700 text-sm sm:text-base">
          Use the filters below to find the books you need. Click on any book to view details and download. Happy reading!
        </p>
      </div>
    </section>
  );
}
