import { Metadata } from "next"
import { ContactForm } from "@/components/ContactForm"

export const metadata: Metadata = {
    title: "Contact Us | EduBlogs",
    description: "Get in touch with EduBlogs. Have questions about our educational resources or need support? Contact us and we'll be happy to help.",
}

export default function ContactUsPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <article className="rounded-lg bg-white p-8 shadow-sm">
                    <header className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
                            Contact Us
                        </h1>
                        <p className="mt-2 text-lg text-gray-600">
                            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                        </p>
                    </header>

                    <div className="grid gap-8 md:grid-cols-2">
                        <div>
                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                                    Get in Touch
                                </h2>
                                <p className="text-gray-700 leading-relaxed mb-6">
                                    Whether you have questions about our educational resources, need help with your account, or want to provide feedback, we're here to help. Reach out to us using the contact form or the information below.
                                </p>

                                <div className="space-y-4">
                                    <div>
                                        <h3 className="font-medium text-gray-900">Email</h3>
                                        <p className="text-gray-600">contact@edublogs.com</p>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-900">Support Hours</h3>
                                        <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM UTC</p>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-900">Response Time</h3>
                                        <p className="text-gray-600">We typically respond within 24-48 hours</p>
                                    </div>
                                </div>
                            </section>
                        </div>

                        <div>
                            <ContactForm />
                        </div>
                    </div>
                </article>
            </div>
        </div>
    )
}