import React from "react";

export default function InfoSection() {
  return (
    <section className="w-full mx-auto max-w-5xl py-8 px-4 sm:px-8">
      <div className="bg-white rounded-2xl shadow-md p-6 space-y-4 border border-gray-100">
        <h2 className="text-xl sm:text-2xl font-bold text-green-700">Why Use Past Papers?</h2>
        <p className="text-gray-700 text-sm sm:text-base">
          Past papers help students of all levels assess their knowledge, identify strengths and weaknesses, and prepare for board and university exams. By practicing with real exam papers, students gain confidence and improve their problem-solving skills.
        </p>
        <ul className="list-disc pl-6 text-gray-700 text-sm sm:text-base">
          <li>Work on real exam questions to boost your knowledge.</li>
          <li>Identify areas for improvement and focus your study.</li>
          <li>Download papers for Matric, Inter, University, and Competitive Exams.</li>
        </ul>
        <p className="text-gray-700 text-sm sm:text-base">
          Use the filters below to find papers by board, class, and subject. Click any paper to view or download the PDF. Good luck with your studies!
        </p>
      </div>
    </section>
  );
}
