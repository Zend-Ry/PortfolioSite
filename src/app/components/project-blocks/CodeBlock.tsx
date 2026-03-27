import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  showLineNumbers?: boolean;
}

export function CodeBlock({ 
  code, 
  language = 'javascript', 
  title,
  showLineNumbers = true 
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Custom dark theme matching portfolio colors
  const customStyle = {
    'code[class*="language-"]': {
      color: '#e5e7eb',
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: '13px',
      textAlign: 'left' as const,
      whiteSpace: 'pre' as const,
      wordSpacing: 'normal',
      wordBreak: 'normal',
      wordWrap: 'normal',
      lineHeight: '1.6',
      tabSize: 4,
      hyphens: 'none' as const,
    },
    'pre[class*="language-"]': {
      color: '#e5e7eb',
      backgroundColor: '#1a1b26',
      padding: '1rem',
      borderRadius: '0.5rem',
      margin: 0,
      overflow: 'auto',
      fontFamily: "'JetBrains Mono', monospace",
    },
    'comment': { color: '#565f89' },
    'prolog': { color: '#565f89' },
    'doctype': { color: '#565f89' },
    'cdata': { color: '#565f89' },
    'punctuation': { color: '#9ca3af' },
    'property': { color: '#7aa2f7' },
    'tag': { color: '#f7768e' },
    'boolean': { color: '#ff9e64' },
    'number': { color: '#ff9e64' },
    'constant': { color: '#ff9e64' },
    'symbol': { color: '#bb9af7' },
    'deleted': { color: '#f7768e' },
    'selector': { color: '#73daca' },
    'attr-name': { color: '#bb9af7' },
    'string': { color: '#9ece6a' },
    'char': { color: '#9ece6a' },
    'builtin': { color: '#7aa2f7' },
    'inserted': { color: '#9ece6a' },
    'variable': { color: '#e0af68' },
    'operator': { color: '#89ddff' },
    'entity': { color: '#7aa2f7', cursor: 'help' },
    'url': { color: '#73daca' },
    'atrule': { color: '#7aa2f7' },
    'attr-value': { color: '#9ece6a' },
    'keyword': { color: '#bb9af7' },
    'function': { color: '#7aa2f7' },
    'class-name': { color: '#e0af68' },
    'regex': { color: '#b4f9f8' },
    'important': { color: '#f7768e', fontWeight: 'bold' },
  };

  return (
    <div className="mb-12">
      {title && (
        <h3 className="text-xl mb-3" style={{ color: '#5fbe86', fontFamily: 'SUSE, sans-serif' }}>
          {title}
        </h3>
      )}
      <div 
        className="rounded-lg overflow-hidden"
        style={{ 
          backgroundColor: '#1a1b26',
          border: '1px solid #2a2b36'
        }}
      >
        {/* Header with language tag and copy button */}
        <div 
          className="flex items-center justify-between px-6 py-3"
          style={{ 
            backgroundColor: '#242630',
            borderBottom: '1px solid #2a2b36'
          }}
        >
          <span 
            className="text-xs uppercase tracking-wider"
            style={{ color: '#5fbe86' }}
          >
            {language}
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-3 py-1.5 rounded transition-all hover:opacity-80"
            style={{
              backgroundColor: copied ? '#5fbe86' : '#31333c',
              color: copied ? '#1a1b26' : '#e5e7eb',
            }}
          >
            {copied ? (
              <>
                <Check size={14} />
                <span className="text-xs">Copied!</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span className="text-xs">Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Code content */}
        <SyntaxHighlighter
          language={language}
          style={customStyle}
          showLineNumbers={showLineNumbers}
          wrapLines={true}
          customStyle={{
            margin: 0,
            backgroundColor: '#1a1b26',
          }}
          lineNumberStyle={{
            color: '#4a4b56',
            minWidth: '3em',
            paddingRight: '1em',
            userSelect: 'none',
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}