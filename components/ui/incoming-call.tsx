'use client';

import { useEffect, useId, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface IncomingCallProps {
  callerName: string;
  callerInfo?: string;
  statusText: string;
  onAccept: () => void;
  onDecline: () => void;
  onClose: () => void;
  className?: string;
  isOpen?: boolean;
}

export function IncomingCall({ callerName, callerInfo, statusText, onAccept, onDecline, onClose, className, isOpen = false }: IncomingCallProps) {
  const titleId = useId();
  const acceptRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    acceptRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => event.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  const initials = callerName.split(' ').map((word) => word[0]).slice(0, 2).join('');
  return <div className="call-overlay" role="presentation">
    <section className={cn('incoming-call', className)} role="dialog" aria-modal="true" aria-labelledby={titleId}>
      <button type="button" className="incoming-close" onClick={onClose} aria-label="Dismiss call preview">×</button>
      <div className="incoming-rings" aria-hidden><i /><i /><i /></div>
      <div className="incoming-avatar">{initials}</div>
      <p className="incoming-kicker">Svara call preview</p>
      <h2 id={titleId}>{callerName}{callerInfo && <span> · {callerInfo}</span>}</h2>
      <p className="incoming-status">{statusText}</p>
      <div className="incoming-actions">
        <button type="button" className="incoming-decline" onClick={onDecline}><span>×</span>Decline</button>
        <button ref={acceptRef} type="button" className="incoming-accept" onClick={onAccept}><span>☎</span>Accept preview</button>
      </div>
    </section>
  </div>;
}
