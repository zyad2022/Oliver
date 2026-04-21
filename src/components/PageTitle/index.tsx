import React from 'react';

interface PageTitleProps {
  title: string | React.ReactNode;
  description?: string | React.ReactNode;
  badgeIcon?: React.ReactNode;
  badgeText?: string;
  className?: string;
}

export function PageTitle({ title, description, badgeIcon, badgeText, className = '' }: PageTitleProps) {
  return (
    <div className={`text-center mb-12 flex flex-col items-center ${className}`}>
      {(badgeIcon || badgeText) && (
        <div className="luxury-pill-outer mb-5 scale-90">
          <div className="luxury-pill-core-alt gap-2">
            {badgeIcon}
            {badgeText && <span className="text-natural-accent font-medium text-xs uppercase tracking-widest">{badgeText}</span>}
          </div>
        </div>
      )}
      
      <div className="luxury-pill-outer">
        <div className="luxury-pill-core min-w-[200px] md:px-12 py-3 md:py-4">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-arabic font-medium text-white m-0 whitespace-pre-wrap tracking-wide drop-shadow-sm">
            {title}
          </h1>
        </div>
      </div>

      {description && (
        <p className="text-[#333] font-arabic font-light text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mt-8 opacity-90">
          {description}
        </p>
      )}
    </div>
  );
}
