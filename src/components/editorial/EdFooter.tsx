import { Link } from "react-router-dom";
import mark from "@/assets/moontuner-mark.jpeg";
import { ED_CONTACT_EMAIL, ED_EST, ED_FOOTER_LINKS } from "./editorialData";

/** Minimal footer: mark, year, and the few links a reader needs next. */
export function EdFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-black bg-white text-black">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-10 px-5 py-14 sm:px-8 md:flex-row md:items-center md:justify-between md:py-16 lg:px-12">
        <div className="flex items-center gap-5">
          <img
            src={mark}
            alt=""
            width={1377}
            height={1507}
            decoding="async"
            draggable={false}
            className="ed-logo h-11 w-auto"
          />
          <p className="ed-label text-black/60">
            © {year} Moontuner · {ED_EST}
          </p>
        </div>

        <ul className="ed-label flex flex-wrap items-center gap-x-8 gap-y-4">
          {ED_FOOTER_LINKS.map((l) => (
            <li key={l.href}>
              <Link to={l.href} className="ed-link">
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <a href={`mailto:${ED_CONTACT_EMAIL}`} className="ed-link">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
