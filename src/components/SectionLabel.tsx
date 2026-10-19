import React from 'react';

export const SectionLabel: React.FC<{ children: React.ReactNode; light?: boolean }> = ({ children, light }) => (
  <div className={`flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] uppercase ${light ? 'text-rose-100' : 'text-brand'}`}>
    <span aria-hidden="true">✦</span>
    <span>{children}</span>
  </div>
);
