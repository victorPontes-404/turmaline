import React, { useState } from 'react';
import { FiUserPlus, FiMoreHorizontal, FiShield, FiUser } from 'react-icons/fi';

const initialMembers = [
  { id: 1, name: 'Victor Pontes', role: 'Dono', email: 'victor@turmaline.dev' },
  { id: 2, name: 'Ana Silva', role: 'Gestor', email: 'ana@turmaline.dev' },
  { id: 3, name: 'Lucas Santos', role: 'Editor', email: 'lucas@turmaline.dev' },
  { id: 4, name: 'João Costa', role: 'Leitor', email: 'joao@turmaline.dev' },
];

export default function TeamSettings() {
  const [members, setMembers] = useState(initialMembers);

  const updateMemberRole = (memberId, newRole) => {
      setMembers(members.map(m => m.id === memberId ? { ...m, role: newRole } : m));
  };

  const addMember = (name, email, role) => {
      const newId = Date.now();
      setMembers([...members, { id: newId, name, role, email }]);
  };

  const handleAddMember = () => {
     const name = prompt("Digite o nome completo do novo membro:");
     if (name && name.trim().length > 0) {
        addMember(name.trim(), `${name.split(' ')[0].toLowerCase()}@turmaline.dev`, 'Leitor');
     }
  };

  const getRoleIcon = (role) => {
    switch(role) {
      case 'Dono': return <FiShield className="text-rose-400" />;
      case 'Gestor': return <FiShield className="text-indigo-400" />;
      case 'Editor': return <FiUser className="text-emerald-400" />;
      case 'Leitor': return <FiUser className="text-gray-400" />;
      default: return <FiUser className="text-gray-400" />;
    }
  };

  const getRoleBadgeColor = (role) => {
    switch(role) {
      case 'Dono': return 'bg-rose-500/10 text-rose-500 border-rose-500/20';
      case 'Gestor': return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
      case 'Editor': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Leitor': return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#121216] border border-gray-800 rounded-xl overflow-hidden shadow-sm max-w-4xl mx-auto w-full">
      <div className="px-6 py-5 border-b border-gray-800 bg-[#151519] flex justify-between items-start">
         <div>
             <h2 className="text-xl font-semibold text-white tracking-tight">Equipe do Projeto</h2>
             <p className="text-sm text-gray-500 mt-1 mb-2">Gerencie quem tem acesso e os níveis de permissão.</p>
         </div>
         <button onClick={handleAddMember} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
            <FiUserPlus size={16}/>
            Convidar Membro
         </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6">
        <div className="bg-[#18181c] border border-gray-800 rounded-lg overflow-hidden">
           <table className="w-full text-left text-sm text-gray-400">
             <thead className="bg-[#1e1e24] text-xs uppercase text-gray-500">
               <tr>
                 <th scope="col" className="px-6 py-3 font-medium tracking-wider">Usuário</th>
                 <th scope="col" className="px-6 py-3 font-medium tracking-wider">Permissão</th>
                 <th scope="col" className="px-6 py-3 font-medium tracking-wider text-right">Ações</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-gray-800/50">
               {members.map(member => (
                 <tr key={member.id} className="hover:bg-[#1a1a20] transition-colors group">
                   <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-[#27272a] text-white flex items-center justify-center font-medium border border-gray-700">
                           {member.name.charAt(0)}
                         </div>
                         <div>
                            <div className="font-medium text-gray-200 group-hover:text-white transition-colors">{member.name}</div>
                            <div className="text-xs text-gray-500">{member.email}</div>
                         </div>
                      </div>
                   </td>
                   <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <select 
                         className={`bg-transparent border ${getRoleBadgeColor(member.role)} rounded-full px-2 py-1 outline-none text-xs font-semibold appearance-none cursor-pointer hover:brightness-125 transition-all`}
                         value={member.role}
                         onChange={(e) => updateMemberRole(member.id, e.target.value)}
                      >
                         <option className="bg-gray-800 text-white" value="Dono">Dono</option>
                         <option className="bg-gray-800 text-white" value="Gestor">Gestor</option>
                         <option className="bg-gray-800 text-white" value="Editor">Editor</option>
                         <option className="bg-gray-800 text-white" value="Leitor">Leitor</option>
                      </select>
                   </td>
                   <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button className="text-gray-500 hover:text-gray-300 p-1">
                         <FiMoreHorizontal size={18} />
                      </button>
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
        </div>
      </div>
    </div>
  );
}
