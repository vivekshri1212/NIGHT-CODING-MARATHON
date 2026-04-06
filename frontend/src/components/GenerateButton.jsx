import { BsLightningChargeFill } from "react-icons/bs";
import { ImSpinner8 } from "react-icons/im";

const GenerateButton = ({ onClick, generating, loading }) => (
  <button
    onClick={onClick}
    disabled={generating || loading}
    className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/15 transition hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
  >
    {generating ? (
      <>
        <ImSpinner8 className="animate-spin w-4 h-4" /> Generating…
      </>
    ) : (
      <>
        <BsLightningChargeFill className="h-4 w-4 text-orange-300" /> Generate
      </>
    )}
  </button>
);

export default GenerateButton;
