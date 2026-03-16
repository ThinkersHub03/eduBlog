import { Metadata } from "next"

export const metadata: Metadata = {
    title: "About Us | EduBlogs",
    description: "Learn about EduBlogs, your trusted educational platform providing comprehensive learning resources including books, past papers, blogs, and educational content for students worldwide.",
}

export default function AboutUsPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <article className="rounded-lg bg-white p-8 shadow-sm">
                    <header className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
                            About EduBlogs
                        </h1>
                        <p className="mt-2 text-lg text-gray-600">
                            Empowering education through accessible learning resources
                        </p>
                    </header>

                    <div className="prose prose-gray max-w-none">
                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                                Our Mission
                            </h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                At EduBlogs, our mission is to democratize education by providing free, high-quality learning resources to students worldwide. We believe that every student deserves access to the tools and materials they need to succeed academically, regardless of their location or financial situation.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                We are committed to creating a comprehensive educational platform that supports lifelong learning and helps students achieve their academic goals through carefully curated content and innovative technology.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                                What We Provide
                            </h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                EduBlogs offers a wide range of educational resources designed to support students at every stage of their learning journey:
                            </p>
                            <ul className="list-disc pl-6 text-gray-700 mb-6">
                                <li><strong>Academic Books:</strong> A vast collection of textbooks, reference materials, and study guides across various subjects and grade levels</li>
                                <li><strong>Past Papers:</strong> Previous examination papers and sample questions to help students prepare for assessments</li>
                                <li><strong>Educational Blogs:</strong> In-depth articles, tutorials, and insights on various academic topics</li>
                                <li><strong>Study Materials:</strong> Notes, worksheets, and supplementary resources created by educators</li>
                                <li><strong>Interactive Content:</strong> Quizzes, exercises, and multimedia learning materials</li>
                                <li><strong>Community Features:</strong> Forums and discussion boards for peer learning and collaboration</li>
                            </ul>
                            <p className="text-gray-700 leading-relaxed">
                                All our resources are carefully reviewed and organized to ensure they meet high educational standards and are easily accessible to users.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                                Who We Serve
                            </h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                EduBlogs serves a diverse community of learners, including:
                            </p>
                            <ul className="list-disc pl-6 text-gray-700 mb-6">
                                <li><strong>Students:</strong> From primary school to university level, pursuing various academic disciplines</li>
                                <li><strong>Educators:</strong> Teachers, professors, and tutors looking for resources to enhance their teaching</li>
                                <li><strong>Parents:</strong> Supporting their children's education with quality learning materials</li>
                                <li><strong>Self-Learners:</strong> Individuals committed to continuous personal and professional development</li>
                                <li><strong>Educational Institutions:</strong> Schools, colleges, and universities seeking supplementary resources</li>
                            </ul>
                            <p className="text-gray-700 leading-relaxed">
                                We are proud to support learners from diverse backgrounds and educational systems, making our platform inclusive and accessible to all.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                                Our Vision
                            </h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Our vision is to become the world's leading educational resource platform, where quality education is freely available to everyone, everywhere. We envision a future where geographical barriers, financial constraints, and resource limitations no longer hinder access to excellent educational materials.
                            </p>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Through continuous innovation, community engagement, and partnerships with educational institutions, we aim to transform the way people learn and teach, creating a more educated and empowered global society.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                                Our Commitment
                            </h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                At EduBlogs, we are committed to:
                            </p>
                            <ul className="list-disc pl-6 text-gray-700 mb-6">
                                <li>Maintaining the highest standards of content quality and accuracy</li>
                                <li>Ensuring user privacy and data security</li>
                                <li>Providing free access to educational resources</li>
                                <li>Fostering a supportive and inclusive learning community</li>
                                <li>Continuously improving our platform based on user feedback</li>
                                <li>Promoting ethical use of educational materials</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                                Join Our Community
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                Whether you're a student, educator, or lifelong learner, EduBlogs welcomes you to join our growing community. Explore our resources, share your knowledge, and be part of the educational revolution. Together, we can make quality education accessible to all.
                            </p>
                        </section>
                    </div>
                </article>
            </div>
        </div>
    )
}