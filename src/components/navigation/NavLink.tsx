import Link from "next/link";

interface NavLinkItem {
  href: string;
  label: string;
  highlight: boolean;
}

export function NavLink({ link, onClick }: { link: NavLinkItem; onClick?: () => void }) {
  if (link.highlight) {
    return (
      <Link
        href={link.href}
        onClick={onClick}
        className="tracking-luxury transition-colors duration-300 group"
        style={{
          color: "var(--color-charcoal)",
          border: "1px solid var(--color-charcoal)",
          padding: "8px 20px",
          background: "transparent",
          display: "inline-block",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.background = "var(--color-charcoal)";
          (e.currentTarget as HTMLAnchorElement).style.color = "#ffffff";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
          (e.currentTarget as HTMLAnchorElement).style.color = "var(--color-charcoal)";
        }}
      >
        {link.label}
      </Link>
    );
  }
  return (
    <Link
      href={link.href}
      onClick={onClick}
      className="tracking-luxury text-[var(--color-charcoal)] hover:text-[var(--color-taupe)] transition-colors duration-300 relative after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-[var(--color-taupe)] after:transition-all after:duration-300 hover:after:w-full"
    >
      {link.label}
    </Link>
  );
}
