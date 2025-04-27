import React from 'react';
import { Folder, FileText, Github, Linkedin, Mail } from 'lucide-react';

interface WindowsUIProps {
  onOpenProject: (projectId: string) => void;
  onOpenContact: () => void;
}

export const WindowsUI: React.FC<WindowsUIProps> = ({ onOpenProject, onOpenContact }) => {
  return (
    <div className="w-full h-full bg-[#0078d7] p-4">
      <div className="grid grid-cols-4 gap-4">
        {/* Desktop Icons */}
        <div 
          className="flex flex-col items-center cursor-pointer hover:bg-white/10 p-2 rounded"
          onClick={() => onOpenProject('projects')}
        >
          <Folder className="w-12 h-12 text-white mb-1" />
          <span className="text-white text-sm text-center">Projects</span>
        </div>
        
        <div 
          className="flex flex-col items-center cursor-pointer hover:bg-white/10 p-2 rounded"
          onClick={() => onOpenProject('skills')}
        >
          <FileText className="w-12 h-12 text-white mb-1" />
          <span className="text-white text-sm text-center">Skills</span>
        </div>
        
        <div 
          className="flex flex-col items-center cursor-pointer hover:bg-white/10 p-2 rounded"
          onClick={onOpenContact}
        >
          <Mail className="w-12 h-12 text-white mb-1" />
          <span className="text-white text-sm text-center">Contact</span>
        </div>
        
        <a 
          href="https://github.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex flex-col items-center cursor-pointer hover:bg-white/10 p-2 rounded"
        >
          <Github className="w-12 h-12 text-white mb-1" />
          <span className="text-white text-sm text-center">GitHub</span>
        </a>
        
        <a 
          href="https://linkedin.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex flex-col items-center cursor-pointer hover:bg-white/10 p-2 rounded"
        >
          <Linkedin className="w-12 h-12 text-white mb-1" />
          <span className="text-white text-sm text-center">LinkedIn</span>
        </a>
      </div>
    </div>
  );
}; 