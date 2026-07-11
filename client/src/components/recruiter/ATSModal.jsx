import { X } from "lucide-react";
import ATSReportView from "../ats/ATSReportView";

function ATSModal({
  report,
  open,
  onClose,
  onReAnalyze,
  loading,
}) {
  if (!open || !report) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-6xl overflow-y-auto rounded-2xl bg-slate-50 shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white p-6">
          <h2 className="text-2xl font-bold">
            ATS Report
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-slate-100"
          >
            <X size={24} />
          </button>
        </div>

        {/* Shared ATS Report */}
        <div className="p-8">
          <ATSReportView report={report} />
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 flex justify-end gap-4 border-t bg-white p-6">
          <button
            onClick={onReAnalyze}
            disabled={loading}
            className="rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {loading
              ? "Re-Analyzing..."
              : "Re-Analyze"}
          </button>

          <button
            onClick={onClose}
            className="rounded-lg border border-slate-300 px-6 py-3 transition hover:bg-slate-100"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ATSModal;