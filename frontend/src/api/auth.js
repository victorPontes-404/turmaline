const BASE_URL = 'http://localhost:8000';

/**
 * Registra um novo usuário.
 * @param {{ name: string, email: string, password: string }} data
 * @returns {Promise<{ id, name, email, created_at }>}
 */
export async function registerUser(data) {
  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.detail || 'Erro ao registrar usuário.');
  }

  return json;
}

/**
 * Autentica um usuário e retorna o token JWT.
 * @param {{ email: string, password: string }} data
 * @returns {Promise<{ access_token: string, token_type: string }>}
 */
export async function loginUser(data) {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.detail || 'Credenciais inválidas.');
  }

  return json;
}

/**
 * Busca os dados do usuário atual.
 * @param {string} token
 * @returns {Promise<{ id: number, name: string, email: string, created_at: string }>}
 */
export async function getMe(token) {
  const response = await fetch(`${BASE_URL}/auth/me`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.detail || 'Erro ao carregar dados do usuário.');
  }

  return json;
}

