function BrowserChrome({ url, dated }: { url: string; dated?: boolean }) {
  return (
    <div
      className={`flex items-center gap-2 border-b px-3 py-2 ${
        dated ? "border-neutral-300 bg-neutral-200" : "border-border bg-muted"
      }`}
    >
      <div className="flex gap-1" aria-hidden="true">
        <span className="size-2 rounded-full bg-neutral-400/70" />
        <span className="size-2 rounded-full bg-neutral-400/70" />
        <span className="size-2 rounded-full bg-neutral-400/70" />
      </div>
      <span
        className={`ml-1 truncate rounded-sm px-2 py-0.5 font-mono text-[10px] ${
          dated
            ? "bg-white text-neutral-500"
            : "bg-background text-muted-foreground"
        }`}
      >
        {url}
      </span>
    </div>
  );
}

export function BeforeAfter() {
  return (
    <figure className="w-full">
      <div className="grid items-center gap-5 sm:grid-cols-[1fr_auto_1fr] sm:gap-4">
        {/* Before: the 2009 site */}
        <div className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:duration-700 overflow-hidden rounded-lg border border-neutral-300 bg-[#efeeea] shadow-sm sm:-rotate-1">
          <BrowserChrome url="yourstudio.com/index2.html" dated />
          <div
            className="space-y-2 p-3 text-neutral-800"
            style={{ fontFamily: '"Times New Roman", Times, serif' }}
          >
            <p className="border-2 border-neutral-400 bg-[#ffffcc] px-2 py-1 text-center text-sm font-bold text-[#cc0000]">
              Welcome To Our Web Site!!
            </p>
            <p className="text-center text-[11px] text-[#0000ee]">
              <u>Home</u> | <u>About Us</u> | <u>Photo Gallery</u> |{" "}
              <u>Links</u>
            </p>
            <div className="flex gap-2">
              <div className="h-14 w-16 shrink-0 border border-neutral-400 bg-neutral-300" />
              <p className="text-[10px] leading-snug">
                We are proud to serve the greater Spokane area with quality
                portraits for over 20 years. Please sign our guestbook!
              </p>
            </div>
            <p className="text-center text-[9px] text-neutral-600">
              Visitors: 004,829 · Best viewed in Internet Explorer
              <br />
              Last updated 3/17/2009
            </p>
          </div>
        </div>

        <div
          className="justify-self-center font-display text-2xl font-bold text-brass"
          aria-hidden="true"
        >
          <span className="hidden sm:inline">→</span>
          <span className="sm:hidden">↓</span>
        </div>

        {/* After: the rebuild */}
        <div className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:delay-200 motion-safe:duration-700 motion-safe:fill-mode-both overflow-hidden rounded-lg border border-border bg-card shadow-md">
          <BrowserChrome url="yourstudio.com" />
          <div className="space-y-3 p-4">
            <div className="flex items-center justify-between">
              <span className="font-display text-sm font-bold tracking-tight">
                Your Studio
              </span>
              <span className="flex gap-2 font-mono text-[9px] text-muted-foreground">
                <span>Work</span>
                <span>About</span>
                <span>Book</span>
              </span>
            </div>
            <p className="font-display text-lg leading-tight font-semibold tracking-tight">
              Portraits that feel like you.
            </p>
            <div className="grid grid-cols-3 gap-1.5" aria-hidden="true">
              <div className="h-10 rounded-sm bg-primary/15" />
              <div className="h-10 rounded-sm bg-primary/30" />
              <div className="h-10 rounded-sm bg-primary/15" />
            </div>
            <span className="inline-block rounded-md bg-primary px-3 py-1 text-[10px] font-medium text-primary-foreground">
              Book a session
            </span>
          </div>
        </div>
      </div>
      <figcaption className="mt-4 text-center font-mono text-xs text-muted-foreground">
        before / after — illustrative, until we can show yours
      </figcaption>
    </figure>
  );
}
