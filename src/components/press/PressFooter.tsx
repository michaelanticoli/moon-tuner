import { useId, useState } from "react";
import mark from "@/assets/moontuner-mark.jpeg";
import { PRESS_CONTACT_EMAIL, PRESS_EST } from "./pressData";

/**
 * Minimal footer. "Imprint" discloses the publisher's notice inline rather
 * than routing elsewhere, keeping the press a self-contained single page.
 */
export function PressFooter() {
  const [imprintOpen, setImprintOpen] = useState(false);
  const imprintId = useId();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-black bg-white text-black">
      <div className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 md:py-16 lg:px-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-5">
            <img
              src={mark}
              alt="Moontuner Press"
              width={1377}
              height={1507}
              loading="lazy"
              decoding="async"
              draggable={false}
              className="press-logo h-11 w-auto"
            />
            <p className="press-label text-black/60">
              © {year} Moontuner Press
            </p>
          </div>

          <ul className="press-label flex items-center gap-10">
            <li>
              <a href={`mailto:${PRESS_CONTACT_EMAIL}?subject=Moontuner%20Press`} className="press-link">
                Contact
              </a>
            </li>
            <li>
              <button
                type="button"
                className="press-label press-link uppercase"
                aria-expanded={imprintOpen}
                aria-controls={imprintId}
                onClick={() => setImprintOpen((v) => !v)}
              >
                Imprint
              </button>
            </li>
          </ul>
        </div>

        <div
          id={imprintId}
          hidden={!imprintOpen}
          className="mt-12 border-t border-black/15 pt-8"
        >
          <dl className="press-label grid gap-6 text-black/60 sm:grid-cols-3">
            <div>
              <dt className="text-black/35">Publisher</dt>
              <dd className="mt-2 text-black">Moontuner Press · {PRESS_EST}</dd>
            </div>
            <div>
              <dt className="text-black/35">Correspondence</dt>
              <dd className="mt-2 normal-case tracking-[0.08em] text-black">
                <a href={`mailto:${PRESS_CONTACT_EMAIL}`} className="press-link">
                  {PRESS_CONTACT_EMAIL}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-black/35">Rights</dt>
              <dd className="mt-2 text-black">All works © Moontuner Press. All rights reserved.</dd>
            </div>
          </dl>
        </div>
      </div>
    </footer>
  );
}
