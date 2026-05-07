import React, { useState } from 'react';

export default function CreateProjectModal({ isOpen, onClose }) {
  const [projectName, setProjectName] = useState('');
  const [projectDesc, setProjectDesc] = useState('');

  if (!isOpen) return null;

  // ESTA É A FUNÇÃO QUE VOCÊ DEVE ATUALIZAR
  const handleCreateProject = async (e) => {
    e.preventDefault(); // Impede o recarregamento da página

    try {
      const token = localStorage.getItem('token'); // Pega o token para autorização

      const response = await fetch('http://localhost:8000/projects/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Identifica quem está criando o projeto
        },
        body: JSON.stringify({
          name: projectName,
          description: projectDesc
        }),
      });

      if (response.ok) {
        // Se deu certo:
        const newProject = await response.json();
        console.log("Projeto criado:", newProject);
        
        // Limpa os campos e fecha o modal
        setProjectName('');
        setProjectDesc('');
        onClose();
        
        // Opcional: recarrega a página ou atualiza a lista de projetos
        window.location.reload(); 
      } else {
        const errorData = await response.json();
        alert(`Erro: ${errorData.detail}`);
      }
    } catch (error) {
      console.error("Erro ao conectar com o servidor:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#121216] p-8 rounded-xl border border-gray-800 w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-6">Novo Projeto</h2>
        
        <form onSubmit={handleCreateProject}>
          <div className="mb-4">
            <label className="block text-gray-400 mb-2">Nome do Projeto</label>
            <input 
              type="text" 
              className="w-full bg-[#0e0e11] border border-gray-800 rounded-md p-2 text-white"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-400 mb-2">Descrição (Opcional)</label>
            <textarea 
              className="w-full bg-[#0e0e11] border border-gray-800 rounded-md p-2 text-white"
              value={projectDesc}
              onChange={(e) => setProjectDesc(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-4">
            <button 
              type="button" 
              onClick={onClose} 
              className="px-4 py-2 text-gray-400 hover:text-white"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="bg-white text-black px-6 py-2 rounded-md font-bold hover:bg-gray-200"
            >
              Criar Projeto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
