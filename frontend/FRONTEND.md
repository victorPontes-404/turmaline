# Turmaline — Frontend (React + Tailwind CSS)

Frontend refatorado de HTML/CSS puro para **React 18** com **Tailwind CSS 3** e **Vite 5**.

---

## 🚀 Início Rápido

### Pré-requisitos
- Node.js 16+
- npm ou yarn

### Instalação e Desenvolvimento

```bash
cd frontend

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
# → http://localhost:3000

# Build para produção
npm run build
```

---

## 📁 Estrutura do Projeto

```
frontend/
├── public/
│   ├── assets/
│   │   ├── logo.png            # Logo principal
│   │   └── logo.webp           # Logo (formato WebP, usado no Login)
│   └── fonts/
│       ├── Ubuntu-Regular.ttf
│       ├── Ubuntu-Bold.ttf
│       └── Ubuntu-Italic.ttf
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Barra de navegação (logo + links)
│   │   └── Footer.jsx          # Rodapé (logo, email, GitHub, copyright)
│   ├── pages/
│   │   ├── Landing.jsx         # Página inicial (About + Features)
│   │   └── Login.jsx           # Página de login (formulário com estado)
│   ├── App.jsx                 # Componente raiz com React Router
│   ├── main.jsx                # Entry point do React
│   └── index.css               # Estilos globais + Tailwind + @font-face
├── index.html                  # Entry point do Vite
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

---

## 🎨 Design System

### Paleta de Cores

| Token              | Valor     | Uso                          |
|---------------------|-----------|------------------------------|
| `--background`      | `#050505` | Fundo principal (preto)      |
| `--primary-color`   | `#00e5ff` | Cyan — cor primária          |
| `--secondary-color` | `#0094ff` | Azul — hover e destaques     |
| `--border-color`    | `#303030` | Cinza escuro — cards e bordas|
| `--text`            | `#ffffff` | Texto branco                 |
| `--input-dark`      | `#1a1a1a` | Fundo de inputs              |

### No Tailwind

```jsx
// Cores diretas (arbitrárias)
className="bg-[#050505] text-[#00e5ff] border-[#303030]"

// Cores customizadas do tailwind.config.js
className="bg-background text-primary-cyan border-border-dark"
```

### Tipografia
- **Fonte:** Ubuntu (Regular 400, Bold 700, Italic)
- Carregada via `@font-face` em `index.css` (fontes locais em `public/fonts/`)

### Acessibilidade
- Contraste AA conforme WCAG
- `:focus-visible` com outline cyan para navegação por teclado
- `aria-label` e `aria-hidden` nos elementos interativos

---

## 🧩 Componentes e Páginas

### Rotas (App.jsx)

| Rota      | Componentes renderizados       |
|-----------|--------------------------------|
| `/`       | `Navbar` + `Landing` + `Footer`|
| `/login`  | `Login` (standalone)           |

### Componentes Reutilizáveis

- **Navbar** — Logo + link "Login" via React Router `<Link>`
- **Footer** — Logo, tagline, links (email, GitHub com SVG inline), copyright

### Páginas

- **Landing** — Seção About (dois painéis) + Grid de 6 Features (array + `.map()`)
- **Login** — Formulário com `useState` para email/password, `useNavigate` preparado para autenticação

---

## 🔧 Stack Técnica

| Tecnologia       | Versão  | Função                        |
|-------------------|---------|-------------------------------|
| React             | ^18.2   | Biblioteca de UI              |
| React DOM         | ^18.2   | Renderização DOM              |
| React Router DOM  | ^6.20   | Navegação cliente-side (SPA)  |
| Vite              | ^5.0    | Bundler e dev server          |
| Tailwind CSS      | ^3.3    | Framework de utilidades CSS   |
| PostCSS           | ^8.4    | Processador CSS               |
| Autoprefixer      | ^10.4   | Prefixos de vendor automáticos|

---

## 🎯 Próximos Passos

### 1. Autenticação
```jsx
// src/pages/Login.jsx
const handleLogin = async (e) => {
  e.preventDefault();
  // Chamar API de autenticação do backend
  // Salvar token JWT
  // Redirecionar para dashboard
  navigate('/dashboard');
};
```

### 2. Novas Páginas
```jsx
// src/App.jsx — adicionar rotas
<Route path="/dashboard" element={<Dashboard />} />
<Route path="/settings" element={<Settings />} />
```

### 3. Gerenciamento de Estado (Context API ou Zustand)
```jsx
// src/context/AuthContext.jsx
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
```

### 4. Responsividade
```jsx
// Breakpoints do Tailwind
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
```

### 5. Deploy
```bash
# Vercel (recomendado)
npm install -g vercel && vercel

# GitHub Pages
npm install --save-dev gh-pages
npm run build && npx gh-pages -d dist
```

---

## 📖 Recursos

- [React](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Router](https://reactrouter.com)
- [Vite](https://vitejs.dev)

---

© 2026 Turmaline. Integrantes: Andrei, Bruno Henrique, Diogo Paes, João Victor Pontes.
