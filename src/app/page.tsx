import { Button } from "@/components/ui/button";
import { BeforeAfter } from "@/components/site/before-after";
import { ContactForm } from "@/components/site/contact-form";

function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display font-bold tracking-tight ${className}`}>
      Shiner Solutions<span className="text-brass">.</span>
    </span>
  );
}

const OFFERS = [
  {
    name: "Managed websites",
    body: "We design it, build it, host it, and keep it healthy — and when you need something changed, you ask and it gets done. One monthly bill, nothing to learn.",
    cta: "Ask about a managed site",
  },
  {
    name: "Build & migrate",
    body: "Have a site that needs rescuing — or none at all? We build the new one, move everything over safely, and hand you the keys.",
    cta: "Ask about a rebuild",
  },
  {
    name: "Technical consulting",
    body: "Your on-call tech guy for everything else: software decisions, computers and tooling, getting real value out of AI — whatever's slowing you down.",
    cta: "Bring us a problem",
  },
];

const OWNED = ["Your domain", "The design & code", "The hosting account"];

export default function Home() {
  return (
    <>
      <header className="sticky top-0 z-10 border-b border-border bg-background/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3">
          <a href="#top" className="text-base sm:text-lg">
            <Wordmark />
          </a>
          <nav
            aria-label="Sections"
            className="flex items-center gap-3.5 text-xs whitespace-nowrap sm:gap-7 sm:text-sm"
          >
            <a href="#offer" className="text-ink-soft hover:text-foreground">
              What we do
            </a>
            <a href="#why" className="text-ink-soft hover:text-foreground">
              Why us
            </a>
            <a href="#contact" className="font-medium text-primary hover:underline">
              Contact
            </a>
          </nav>
        </div>
      </header>

      <main id="top" className="flex-1">
        {/* Hero */}
        <section className="mx-auto grid max-w-5xl items-center gap-12 px-5 pt-16 pb-20 lg:grid-cols-[1.1fr_1fr] lg:gap-10 lg:pt-24">
          <div>
            <p className="font-mono text-xs tracking-widest text-brass uppercase">
              Spokane Valley, WA · Local &amp; independent
            </p>
            <h1 className="font-display mt-4 text-4xl leading-[1.05] font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Your website, handled.
              <br />
              <span className="text-primary">And you own everything.</span>
            </h1>
            <p className="mt-6 max-w-md text-lg text-ink-soft">
              Modern, professional websites for local businesses — designed,
              built, and looked after by a real person you know by name. No
              templates. No lock-in. No ticket queues.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <Button size="lg" asChild>
                <a href="#contact">Start a conversation</a>
              </Button>
              <a
                href="#offer"
                className="text-sm text-ink-soft underline underline-offset-4 hover:text-foreground"
              >
                See what that includes
              </a>
            </div>
          </div>
          <BeforeAfter />
        </section>

        {/* Who it's for */}
        <section className="bg-tint">
          <div className="mx-auto max-w-5xl px-5 py-16">
            <h2 className="font-display max-w-xl text-3xl font-bold tracking-tight sm:text-4xl">
              For the businesses that keep this town running
            </h2>
            <p className="mt-5 max-w-2xl text-lg text-ink-soft">
              Photography studios, bakeries, contractors, dance schools — great
              at the work, stuck with a website from another era. If your site
              makes you wince a little when you send someone the link,
              you&apos;re exactly who this is for.
            </p>
          </div>
        </section>

        {/* Offer */}
        <section id="offer" className="scroll-mt-16">
          <div className="mx-auto max-w-5xl px-5 py-20">
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              What we do
            </h2>
            <p className="mt-4 max-w-2xl text-ink-soft">
              Three ways to work with us. No pricing-page games — tell us what
              you need and we&apos;ll quote it straight.
            </p>
            <div className="mt-10">
              {OFFERS.map((offer) => (
                <div
                  key={offer.name}
                  className="grid gap-3 border-t border-border py-8 md:grid-cols-[16rem_1fr] md:gap-8 lg:grid-cols-[18rem_1fr]"
                >
                  <h3 className="font-display text-2xl font-semibold tracking-tight">
                    {offer.name}
                  </h3>
                  <div>
                    <p className="text-lg text-ink-soft">{offer.body}</p>
                    <a
                      href="#contact"
                      className="mt-3 inline-block font-medium text-primary hover:underline"
                    >
                      {offer.cta} →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why us */}
        <section id="why" className="scroll-mt-16 bg-tint">
          <div className="mx-auto max-w-5xl px-5 py-20">
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Why not just use a template site?
            </h2>
            <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-8">
              <div>
                <h3 className="font-display text-xl font-semibold">
                  A person, not a platform
                </h3>
                <p className="mt-3 text-ink-soft">
                  You get a developer who knows your business and answers when
                  something needs changing — not a help center, not a chatbot,
                  not a ticket number.
                </p>
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold">
                  Built around your business
                </h3>
                <p className="mt-3 text-ink-soft">
                  Template sites make you do the work and still look like
                  everyone else&apos;s. Yours is designed around how your
                  business actually runs — and we make the changes for you.
                </p>
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold">
                  You own everything
                </h3>
                <ul className="mt-3 divide-y divide-border rounded-lg border border-border bg-card font-mono text-sm">
                  {OWNED.map((item) => (
                    <li
                      key={item}
                      className="flex items-center justify-between px-3 py-2"
                    >
                      <span>{item}</span>
                      <span className="text-primary">yours ✓</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-ink-soft">
                  If we ever part ways, it all stays with you — any developer
                  could pick it up tomorrow.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="scroll-mt-16">
          <div className="mx-auto max-w-2xl px-5 py-20">
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Start the conversation
            </h2>
            <p className="mt-4 text-lg text-ink-soft">
              Tell us a little about your business and what you need.
              You&apos;ll get a real reply from Raymond within a business day.
            </p>
            <div className="relative mt-10">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-5 py-8 text-sm text-muted-foreground">
          <div>
            <Wordmark className="text-foreground" />
            <p className="mt-1">Spokane Valley, Washington</p>
          </div>
          <div className="text-right">
            <a
              className="hover:text-foreground hover:underline"
              href="mailto:hello@shinersolutions.com"
            >
              hello@shinersolutions.com
            </a>
            <p className="mt-1 font-mono text-xs">
              Built by hand — like everything we make.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
