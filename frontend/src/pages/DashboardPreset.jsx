import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

const presets = [
  {
    label: "MERN",
    role: "MERN Stack Developer",
    experience: "2 years",
    topicsToFocus: "MongoDB, Express, React, Node.js",
    accent: "bg-orange-400 text-slate-950",
  },
  {
    label: "DSA",
    role: "Data Structures and Algorithms",
    experience: "1 year",
    topicsToFocus: "Arrays, Trees, Graphs, Dynamic Programming",
    accent: "bg-slate-950 text-white",
  },
  {
    label: "Java",
    role: "Java Developer",
    experience: "2 years",
    topicsToFocus: "Core Java, Spring Boot, OOPs, REST APIs",
    accent: "bg-white text-slate-900 border border-slate-200",
  },
  {
    label: "Python",
    role: "Python Developer",
    experience: "2 years",
    topicsToFocus: "Python, Django, FastAPI, SQL",
    accent: "bg-amber-100 text-slate-900",
  },
  {
    label: "AI",
    role: "AI Engineer",
    experience: "1 year",
    topicsToFocus: "Machine Learning, NLP, LLMs, Python",
    accent: "bg-orange-50 text-orange-700 border border-orange-200",
  },
];

const DashboardPreset = () => {
  const [sessions, setSessions] = useState([]);
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [topicsToFocus, setTopicsToFocus] = useState("");
  const [creating, setCreating] = useState(false);
  const navigate = useNavigate();

  const totalQuestions = sessions.reduce(
    (count, session) => count + (session.questions?.length || 0),
    0,
  );

  const getSessions = async () => {
    const res = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
    return res.data.sessions || [];
  };

  const applyPreset = (preset) => {
    setRole(preset.role);
    setExperience(preset.experience);
    setTopicsToFocus(preset.topicsToFocus);
  };

  const fetchSessions = async () => {
    try {
      const nextSessions = await getSessions();
      setSessions(nextSessions);
    } catch (error) {
      console.log(error.response);
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login", { replace: true });
      }
    }
  };

  const createSession = async () => {
    if (!role || !experience) return alert("Fill role and experience first");

    try {
      setCreating(true);
      const res = await axiosInstance.post(API_PATHS.SESSION.CREATE, {
        role,
        experience,
        topicsToFocus,
        description: "",
        questions: [],
      });

      setRole("");
      setExperience("");
      setTopicsToFocus("");

      const sessionId = res.data.session?._id;
      if (sessionId) {
        navigate(`/interview/${sessionId}`);
        return;
      }
    } catch (error) {
      console.log(error.response);
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login", { replace: true });
        return;
      }
      alert(error.response?.data?.message || "Could not create the session");
    } finally {
      setCreating(false);
    }

    fetchSessions();
  };

  useEffect(() => {
    let isMounted = true;

    const loadSessions = async () => {
      try {
        const nextSessions = await getSessions();
        if (isMounted) {
          setSessions(nextSessions);
        }
      } catch (error) {
        console.log(error.response);
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login", { replace: true });
        }
      }
    };

    loadSessions();

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(251,191,36,0.18),_transparent_25%),linear-gradient(180deg,_#fffaf3_0%,_#fffdf9_48%,_#fff6ec_100%)]">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-8 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[2rem] border border-white/70 bg-white/75 p-8 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-orange-500">
              Interview Workspace
            </p>
            <h1 className="text-4xl font-extrabold leading-tight text-slate-900">
              Choose your track and start practicing faster.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
              Login ke baad seedha apna path choose karo: MERN, DSA, Java,
              Python, ya AI. Preset topics ke saath session instantly start ho
              jayega.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            <div className="rounded-[1.7rem] bg-slate-950 p-5 text-white shadow-lg shadow-slate-900/10">
              <p className="text-xs uppercase tracking-[0.25em] text-orange-300">
                Sessions
              </p>
              <p className="mt-3 text-3xl font-extrabold">{sessions.length}</p>
            </div>
            <div className="rounded-[1.7rem] bg-orange-400 p-5 text-slate-950 shadow-lg shadow-orange-200/60">
              <p className="text-xs uppercase tracking-[0.25em]">Questions</p>
              <p className="mt-3 text-3xl font-extrabold">{totalQuestions}</p>
            </div>
            <div className="rounded-[1.7rem] border border-orange-100 bg-white p-5 shadow-sm">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
                Tracks
              </p>
              <p className="mt-3 text-sm font-semibold leading-6 text-slate-700">
                Ready-made developer paths with editable topics
              </p>
            </div>
          </div>
        </div>

        <div className="mb-8 rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Pick a Preset
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Click a preset below, then create your session.
              </p>
            </div>
            <div className="rounded-full bg-orange-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-orange-500">
              Quick Start
            </div>
          </div>

          <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {presets.map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => applyPreset(preset)}
                className={`rounded-[1.5rem] p-4 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md ${preset.accent}`}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.24em]">
                  {preset.label}
                </p>
                <p className="mt-3 text-base font-bold">{preset.role}</p>
                <p className="mt-2 text-xs leading-5 opacity-80">
                  {preset.topicsToFocus}
                </p>
              </button>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-[1.5fr_140px_1.5fr_auto]">
            <input
              placeholder="Role (Frontend Developer)"
              value={role}
              className="rounded-2xl border border-slate-200 bg-slate-50/80 p-3.5 text-slate-800 outline-none transition focus:border-orange-300 focus:bg-white focus:ring-4 focus:ring-orange-100"
              onChange={(e) => setRole(e.target.value)}
            />

            <input
              placeholder="2 years"
              value={experience}
              className="rounded-2xl border border-slate-200 bg-slate-50/80 p-3.5 text-slate-800 outline-none transition focus:border-orange-300 focus:bg-white focus:ring-4 focus:ring-orange-100"
              onChange={(e) => setExperience(e.target.value)}
            />

            <input
              placeholder="Topics (React, JavaScript)"
              value={topicsToFocus}
              className="rounded-2xl border border-slate-200 bg-slate-50/80 p-3.5 text-slate-800 outline-none transition focus:border-orange-300 focus:bg-white focus:ring-4 focus:ring-orange-100"
              onChange={(e) => setTopicsToFocus(e.target.value)}
            />

            <button
              onClick={createSession}
              disabled={creating}
              className="rounded-2xl bg-slate-950 px-6 py-3.5 font-semibold text-white shadow-lg shadow-slate-900/15 transition hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {creating ? "Creating..." : "Create"}
            </button>
          </div>
        </div>

        {sessions.length === 0 ? (
          <div className="rounded-[2rem] border border-dashed border-orange-200 bg-white/75 px-6 py-18 text-center shadow-sm backdrop-blur">
            <p className="text-xl font-bold text-slate-800">No sessions yet</p>
            <p className="mt-2 text-sm text-slate-500">
              Pick a preset track above and create your first session.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {sessions.map((s) => (
              <div
                key={s._id}
                onClick={() => navigate(`/interview/${s._id}`)}
                className="group cursor-pointer rounded-[1.7rem] border border-white/70 bg-white/85 p-5 shadow-[0_12px_40px_rgba(15,23,42,0.08)] backdrop-blur transition hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(15,23,42,0.12)]"
              >
                <h2 className="mb-2 text-lg font-semibold text-slate-900">
                  {s.role}
                </h2>
                <p className="text-sm text-slate-500">{s.experience} experience</p>
                {s.topicsToFocus ? (
                  <p className="mt-3 text-xs text-slate-500">{s.topicsToFocus}</p>
                ) : null}
                <div className="mt-4 text-xs font-semibold text-orange-500 transition group-hover:text-slate-900">
                  Open session
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPreset;
