import React, { useState } from 'react';
import { FiFolder, FiFolderMinus, FiFileText, FiFile, FiChevronRight, FiChevronDown, FiPlus, FiUpload } from 'react-icons/fi';

const initialFileSystem = [
  {
    id: 'f1',
    name: 'Documentação',
    type: 'folder',
    children: [
      { id: 'f1-1', name: 'requisitos.md', type: 'file', extension: 'md' },
      { id: 'f1-2', name: 'anotacoes.txt', type: 'file', extension: 'txt' }
    ]
  },
  {
    id: 'f2',
    name: 'Design',
    type: 'folder',
    children: [
      { id: 'f2-1', name: 'logo.png', type: 'file', extension: 'png' }
    ]
  },
  { id: 'f3', name: 'readme.md', type: 'file', extension: 'md' },
];

export default function FileExplorer({ onFileSelect }) {
  const [fileSystem, setFileSystem] = useState(initialFileSystem);
  const [expandedFolders, setExpandedFolders] = useState({ f1: true });

  const createNode = (name, isFolder) => {
     const newId = `f-${Date.now()}`;
     const ext = isFolder ? null : name.split('.').pop() || 'txt';
     const newNode = isFolder 
         ? { id: newId, name, type: 'folder', children: [] } 
         : { id: newId, name, type: 'file', extension: ext };
         
     setFileSystem([...fileSystem, newNode]);
  };

  const handleAddFile = () => {
      const name = prompt("Nome do arquivo (com extensão):", "novo.md");
      if (name) createNode(name, false);
  };

  const handleAddFolder = () => {
      const name = prompt("Nome da pasta:");
      if (name) createNode(name, true);
  };

  const toggleFolder = (id) => {
    setExpandedFolders(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const getFileIcon = (ext) => {
    if (ext === 'md') return <FiFileText className="text-blue-400" size={16} />;
    if (ext === 'txt') return <FiFileText className="text-gray-400" size={16} />;
    if (ext === 'png') return <FiFile className="text-purple-400" size={16} />;
    return <FiFile className="text-gray-400" size={16} />;
  };

  const renderTree = (nodes, level = 0) => {
    return nodes.map(node => {
      const isFolder = node.type === 'folder';
      const isExpanded = expandedFolders[node.id];

      return (
        <div key={node.id} className="w-full">
          <div 
            onClick={() => isFolder ? toggleFolder(node.id) : onFileSelect(node)}
            className={`flex items-center gap-2 py-2 px-2 rounded-lg cursor-pointer hover:bg-[#1a1a20] text-sm text-gray-300 transition-all select-none group border border-transparent hover:border-gray-800`}
            style={{ paddingLeft: `${level * 20 + 8}px` }}
          >
            {isFolder ? (
              <span className="text-gray-500 mr-1 opacity-70 group-hover:opacity-100 transition-opacity">
                {isExpanded ? <FiChevronDown size={14} /> : <FiChevronRight size={14} />}
              </span>
            ) : (
               <span className="w-4 mr-1 inline-block" />
            )}
            
            {isFolder ? (
              <span className="text-indigo-400">
                {isExpanded ? <FiFolderMinus size={18} /> : <FiFolder size={18} />}
              </span>
            ) : (
              getFileIcon(node.extension)
            )}

            <span className="truncate group-hover:text-white transition-colors">{node.name}</span>
          </div>

          {isFolder && isExpanded && node.children && (
            <div className="border-l border-gray-800/50 ml-4 pl-1 my-1">
                {renderTree(node.children, level + 1)}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="flex flex-col h-full bg-[#121216] border border-gray-800 rounded-xl overflow-hidden shadow-sm">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-800 bg-[#151519]">
         <div>
             <h2 className="text-lg font-semibold text-white tracking-tight">Arquivos</h2>
             <p className="text-xs text-gray-500 mt-1">Gerencie a base de conhecimento.</p>
         </div>
         <div className="flex gap-2">
            <button className="flex items-center justify-center p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-md transition-colors" title="Fazer Upload">
               <FiUpload size={16}/>
            </button>
            <button onClick={handleAddFolder} className="flex items-center justify-center p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-md transition-colors" title="Nova Pasta">
               <FiFolder size={16}/>
            </button>
            <button onClick={handleAddFile} className="flex items-center justify-center p-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md transition-colors shadow-sm" title="Novo Arquivo">
               <FiPlus size={16}/>
            </button>
         </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        {renderTree(fileSystem)}
      </div>
    </div>
  );
}
