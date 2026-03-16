import React from "react";

export default function SiteDetails() {
  return (
    <section className="w-full mx-auto max-w-3xl py-6 px-4 sm:px-8 text-center">
      <h2 className="text-lg sm:text-xl font-bold text-green-700 mb-4">About EduPortal Past Papers</h2>
      <p className="text-gray-700 text-sm sm:text-base mb-4">
        EduPortal is your go-to resource for authentic past papers from Pakistani boards and universities. Prepare effectively for exams with solved and unsolved papers, covering Matric, Intermediate, Bachelor, Master, and competitive exams.
      </p>
      <ul className="list-disc pl-6 text-gray-700 text-sm sm:text-base text-left mx-auto max-w-md">
        <li>Comprehensive collection from all major boards and universities.</li>
        <li>Filter by board, class, subject, and year for easy access.</li>
        <li>Download or view papers directly on the site.</li>
        <li>Helps in understanding exam patterns and improving scores.</li>
      </ul>
      <p className="text-gray-700 text-sm sm:text-base mt-4">
        Use this page to view the paper details and interact with the PDF. Good luck with your studies!
      </p>
    </section>
  );
}
