import { brandIcons, type BrandIcon as BrandIconName } from "@/lib/brand-icons";

export default function BrandIcon({ name, className = "h-5 w-5" }: { name: BrandIconName; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d={brandIcons[name]} />
    </svg>
  );
}
