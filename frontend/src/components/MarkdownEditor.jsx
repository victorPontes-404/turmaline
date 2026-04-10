import React, { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from 'rehype-sanitize';
import { FiSave, FiClock, FiShare2 } from 'react-icons/fi';

export default function MarkdownEditor() {
  // State nativo do react armazenando o texto cru que estara em tela no momento
  const [value, setValue] = useState("**Bem vindo ao seu novo documento!**\n\nComece a digitar aqui para usar o poder do Markdown.");

  return (
    // Wrapper externo cobrindo a tela
    <div className="flex flex-col h-full w-full bg-[#0d0d0f] rounded-xl overflow-hidden border border-gray-800 shadow-2xl" data-color-mode="dark">
      
      {/* Barra de título do topo (Header) contendo nome de arquivo e botões de ação */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#111114] border-b border-gray-800">
        
        <div className="flex items-center gap-3">
          {/* Campo simulando titulo de doc estilo VScode */}
          <input 
            type="text" 
            defaultValue="Untitled_Document.md"
            className="bg-transparent border-none text-gray-200 font-mono text-sm focus:outline-none focus:ring-0 w-48 hover:bg-[#1a1a20] px-1 rounded transition-colors"
          />
          {/* Badge informativo de Timestamp simulado */}
          <div className="flex items-center gap-1 text-xs text-gray-500 bg-[#1a1a20] px-2 py-1 rounded">
            <FiClock /> <span>Salvo agora</span>
          </div>
        </div>
        
        {/* Agrupamento da Direita: Share e Botão Salvar (Futramente acionara Axios p/ FastAPI) */}
        <div className="flex gap-2">
           <button className="p-1.5 text-gray-500 hover:text-white hover:bg-gray-800 rounded transition-colors">
              <FiShare2 size={16} />
           </button>
           <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded text-sm font-medium transition-colors shadow-sm shadow-indigo-900/50">
              <FiSave size={16} /> Salvar
           </button>
        </div>
      </div>
      
      {/* Área onde efetivamente o MDEditor da uiw toma conta */}
      <div className="flex-1 overflow-hidden" style={{ height: 'calc(100% - 50px)' }}>
        <MDEditor
          value={value}                     // Alimenta o component
          onChange={setValue}               // Triggado na tecla, atualiza o val
          previewOptions={{ rehypePlugins: [[rehypeSanitize]] }} // Impede injeções XSS maliciosas
          height="100%"
          className="border-none"
          style={{ backgroundColor: 'transparent', boxShadow: 'none' }} // Sobrescreve estilos padroes deles para fundir com nosso theme
        />
      </div>
    </div>
  );
}
