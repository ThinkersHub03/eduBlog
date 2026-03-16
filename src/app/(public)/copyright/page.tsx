import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Copyright Notice | EduBlogs",
    description: "Learn about EduBlogs copyright policies, content ownership, educational usage guidelines, and how to report copyright violations.",
}

export default function CopyrightPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <article className="rounded-lg bg-white p-8 shadow-sm">
                    <header className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
                            Copyright Notice
                        </h1>
                        <p className="mt-2 text-sm text-gray-600">
                            Last updated: March 16, 2026
                        </p>
                    </header>

                    <div className="prose prose-gray max-w-none">
                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                                Content Ownership
                            </h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                All content on EduBlogs, including but not limited to text, graphics, logos, images, audio clips, video clips, data compilations, and software, is the property of EduBlogs or its content suppliers and is protected by international copyright laws.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                The compilation of all content on this site is the exclusive property of EduBlogs and is protected by international copyright laws. All rights reserved.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                                Educational Usage
                            </h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                EduBlogs is committed to supporting education and learning. Our content is provided for educational purposes, including:
                            </p>
                            <ul className="list-disc pl-6 text-gray-700 mb-4">
                                <li>Personal study and research</li>
                                <li>Educational institution use</li>
                                <li>Non-commercial academic projects</li>
                                <li>Fair use as defined by copyright law</li>
                            </ul>
                            <p className="text-gray-700 leading-relaxed">
                                Users are encouraged to use our resources for legitimate educational purposes. However, all content must be properly attributed to EduBlogs when used in academic work or publications.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                                Copyright Notice
                            </h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                © 2026 EduBlogs. All rights reserved. No part of this website or its content may be reproduced, distributed, transmitted, cached, or otherwise used, except with the prior written permission of EduBlogs.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                This includes, but is not limited to:
                            </p>
                            <ul className="list-disc pl-6 text-gray-700 mb-4">
                                <li>Copying, reproducing, or distributing content without permission</li>
                                <li>Creating derivative works based on our content</li>
                                <li>Using content for commercial purposes</li>
                                <li>Removing or altering copyright notices</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                                Restrictions on Redistribution
                            </h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Redistribution of EduBlogs content is strictly prohibited without express written permission. This includes:
                            </p>
                            <ul className="list-disc pl-6 text-gray-700 mb-4">
                                <li>Sharing content on other websites or platforms</li>
                                <li>Incorporating content into other publications</li>
                                <li>Creating collections or databases of our materials</li>
                                <li>Using automated tools to download or scrape content</li>
                            </ul>
                            <p className="text-gray-700 leading-relaxed">
                                Educational institutions seeking to use our content for their programs should contact us directly for licensing arrangements.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                                Fair Use Policy
                            </h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                We respect the fair use doctrine and understand that limited use of copyrighted material for criticism, comment, news reporting, teaching, scholarship, or research may be permitted under copyright law.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                If you believe your use of EduBlogs content falls under fair use, please contact us to discuss your specific situation. We are generally supportive of legitimate educational and scholarly uses.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                                Reporting Copyright Violations
                            </h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                EduBlogs respects the intellectual property rights of others and expects our users to do the same. If you believe that your work has been copied in a way that constitutes copyright infringement, please provide our Copyright Agent with the following information:
                            </p>
                            <ul className="list-disc pl-6 text-gray-700 mb-6">
                                <li>An electronic or physical signature of the person authorized to act on behalf of the owner of the copyright interest</li>
                                <li>A description of the copyrighted work that you claim has been infringed</li>
                                <li>A description of where the material that you claim is infringing is located on the site</li>
                                <li>Your address, telephone number, and email address</li>
                                <li>A statement by you that you have a good faith belief that the disputed use is not authorized by the copyright owner, its agent, or the law</li>
                                <li>A statement by you, made under penalty of perjury, that the above information in your notice is accurate and that you are the copyright owner or authorized to act on the copyright owner's behalf</li>
                            </ul>
                            <p className="text-gray-700 leading-relaxed">
                                Our Copyright Agent can be contacted at: copyright@edublogs.com
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                                Digital Millennium Copyright Act (DMCA)
                            </h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                EduBlogs complies with the Digital Millennium Copyright Act (DMCA). Upon receipt of a proper DMCA takedown notice, we will expeditiously remove or disable access to the allegedly infringing material.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                If you believe that your content was removed in error, you may submit a counter-notification to our Copyright Agent.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                                Contact Information
                            </h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                For copyright-related inquiries or to report violations, please contact:
                            </p>
                            <div className="bg-gray-50 p-4 rounded-md">
                                <p className="text-gray-700"><strong>Copyright Agent</strong></p>
                                <p className="text-gray-700">EduBlogs</p>
                                <p className="text-gray-700">Email: copyright@edublogs.com</p>
                                <p className="text-gray-700">Subject: Copyright Inquiry</p>
                            </div>
                        </section>
                    </div>
                </article>
            </div>
        </div>
    )
}