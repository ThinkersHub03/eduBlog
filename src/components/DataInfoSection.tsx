import React from "react";

export default function DataInfoSection() {
  return (
    <section className="w-full mx-auto max-w-5xl py-6 px-4 sm:px-8">
      <div className="bg-white rounded-2xl shadow-md p-6 space-y-4 border border-gray-100">
        <h2 className="text-lg sm:text-xl font-bold text-green-700">What You'll Find in Past Papers</h2>
        <p className="text-gray-700 text-sm sm:text-base">
          EduPortal offers a comprehensive collection of past papers for Matric, Intermediate, University, and Competitive Exams. You can browse and download papers from all major Pakistani boards and universities.
        </p>
        <ul className="list-disc pl-6 text-gray-700 text-sm sm:text-base">
          <li>Board Exam Papers: Punjab, Sindh, KPK, Balochistan, Federal, and AJK boards.</li>
          <li>University Papers: Punjab University, Karachi University, Virtual University, and more.</li>
          <li>Class Levels: 9th, 10th, 11th, 12th, Bachelor, Master, and professional courses.</li>
          <li>Subjects: Science, Arts, Commerce, Computer, English, Urdu, Mathematics, and others.</li>
          <li>Exam Types: Annual, Supplementary, Entry Tests (ECAT, MDCAT), Competitive Exams (CSS, PPSC, FPSC).</li>
          <li>Paper Formats: Solved and unsolved papers, PDF downloads, exam shifts, and years.</li>
        </ul>
        <p className="text-gray-700 text-sm sm:text-base">
          Whether you're preparing for board exams, university tests, or competitive exams, you'll find authentic papers, marking schemes, and solutions to help you succeed.
        </p>
      </div>
    </section>
  );
}
