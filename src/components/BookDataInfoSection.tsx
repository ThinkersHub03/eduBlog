import React from "react";

export default function BookDataInfoSection() {
  return (
    <section className="w-full mx-auto max-w-5xl py-6 px-4 sm:px-8">
      <div className="bg-white rounded-2xl shadow-md p-6 space-y-4 border border-gray-100">
        <h2 className="text-lg sm:text-xl font-bold text-green-700">What You'll Find in Our Books Collection</h2>
        <p className="text-gray-700 text-sm sm:text-base">
          EduPortal's digital library provides textbooks and resources for Matric, Intermediate, University, and Competitive Exams. Browse and download books from all major Pakistani boards and universities.
        </p>
        <ul className="list-disc pl-6 text-gray-700 text-sm sm:text-base">
          <li>Board Textbooks: Punjab, Sindh, KPK, Balochistan, Federal, and AJK boards.</li>
          <li>University Books: Punjab University, Karachi University, Virtual University, and more.</li>
          <li>Class Levels: 9th, 10th, 11th, 12th, Bachelor, Master, and professional courses.</li>
          <li>Subjects: Science, Arts, Commerce, Computer, English, Urdu, Mathematics, and others.</li>
          <li>Formats: PDF downloads, reference materials, and study guides.</li>
        </ul>
        <p className="text-gray-700 text-sm sm:text-base">
          Whether you're preparing for exams or need reference materials, you'll find comprehensive books to support your studies.
        </p>
      </div>
    </section>
  );
}
