import React, { useState } from 'react';
import { X, Copy, Check, Download, FileCode, Folder, ShieldAlert, Sparkles, ExternalLink } from 'lucide-react';
import { SOURCE_FILES, SourceFile } from '../data/sourceCodeData';

interface CodeViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: 'vi' | 'en';
}

export const CodeViewerModal: React.FC<CodeViewerModalProps> = ({
  isOpen,
  onClose,
  currentLang,
}) => {
  const [selectedFilePath, setSelectedFilePath] = useState<string>('src/App.tsx');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentFile = SOURCE_FILES.find((f) => f.path === selectedFilePath) || SOURCE_FILES[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadSingleFile = (file: SourceFile) => {
    const blob = new Blob([file.content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Group files by category
  const categories = [
    {
      title: 'Cấu hình dự án',
      files: SOURCE_FILES.filter((f) => !f.path.startsWith('src/')),
    },
    {
      title: 'Dữ liệu Tour & Nội dung',
      files: SOURCE_FILES.filter((f) => f.path.includes('data/')),
    },
    {
      title: 'Mã nguồn chính',
      files: SOURCE_FILES.filter((f) => f.path === 'src/App.tsx' || f.path === 'src/main.tsx' || f.path === 'src/index.css'),
    },
    {
      title: 'Giao diện & Thành phần',
      files: SOURCE_FILES.filter((f) => f.path.includes('components/')),
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-stone-950/80 backdrop-blur-md overflow-hidden animate-fade-in">
      <div
        className="relative w-full max-w-6xl h-[90vh] bg-stone-900 text-stone-100 rounded-2xl shadow-2xl flex flex-col border border-stone-800 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="px-6 py-4 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <FileCode className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-serif font-bold text-white flex items-center gap-2">
                <span>Kho Mã Nguồn Công Khai Trực Tiếp</span>
                <span className="text-[11px] font-mono font-normal text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-2 py-0.5 rounded">
                  Chống Kaspersky chặn file
                </span>
              </h3>
              <p className="text-xs text-stone-400">
                Toàn bộ code hiển thị minh bạch 100%. Bạn có thể sao chép trực tiếp hoặc tải từng file lẻ về máy.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Kaspersky Tip Banner */}
        <div className="bg-amber-950/40 border-b border-amber-900/60 px-6 py-2.5 flex items-center justify-between text-xs text-amber-200">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong>Mẹo cho máy cài Kaspersky:</strong> Bấm <strong>"Sao chép mã"</strong> rồi tự tạo file dán vào máy tính, hoặc bấm <strong>"Tải file này"</strong> (Kaspersky không bao giờ chặn tải văn bản trực tiếp qua trình duyệt).
            </span>
          </div>
        </div>

        {/* Main Workspace: Left file tree + Right code viewer */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Left Column: File Tree (w-72) */}
          <div className="w-full md:w-80 bg-stone-950/60 border-r border-stone-800 flex flex-col overflow-y-auto p-4 space-y-4">
            <div className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold px-2">
              Danh sách 19 files mã nguồn:
            </div>

            {categories.map((cat, idx) => (
              <div key={idx} className="space-y-1">
                <div className="text-[11px] font-medium text-amber-400/80 px-2 flex items-center gap-1.5 pt-1">
                  <Folder className="w-3 h-3 text-amber-400" />
                  <span>{cat.title}</span>
                </div>
                <div className="space-y-0.5">
                  {cat.files.map((file) => {
                    const isSelected = file.path === selectedFilePath;
                    return (
                      <button
                        key={file.path}
                        onClick={() => setSelectedFilePath(file.path)}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-mono transition-colors flex items-center justify-between group ${
                          isSelected
                            ? 'bg-amber-900/40 text-amber-200 border border-amber-700/50'
                            : 'text-stone-300 hover:bg-stone-800/80 hover:text-white'
                        }`}
                      >
                        <span className="truncate">{file.path}</span>
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 ml-1" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Code Viewer & Actions */}
          <div className="flex-1 flex flex-col bg-stone-900 overflow-hidden">
            {/* Viewer Toolbar */}
            <div className="px-5 py-3 bg-stone-950/80 border-b border-stone-800 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 min-w-0">
                <span className="font-mono text-xs font-semibold text-white bg-stone-800 px-2.5 py-1 rounded border border-stone-700 truncate">
                  {currentFile.path}
                </span>
                <span className="text-[11px] text-stone-400 font-mono hidden sm:inline">
                  {currentFile.content.split('\n').length} dòng
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 active:scale-[0.98] rounded-md transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-stone-900" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Đã chép vào bộ nhớ!' : 'Sao chép mã'}</span>
                </button>

                <button
                  onClick={() => handleDownloadSingleFile(currentFile)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-stone-800 hover:bg-stone-700 border border-stone-700 rounded-md transition-colors"
                  title="Tải riêng file này về máy (không qua file nén)"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Tải file này</span>
                </button>
              </div>
            </div>

            {/* Code Content Pre */}
            <div className="flex-1 p-5 overflow-auto bg-[#0d0d0d] font-mono text-xs leading-relaxed text-stone-200">
              <pre className="whitespace-pre">
                <code>{currentFile.content}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* Modal Bottom Footer */}
        <div className="px-6 py-3.5 bg-stone-950 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-400">
          <div className="flex items-center gap-2">
            <span>Toàn bộ 19 file cũng được công khai trực tiếp tại thư mục web:</span>
            <a
              href="/files/package.json"
              target="_blank"
              rel="noreferrer"
              className="text-amber-400 hover:underline inline-flex items-center gap-1"
            >
              /files/ <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-stone-800 hover:bg-stone-700 text-white rounded-md text-xs"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
