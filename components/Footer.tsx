import Link from 'next/link';

const groups = [
  ['Product', 'How it works', 'Capabilities', 'Pricing'],
  ['Company', 'About', 'Careers', 'Contact'],
  ['Legal & safety', 'Privacy', 'Terms', 'Security'],
];

export function Footer() {
  return <footer className="border-t border-line bg-white"><div className="mx-auto grid max-w-[1180px] gap-8 px-5 py-12 sm:grid-cols-2 md:grid-cols-[1.7fr_1fr_1fr_1fr]"><div><Link href="/" className="flex items-center gap-2 text-[13px] font-extrabold tracking-[-.06em]"><span className="grid h-5 w-5 place-items-center rounded-md bg-primary text-[10px] text-white">S</span><span>svara<span className="text-primary">labs</span></span></Link><p className="mt-4 max-w-[210px] text-[10px] leading-5 text-ink/48">AI phone employees for teams that believe the first useful call should happen now, not tomorrow.</p><a className="mt-5 block text-[10px] font-bold text-primary" href="mailto:hello@svara.ai">hello@svara.ai</a><p className="mt-2 text-[9px] text-ink/38">Built for India, everywhere.</p></div>{groups.map(group => <div key={group[0]}><p className="text-[10px] font-extrabold text-ink">{group[0]}</p>{group.slice(1).map(label => <Link className="mt-3 block text-[10px] font-medium text-ink/48 transition hover:text-primary" href="#top" key={label}>{label}</Link>)}</div>)}</div><div className="border-t border-line px-5 py-4 text-center text-[9px] text-ink/35">© 2026 Svara Labs · Made for conversations that move work forward.</div></footer>;
}
