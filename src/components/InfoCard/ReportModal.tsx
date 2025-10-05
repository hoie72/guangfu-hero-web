"use client";

import React, { useState } from "react";
import { submitReport } from "@/lib/api";

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  locationType: string;
  locationName: string;
  locationId: string;
}

type ModalStep = "form" | "success";

const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  locationType,
  locationName,
  locationId,
}) => {
  const [step, setStep] = useState<ModalStep>("form");
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!reason.trim()) {
      setError("請填寫問題原因");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await submitReport({
        name: locationName,
        location_type: locationType,
        location_id: locationId,
        reason: reason.trim(),
        notes: "",
        status: "false",
      });

      setStep("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "提交失敗,請稍後再試");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setStep("form");
    setReason("");
    setError(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* 背景遮罩 */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-[70] backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal 內容 */}
      <div className="fixed inset-0 z-[80] flex items-end pointer-events-none">
        <div
          className="bg-white dark:bg-gray-800 rounded-t-2xl w-full max-h-[85vh] overflow-y-auto animate-slide-up shadow-lg pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {step === "form" ? (
            <>
              {/* Header */}
              <div className="flex justify-between items-center p-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                <button
                  onClick={handleClose}
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <h2 className="text-xl font-bold text-[#1E1E1E] dark:text-white">
                  回報問題
                </h2>
                <button
                  onClick={handleClose}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-xl"
                >
                  ✕
                </button>
              </div>

              <div className="px-6 py-4 space-y-4">
                {/* 問題點類型 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    問題點類型
                  </label>
                  <input
                    type="text"
                    value={locationType}
                    disabled
                    className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-lg cursor-not-allowed"
                  />
                </div>

                {/* 問題點名稱 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    問題點名稱
                  </label>
                  <input
                    type="text"
                    value={locationName}
                    disabled
                    className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-lg cursor-not-allowed"
                  />
                </div>

                {/* 問題原因 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    問題原因 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={reason}
                    onChange={(e) => {
                      setReason(e.target.value);
                      setError(null);
                    }}
                    placeholder="請描述您發現的問題..."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-[#009688] dark:focus:ring-teal-500 focus:border-transparent resize-none"
                  />
                  {error && (
                    <p className="mt-2 text-sm text-red-500">{error}</p>
                  )}
                </div>
              </div>

              {/* Footer Buttons */}
              <div className="px-6 pb-6 pt-2 flex gap-3">
                <button
                  onClick={handleClose}
                  disabled={isSubmitting}
                  className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  取消
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex-1 bg-[#C96319] dark:bg-orange-700 text-white py-3 rounded-lg font-medium hover:bg-[#B55815] dark:hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "提交中..." : "提交回報"}
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Success Screen */}
              <div className="p-6">
                <div className="flex justify-end mb-4">
                  <button
                    onClick={handleClose}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-xl"
                  >
                    ✕
                  </button>
                </div>

                <div className="text-center py-8">
                  {/* 成功圖示 */}
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-green-600 dark:text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>

                  <h2 className="text-2xl font-bold text-[#1E1E1E] dark:text-white mb-2">
                    提交完成
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-8">
                    您的回報已成功送出
                    <br />
                    感謝您的協助!
                  </p>

                  <button
                    onClick={handleClose}
                    className="bg-[#C96319] dark:bg-orange-700 text-white py-3 px-8 rounded-lg font-medium hover:bg-[#B55815] dark:hover:bg-orange-600 transition-colors"
                  >
                    確定
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ReportModal;