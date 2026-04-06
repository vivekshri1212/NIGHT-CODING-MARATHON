import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_PATHS } from "../utils/apiPaths";
import axiosInstance from "../utils/axiosInstance";

const Dashboard = () => {
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
              Build a sharper prep routine after every login.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
              Create focused sessions, practice topic by topic, and jump back
              into your interview workflow without losing momentum.
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
                Focus
              </p>
              <p className="mt-3 text-sm font-semibold leading-6 text-slate-700">
                Role-based practice with clean topic tracking
              </p>
            </div>
          </div>
        </div>

        <div className="mb-8 rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Create New Session
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Add the role, experience, and topics you want to practice next.
              </p>
            </div>
            <div className="rounded-full bg-orange-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-orange-500">
              Fast Setup
            </div>
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

      {/* Sessions */}
      {sessions.length === 0 ? (
        <div className="text-center text-gray-500 mt-20">
          <p className="text-lg">No sessions yet 😕</p>
          <p className="text-sm">Create your first session to get started</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {sessions.map((s) => (
            <div
              key={s._id}
              onClick={() => navigate(`/interview/${s._id}`)}
              className="bg-white p-5 rounded-2xl shadow-sm border hover:shadow-md hover:scale-[1.02] transition cursor-pointer"
            >
              <h2 className="font-semibold text-lg mb-2">{s.role}</h2>
              <p className="text-gray-500 text-sm">{s.experience} experience</p>
              {s.topicsToFocus ? (
                <p className="mt-3 text-xs text-gray-500">{s.topicsToFocus}</p>
              ) : null}
              <div className="mt-4 text-xs text-gray-400">Click to start →</div>
            </div>
          ))}
        </div>
      )}
      </div>
    </div>
  );
};

export default Dashboard;
