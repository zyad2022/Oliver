import React from 'react';
import { motion } from 'motion/react';
import { FileText } from 'lucide-react';
import { PageTitle } from '../../components/PageTitle';

export function TermsOfService() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 w-full"
      dir="ltr"
    >
      <PageTitle 
        title="Terms of Service" 
        badgeIcon={<FileText size={16} />}
        badgeText="Legal"
      />
      <div className="bg-white rounded-3xl p-8 md:p-12 border border-natural-border shadow-sm">
        <div className="prose prose-stone max-w-none space-y-8 text-[#444] text-[15px] leading-relaxed">
          
          <section>
            <h2 className="text-xl font-medium text-stone-900 mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing and using our service, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must discontinue your use of our platform immediately.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-stone-900 mb-3">2. Responsible Use</h2>
            <p>
              Users must utilize the service legally, ethically, and responsibly. You agree not to misuse, exploit, hack, or abuse the platform's infrastructure, endpoints, or other corresponding services. Any fraudulent, toxic, or illegal activities will result in immediate termination of the account and potential legal reporting.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-stone-900 mb-3">3. Service Modifications</h2>
            <p>
              We reserve the absolute right to modify, suspend, or terminate the service, or any part thereof, at any time without prior notice. The service is provided "as is," meaning there is no strict guarantee of uninterrupted availability, speed, or performance.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-stone-900 mb-3">4. Account Responsibility</h2>
            <p>
              You are entirely responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account or any other breach of security.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-stone-900 mb-3">5. Contact and Support</h2>
            <p>
              If you have any questions, disputes, or require support regarding these Terms of Service or your account status, please reach out to our official support team at <a href="mailto:oliver.brand.market@gmail.com" className="text-natural-accent font-medium hover:underline">oliver.brand.market@gmail.com</a>.
            </p>
          </section>

          <hr className="border-natural-border my-8" />

          <section>
            <p className="text-sm text-[#888]">
              <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </section>

        </div>
      </div>
    </motion.div>
  );
}
