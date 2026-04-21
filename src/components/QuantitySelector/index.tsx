import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  max?: number;
  min?: number;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({ 
  quantity, 
  onIncrease, 
  onDecrease,
  max = 10,
  min = 1
}) => {
  return (
    <div className="luxury-pill-outer p-0.5 w-full h-full">
      <div className="bg-white border border-natural-border px-6 py-2 flex items-center justify-between w-full en-text rounded-full h-full">
        <span className="text-[#666] text-sm">Qty</span>
        <div className="flex items-center gap-4">
          <span className="font-medium text-lg min-w-[20px] text-center">{quantity}</span>
          <div className="flex flex-col">
            <button 
              onClick={onIncrease} 
              disabled={quantity >= max}
              className={`text-[#888] hover:text-natural-accent transition-colors p-0.5 outline-none ${quantity >= max ? 'opacity-30 cursor-not-allowed' : ''}`}
            >
              <ChevronUp size={14} strokeWidth={2.5} />
            </button>
            <button 
              onClick={onDecrease} 
              disabled={quantity <= min}
              className={`text-[#888] hover:text-natural-accent transition-colors p-0.5 outline-none ${quantity <= min ? 'opacity-30 cursor-not-allowed' : ''}`}
            >
              <ChevronDown size={14} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
