import { QRCodeSVG } from "qrcode.react";

export default function QROverlay({ username, onClose }) {
  const url = `${window.location.origin}/@${username}`;

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-8 flex flex-col items-center gap-4 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-gray-500 text-sm">@{username}</p>
        <QRCodeSVG value={url} size={220} />
        <button
          onClick={onClose}
          className="mt-2 text-gray-400 hover:text-gray-600 text-sm transition-colors cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  );
}
