import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const highlights = [
    "Create role-based interview sessions in seconds",
    "Practice with generated questions and structured answers",
    "Track your prep in one focused workspace",
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(251,191,36,0.32),_transparent_32%),linear-gradient(135deg,_#fff8eb_0%,_#fffdf8_42%,_#ffe4c4_100%)]">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-[-4rem] top-16 h-48 w-48 rounded-full bg-orange-200/40 blur-3xl" />
        <div className="absolute right-[-3rem] top-24 h-60 w-60 rounded-full bg-amber-300/30 blur-3xl" />
        <div className="absolute bottom-10 left-1/2 h-44 w-44 -translate-x-1/2 rounded-full bg-yellow-100/70 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-6 py-12">
        <div className="grid w-full gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <section className="max-w-2xl">
            <p className="mb-5 inline-flex items-center rounded-full border border-orange-200 bg-white/70 px-4 py-2 text-sm font-semibold text-orange-700 shadow-sm backdrop-blur">
              Night Coding Marathon
            </p>

            <h1 className="text-5xl font-extrabold leading-tight text-slate-900 sm:text-6xl">
              Turn interview prep into a{" "}
              <span className="text-orange-500">clear daily system</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              Build focused practice sessions, review ready-to-study questions,
              and keep your interview preparation organized without juggling
              random notes and tabs.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <button
                onClick={() => navigate("/login")}
                className="rounded-2xl bg-slate-950 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-slate-900/15 transition hover:-translate-y-0.5 hover:bg-slate-800"
              >
                Start Practicing
              </button>

              <button
                onClick={() => navigate("/signup")}
                className="rounded-2xl border border-slate-300 bg-white/80 px-7 py-3.5 text-base font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-orange-300 hover:bg-white"
              >
                Create Account
              </button>
            </div>

            <div className="mt-10 grid gap-3 text-left">
              {highlights.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl bg-white/65 px-4 py-3 shadow-sm backdrop-blur"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-sm font-bold text-orange-600">
                    +
                  </div>
                  <p className="text-sm font-medium text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="relative">
            <div className="rounded-[2rem] border border-white/70 bg-white/70 p-5 shadow-[0_20px_80px_rgba(15,23,42,0.12)] backdrop-blur">
              <div className="rounded-[1.5rem] bg-slate-950 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.25em] text-orange-300">
                      Prep Snapshot
                    </p>
                    <h2 className="mt-2 text-2xl font-bold">
                      Frontend Developer
                    </h2>
                  </div>
                  <div className="rounded-2xl bg-white/10 px-4 py-2 text-right">
                    <p className="text-xs text-slate-300">Experience</p>
                    <p className="text-lg font-semibold">2 Years</p>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl bg-white/8 p-4">
                  <p className="text-sm text-slate-300">Focus Topics</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {["React", "JavaScript", "APIs", "Debugging"].map((topic) => (
                      <span
                        key={topic}
                        className="rounded-full bg-orange-400/15 px-3 py-1 text-sm font-medium text-orange-200"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="rounded-2xl border border-white/10 bg-white/6 p-4">
                    <p className="text-sm font-semibold text-white">
                      Sample Question
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      How would you explain the difference between controlled
                      and uncontrolled components in React?
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-orange-400 p-4 text-slate-950">
                      <p className="text-xs font-semibold uppercase tracking-wide">
                        Questions Ready
                      </p>
                      <p className="mt-2 text-3xl font-extrabold">10</p>
                    </div>

                    <div className="rounded-2xl bg-white/8 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">
                        Progress
                      </p>
                      <p className="mt-2 text-3xl font-extrabold text-white">
                        84%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
