import React from 'react';
import {
  Lock,
  Sparkles,
  Zap,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

interface SubscriptionGateProps {
  featureNameAr: string;
  featureNameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const SubscriptionGate: React.FC<SubscriptionGateProps> = ({
  featureNameAr,
  featureNameEn,
  descriptionAr,
  descriptionEn,
  icon,
  children
}) => {
  const { hasActiveSubscription, openPricingModal } = useAuth();
  const { isRTL } = useLanguage();

  if (hasActiveSubscription) {
    return <>{children}</>;
  }

  return (
    <div className="relative w-full h-full min-h-[450px] overflow-hidden flex items-center justify-center p-4">
      {/* Blurred background preview of the actual content */}
      <div className="absolute inset-0 pointer-events-none filter blur-md opacity-25 select-none overflow-hidden scale-95">
        {children}
      </div>

      {/* Dark frosted lock overlay */}
      <div className="relative z-20 max-w-lg w-full bg-slate-900/90 border border-amber-500/30 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl text-center space-y-5">
        <div className="mx-auto w-14 h-14 rounded-2xl bg-amber-500/15 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-inner">
          {icon || <Lock className="w-7 h-7" />}
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>PRO FEATURE · يتطلب اشتراكاً نشطاً</span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-slate-100">
            {isRTL ? featureNameAr : featureNameEn}
          </h3>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md mx-auto">
            {isRTL ? descriptionAr : descriptionEn}
          </p>
        </div>

        {/* Pricing Quick Card */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 flex items-center justify-between text-xs">
          <div className="text-start">
            <div className="text-slate-200 font-bold">
              {isRTL ? 'الباقة الشهرية أو السنوية' : 'Monthly or Annual Plan'}
            </div>
            <div className="text-slate-400 text-[11px]">
              {isRTL ? 'تبدأ من $15 / شهر فقط' : 'Starting from only $15 / month'}
            </div>
          </div>
          <div className="text-end">
            <span className="text-base font-extrabold font-mono text-cyan-300">$15</span>
            <span className="text-slate-400 text-[10px]"> /mo</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={openPricingModal}
          className="w-full py-3 px-5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-950/50 transition-all cursor-pointer active:scale-95"
        >
          <Zap className="w-4 h-4 fill-current" />
          <span>{isRTL ? 'ترقية الحساب وفتح هذه الميزة الآن' : 'Upgrade to Pro to Unlock Now'}</span>
          <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
        </button>

        <p className="text-[11px] text-slate-400 font-mono">
          {isRTL ? 'ضمان استرداد 14 يوماً · تفعيل فوري لكافة الميزات' : '14-Day Money Back Guarantee · Instant Activation'}
        </p>
      </div>
    </div>
  );
};
