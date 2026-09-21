import { usePageTitle } from "@/hooks/usePageMeta";
import { asset } from "@/data/assets";
import { Button } from "@/components/ui/Button";

// ✏️ Edit your story here. Each chapter can have as many paragraphs as you like.
const STORY = [
  {
    label: "Who we are",
    paras: [
      "SORA is something we started together- a couple with a shared love for style, design, and the little details that make something feel special.",
      "What began as an idea between us slowly became something we wanted to build, shape, and share with you.",
    ],
  },

  {
    label: "Why we started",
    paras: [
      "We believe you don't have just one mood, so why should your style?",
      "Some days are bold. Some are effortless. Some are playful, quiet, or somewhere in between. We wanted sunglasses that could move with every version of you — different styles, different moods, but always feeling like you.",
    ],
  },

  {
    label: "What we're building",
    paras: [
      "We're building SORA around self-expression — pieces that feel right for wherever your mood takes you.",
      "We're starting with sunglasses, with more to come. Different styles. Different moods. Still you.",
    ],
  },
];

const SIGNATURE = "With Love, [Our names]"; // ✏️ shown under the story
const BLOCKS = [
  {
    h: "Aesthetic",
    p: "Warm tones, quiet shapes and nothing that shouts. Every detail is edited until only the essential remains.",
  },
  {
    h: "Lifestyle",
    p: "Made for long afternoons, coastlines, city light and everything in between — the moments you'd rather see clearly.",
  },
  {
    h: "Point of view",
    p: "SORA is a way of looking first. The pieces follow.",
  },
];

export default function About() {
  usePageTitle("About");
  return (
    <>
      {/* <section className="wrap pb-16 pt-16 md:pb-24 md:pt-28">
        <div className="grid gap-10 lg:grid-cols-12">
          <h1 className="t-display text-[clamp(3rem,8vw,7.5rem)] lg:col-span-8">
            A quiet
            <br />
            point of view.
          </h1>
          <p className="t-editorial self-end text-balance text-[clamp(1.5rem,2.2vw,2rem)] text-espresso/85 lg:col-span-4">
            Everyone sees the world a little differently. That is worth
            designing for.
          </p>
        </div>
      </section> */}

      {/* <div className="wrap">
        <img
          src={asset("sun-sand")}
          alt="SORA frame resting on warm stone among olive leaves"
          className="aspect-[4/3] w-full object-cover md:aspect-[16/9]"
        />
      </div> */}

      {/* OUR STORY */}
      <section className="wrap grid gap-5 lg:py-20 py-5 md:py-32 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <p className="text-[0.6875rem] uppercase tracking-[0.28em] text-olive">
              Our story
            </p>
            <h2 className="t-display mt-5 text-[clamp(2.25rem,4.5vw,4rem)]">
              Why we started
              {/* <br /> */}
              {/* started. */}
            </h2>
            <span className="mt-8 block h-px w-16 bg-champagne" />
          </div>
        </div>

        <div className="md:space-y-14 space-y-8 lg:col-span-8 lg:space-y-20">
          {STORY.map((c, i) => (
            <article
              key={c.label}
              className="grid gap-4 md:grid-cols-[7rem_1fr] md:gap-10"
            >
              <div className="flex items-baseline gap-3 md:flex-col md:gap-1">
                <span className="font-display text-2xl text-champagne">
                  0{i + 1}
                </span>
                <h3 className="text-[0.75rem] uppercase tracking-[0.2em] text-espresso/70">
                  {c.label}
                </h3>
              </div>
              <div className="space-y-5">
                {c.paras.map((p, j) => (
                  <p
                    key={j}
                    className={
                      j === 0
                        ? "t-editorial text-balance text-[clamp(1.35rem,2vw,1.75rem)] leading-snug text-espresso"
                        : "max-w-xl text-[0.9375rem] leading-[1.9] text-espresso/80"
                    }
                  >
                    {p}
                  </p>
                ))}
              </div>
            </article>
          ))}

          <p className="border-t border-champagne pt-6 font-display text-xl text-espresso/85 md:ml-[8.5rem]">
            {SIGNATURE}
          </p>
        </div>
      </section>

      {/* WHAT WE STAND FOR */}
      <section className="wrap grid gap-14 border-t border-champagne/60 py-20 md:py-28 lg:grid-cols-3 lg:gap-16">
        {BLOCKS.map((b) => (
          <div key={b.h} className="border-t border-champagne pt-6">
            <h2 className="font-display text-3xl">{b.h}</h2>
            <p className="mt-4 text-[0.9375rem] leading-[1.9] text-espresso/80">
              {b.p}
            </p>
          </div>
        ))}
      </section>

      <section className="bg-olive text-ivory">
        <div className="wrap grid items-center gap-12 py-20 md:py-28 lg:grid-cols-2 lg:gap-24">
          <img
            src={asset("woman-1")}
            alt="Woman in sunglasses in warm light"
            loading="lazy"
            className="mx-auto aspect-[4/5] w-full max-w-md object-cover object-[50%_25%] lg:mx-0"
          />
          <div>
            <p className="t-editorial text-[clamp(2.4rem,5vw,4.5rem)]">
              Confidence looks good on you.
            </p>
            <span className="mt-8 block h-px w-16 bg-champagne" />
            <p className="mt-8 max-w-md text-[0.9375rem] leading-[1.9] text-ivory/85">
              A person's style is not just what they wear. It is how they choose
              to see the world.
            </p>
            <div className="mt-10">
              <Button to="/shop" variant="light">
                SHOP NOW
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
