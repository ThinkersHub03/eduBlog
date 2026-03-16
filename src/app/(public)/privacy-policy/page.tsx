import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Privacy Policy | EduBlogs",
    description: "Learn about how EduBlogs collects, uses, and protects your personal information. Our privacy policy outlines our commitment to data security and user privacy.",
}

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <article className="rounded-lg bg-white p-8 shadow-sm">
                    <header className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
                            Privacy Policy
                        </h1>
                        <p className="mt-2 text-sm text-gray-600">
                            Last updated: March 16, 2026
                        </p>
                    </header>

                    <div className="prose prose-gray max-w-none">
                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                                Introduction
                            </h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Welcome to EduBlogs ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                By using our website, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, please do not use our website.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                                Information We Collect
                            </h2>
                            <h3 className="text-xl font-medium text-gray-800 mb-3">
                                Personal Information
                            </h3>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                We may collect personal information that you provide directly to us, such as:
                            </p>
                            <ul className="list-disc pl-6 text-gray-700 mb-4">
                                <li>Name and contact information (email address, phone number)</li>
                                <li>Account credentials (username, password)</li>
                                <li>Educational information (institution, grade level, subjects)</li>
                                <li>Communications you send to us</li>
                            </ul>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">
                                Automatically Collected Information
                            </h3>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                When you access our website, we automatically collect certain information, including:
                            </p>
                            <ul className="list-disc pl-6 text-gray-700 mb-4">
                                <li>IP address and location information</li>
                                <li>Browser type and version</li>
                                <li>Device information</li>
                                <li>Pages visited and time spent on our site</li>
                                <li>Referral sources</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                                How We Use Information
                            </h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                We use the information we collect for various purposes, including:
                            </p>
                            <ul className="list-disc pl-6 text-gray-700 mb-4">
                                <li>Providing and maintaining our educational services</li>
                                <li>Personalizing your experience and content recommendations</li>
                                <li>Communicating with you about our services</li>
                                <li>Processing transactions and managing accounts</li>
                                <li>Analyzing usage patterns to improve our website</li>
                                <li>Ensuring security and preventing fraud</li>
                                <li>Complying with legal obligations</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                                Cookies and Tracking Technologies
                            </h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                We use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and understand where our visitors are coming from. You can control cookie settings through your browser preferences.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                We may also use third-party analytics services that collect, monitor, and analyze this type of information to increase our Service's functionality.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                                Third-Party Services
                            </h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Our website may contain links to third-party websites or services that are not owned or controlled by us. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites or services.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                We encourage you to read the privacy policy of every website you visit.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                                Data Security
                            </h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                While we strive to protect your personal information, we cannot guarantee its absolute security.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                                Children's Information
                            </h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us so that we can take necessary action.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                                Changes to This Privacy Policy
                            </h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                                Contact Information
                            </h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                If you have any questions about this Privacy Policy, please contact us:
                            </p>
                            <ul className="list-disc pl-6 text-gray-700">
                                <li>Email: privacy@edublogs.com</li>
                                <li>Address: [Your Business Address]</li>
                                <li>Phone: [Your Phone Number]</li>
                            </ul>
                        </section>
                    </div>
                </article>
            </div>
        </div>
    )
}