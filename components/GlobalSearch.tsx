import React, { useState, useEffect, useRef } from 'react';
import { Search, Mic, X, Clock, MicOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CLIENT_LOCATIONS } from './GlobalReach';

export const GlobalSearch: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isListening, setIsListening] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (e) {
        // Handle parse error
      }
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) return;
    
    const newRecent = [searchTerm, ...recentSearches.filter(s => s !== searchTerm)].slice(0, 5);
    setRecentSearches(newRecent);
    localStorage.setItem('recentSearches', JSON.stringify(newRecent));
    
    setIsOpen(false);
    setQuery('');
    
    const matchedLocation = CLIENT_LOCATIONS.find(
      loc => 
        loc.city.toLowerCase().includes(searchTerm.toLowerCase()) || 
        loc.clientName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (matchedLocation) {
      navigate('/#global-reach');
      setTimeout(() => {
        const globeElement = document.getElementById('global-reach');
        if (globeElement) {
          globeElement.scrollIntoView({ behavior: 'smooth' });
          window.dispatchEvent(new CustomEvent('globe-zoom-to', { detail: matchedLocation }));
        }
      }, 300);
    } else {
      // Simple routing to a page where search could apply, like portfolio
      navigate(`/portfolio?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(query);
    }
  };

  const handleListen = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);
    
    recognition.onresult = (event: any) => {
      const speechResult = event.results[0][0].transcript;
      setQuery(speechResult);
      handleSearch(speechResult);
    };

    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognition.start();
  };

  return (
    <div className="relative flex items-center h-full" ref={dropdownRef}>
      {!isOpen ? (
        <button
          onClick={() => {
            setIsOpen(true);
            setTimeout(() => inputRef.current?.focus(), 100);
          }}
          className="p-2 rounded-full text-slate-700 dark:text-slate-200 hover:text-[#38BDF8] dark:hover:text-[#38BDF8] hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all focus-visible:ring-2 focus-visible:ring-[#38BDF8]"
          aria-label="Open search"
        >
          <Search size={18} />
        </button>
      ) : (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[280px] sm:w-[320px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full shadow-lg flex items-center px-3 py-1.5 animate-in fade-in slide-in-from-right-4 duration-200 z-50">
          <Search size={16} className="text-slate-400" />
          
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search projects, services..."
            className="flex-1 bg-transparent border-none focus:ring-0 text-sm px-3 text-slate-900 dark:text-white placeholder:text-slate-400 outline-none"
          />

          <button
            onClick={handleListen}
            className={`p-1.5 rounded-full transition-colors ${
              isListening ? 'bg-red-100 text-red-500 animate-pulse' : 'text-slate-400 hover:text-[#38BDF8] hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
            title="Search by voice"
          >
            {isListening ? <MicOff size={14} /> : <Mic size={14} />}
          </button>
          
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 ml-1 transition-colors"
          >
            <X size={14} />
          </button>
          
          {/* Dropdown for recent searches */}
          {recentSearches.length > 0 && (
            <div className="absolute top-full right-0 mt-3 w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl overflow-hidden py-2 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
              <div className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800">
                Recent Searches
              </div>
              <ul className="max-h-48 overflow-y-auto">
                {recentSearches.map((term, index) => (
                  <li key={index}>
                    <button
                      onClick={() => {
                        setQuery(term);
                        handleSearch(term);
                      }}
                      className="w-full text-left px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/60 flex items-center gap-3 transition-colors"
                    >
                      <Clock size={14} className="text-slate-400" />
                      <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                        {term}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
