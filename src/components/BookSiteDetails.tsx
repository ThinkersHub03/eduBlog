import React from "react";

export default function BookSiteDetails() {
  return (
    <section className="w-full mx-auto max-w-3xl py-6 px-4 sm:px-8 text-center">
      <h2 className="text-lg sm:text-xl font-bold text-green-700 mb-4">About EduPortal Books</h2>
      <p className="text-gray-700 text-sm sm:text-base mb-4">
        EduPortal offers a comprehensive digital library with textbooks and reference materials for all academic levels. Access quality educational resources to support your studies.
      </p>
      <ul className="list-disc pl-6 text-gray-700 text-sm sm:text-base text-left mx-auto max-w-md">
        <li>Wide range of textbooks from all major boards and universities.</li>
        <li>Organized by subject, class, and board for easy access.</li>
        <li>Free downloads and online viewing of educational materials.</li>
        <li>Supports learning for Matric, Intermediate, University, and competitive exams.</li>
      </ul>
      <p className="text-gray-700 text-sm sm:text-base mt-4">
        Use this page to view book details and download. Happy studying!
      </p>
    </section>
  );
}