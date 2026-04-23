import React from 'react';
import { motion } from 'motion/react';
import { Shield } from 'lucide-react';
import { PageTitle } from '../../components/PageTitle';

export function PrivacyPolicy() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 w-full"
      dir="ltr"
    >
      <PageTitle 
        title="Privacy Policy" 
        badgeIcon={<Shield size={16} />}
        badgeText="Legal"
      />
      <div className="bg-white rounded-3xl p-8 md:p-12 border border-natural-border shadow-sm">
        <div className="prose prose-stone max-w-none space-y-8 text-[#444] text-[15px] leading-relaxed">
          
          <section>
            <h2 className="text-xl font-medium text-stone-900 mb-3">1. Information Collection and Use</h2>
            <p>
              We collect user data solely for essential account functionality, including account creation, login, authentication, and service usage. The information requested enables us to provide a personalized and secure experience during your visit.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-stone-900 mb-3">2. Data Sharing and Protection</h2>
            <p>
              Your privacy is fundamentally important to us. <strong>We do not sell, rent, or share your personal data with any third parties</strong> under any circumstances, except where explicitly required by law to comply with legal processes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-stone-900 mb-3">3. Third-Party Authentication</h2>
            <p>
              To simplify the login process, we offer authentication through Google. When you choose to sign in using this provider, we receive only the necessary profile information (such as your name and email) required to match your credentials and create your application profile. We do not access or store your passwords for these third-party services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-stone-900 mb-3">4. Cookies and Tracking</h2>
            <p>
              Our website may use cookies and similar tracking technologies to improve user experience, remember your preferences, and maintain session continuity. You have the option to accept or decline cookies through your browser settings, though declining may affect certain site functionalities.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-stone-900 mb-3">5. Data Deletion</h2>
            <p>
              You have the full right to remove your presence from our platform. If you wish to delete your account and all associated personal data permanently, please contact our support team at <a href="mailto:oliver.brand.market@gmail.com" className="text-natural-accent font-medium hover:underline">oliver.brand.market@gmail.com</a>. We will process your request promptly and securely.
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
