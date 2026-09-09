/* MOONtuner Rites — shared navigation shell.
   Injected into every standalone rite document so readers always have a way
   back to the catalog and on to the next working document.
   Attaches to <html> (not <body>) so client-side runtimes that re-render the
   body cannot wipe it out. */
(function () {
  "use strict";

  var SERIES = [
    { title: "The Lens Rite", label: "Volume I", href: "/rites/the-lens-rite.html" },
    { title: "The Arrival Rite", label: "Volume II", href: "/rites/the-arrival-rite.html" },
    { title: "The Sabotage Rite", label: "Working Rite", href: "/rites/series/the-sabotage-rite.html" },
    { title: "The Mirror Rite", label: "Working Rite", href: "/rites/series/the-mirror-rite.html" },
    { title: "The Scar Rite", label: "Working Rite", href: "/rites/series/the-scar-rite.html" },
    { title: "The Foundation Rite", label: "Working Rite", href: "/rites/series/the-foundation-rite.html" },
    { title: "The Severance Rite", label: "Working Rite", href: "/rites/series/the-severance-rite.html" },
    { title: "The Seal Rite", label: "Working Rite", href: "/rites/series/the-seal-rite.html" },
    { title: "The Forge Rite", label: "Working Rite", href: "/rites/series/the-forge-rite.html" },
    { title: "The Threshold Rite", label: "Working Rite", href: "/rites/series/the-threshold-rite.html" },
    { title: "The Codex", label: "Capstone", href: "/rites/series/the-codex.html" },
    { title: "Codex Notation Reference", label: "Appendix", href: "/rites/series/the-codex-notation-reference.html" }
  ];

  var path = window.location.pathname.replace(/\/+$/, "");
  var idx = -1;
  for (var i = 0; i < SERIES.length; i++) {
    if (path.indexOf(SERIES[i].href) !== -1) { idx = i; break; }
  }
  var current = idx >= 0 ? SERIES[idx] : null;
  var prev = idx > 0 ? SERIES[idx - 1] : null;
  var next = idx >= 0 && idx < SERIES.length - 1 ? SERIES[idx + 1] : null;

  var css = [
    ".mt-ritenav{position:fixed;top:0;left:0;right:0;z-index:9999;display:flex;align-items:center;justify-content:space-between;gap:14px;",
    "padding:9px 16px;background:rgba(8,8,8,0.86);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);",
    "border-bottom:1px solid rgba(184,146,74,0.24);font-family:'Barlow Condensed','Karla',system-ui,sans-serif;}",
    ".mt-ritenav a,.mt-ritenav button{font:inherit;color:#A99C82;text-decoration:none;background:none;border:0;cursor:pointer;",
    "font-size:12px;letter-spacing:.16em;text-transform:uppercase;white-space:nowrap;transition:color .2s;}",
    ".mt-ritenav a:hover,.mt-ritenav button:hover{color:#D4AF6A;}",
    ".mt-ritenav .mt-rn-title{color:#EDE6D6;letter-spacing:.1em;font-size:12px;overflow:hidden;text-overflow:ellipsis;",
    "white-space:nowrap;text-align:center;flex:1 1 auto;min-width:0;}",
    ".mt-ritenav .mt-rn-side{display:flex;align-items:center;gap:14px;flex:0 0 auto;}",
    ".mt-rn-spacer{height:42px;}",
    ".mt-ritefoot{max-width:720px;margin:0 auto;padding:34px 24px 72px;display:flex;flex-wrap:wrap;gap:16px;",
    "justify-content:space-between;border-top:1px solid rgba(184,146,74,0.22);",
    "font-family:'Barlow Condensed','Karla',system-ui,sans-serif;}",
    ".mt-ritefoot a{display:block;color:#A99C82;text-decoration:none;font-size:13px;letter-spacing:.12em;text-transform:uppercase;transition:color .2s;}",
    ".mt-ritefoot a:hover{color:#D4AF6A;}",
    ".mt-ritefoot .mt-rf-kicker{display:block;font-size:10px;letter-spacing:.22em;color:#71675A;margin-bottom:5px;}",
    "@media(max-width:560px){.mt-ritenav .mt-rn-title{display:none;}}",
    "@media print{.mt-ritenav,.mt-ritefoot,.mt-rn-spacer{display:none!important;}}"
  ].join("");

  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function build() {
    if (document.querySelector(".mt-ritenav")) return;

    var style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);

    var bar = document.createElement("nav");
    bar.className = "mt-ritenav";
    bar.setAttribute("aria-label", "Rite navigation");
    bar.innerHTML =
      '<div class="mt-rn-side">' +
        '<a href="/rites">&#8592; All Rites</a>' +
        (prev ? '<a href="' + prev.href + '" title="' + esc(prev.title) + '">Prev</a>' : "") +
      "</div>" +
      '<span class="mt-rn-title">' + esc(current ? current.title : "MOONtuner Rites") + "</span>" +
      '<div class="mt-rn-side">' +
        (next ? '<a href="' + next.href + '" title="' + esc(next.title) + '">Next</a>' : "") +
        '<button type="button" data-mt-print>Print</button>' +
      "</div>";
    document.documentElement.appendChild(bar);

    var printBtn = bar.querySelector("[data-mt-print]");
    if (printBtn) printBtn.addEventListener("click", function () { window.print(); });

    var spacer = document.createElement("div");
    spacer.className = "mt-rn-spacer";
    if (document.body.firstChild) document.body.insertBefore(spacer, document.body.firstChild);
    else document.body.appendChild(spacer);

    var foot = document.createElement("div");
    foot.className = "mt-ritefoot";
    foot.innerHTML =
      (prev
        ? '<a href="' + prev.href + '"><span class="mt-rf-kicker">Previous</span>&#8592; ' + esc(prev.title) + "</a>"
        : '<a href="/rites"><span class="mt-rf-kicker">Series</span>&#8592; The Rites</a>') +
      '<a href="/rites" style="text-align:center"><span class="mt-rf-kicker">Catalog</span>All Rites</a>' +
      (next
        ? '<a href="' + next.href + '" style="text-align:right"><span class="mt-rf-kicker">Next</span>' + esc(next.title) + " &#8594;</a>"
        : '<a href="/school/curriculum" style="text-align:right"><span class="mt-rf-kicker">Theory</span>School Curriculum &#8594;</a>');
    document.body.appendChild(foot);

    // Re-append the footer if a client runtime re-renders the body.
    if (window.MutationObserver) {
      var obs = new MutationObserver(function () {
        if (!document.body.contains(foot)) document.body.appendChild(foot);
        if (!document.documentElement.contains(bar)) document.documentElement.appendChild(bar);
      });
      obs.observe(document.body, { childList: true });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { setTimeout(build, 0); });
  } else {
    setTimeout(build, 0);
  }
})();
