async function getCsrfToken() {
  const response = await fetch("/api/auth/csrf");
  if (!response.ok) {
    throw new Error("We couldn't connect to the server. Please try again later.");
  }
  const { token } = await response.json();
  return token;
}

export async function registerUser(details) {
  const token = await getCsrfToken();
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-CSRF-TOKEN": token },
    body: JSON.stringify(details),
  });

  if (!response.ok) {
    if (response.status === 409) {
      throw new Error("That email or username is already registered.");
    }
    if (response.status === 400) {
      throw new Error("Please check your details and try again.");
    }
    throw new Error("We couldn't create your account. Please try again later.");
  }

  return response.json();
}

export async function loginUser({ email, password }) {
  const token = await getCsrfToken();
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "X-CSRF-TOKEN": token,
    },
    body: new URLSearchParams({ email, password }),
  });

  if (response.status === 401) {
    throw new Error("Incorrect email or password.");
  }
  if (!response.ok) {
    throw new Error("We couldn't sign you in. Please try again later.");
  }

  return response.json();
}

export async function getCurrentUser({ signal } = {}) {
  const response = await fetch("/api/auth/me", { signal });
  if (response.status === 401) return null;
  if (!response.ok) {
    throw new Error("We couldn't check your session. Please try again later.");
  }

  return response.json();
}

export async function logoutUser() {
  const token = await getCsrfToken();
  const response = await fetch("/api/auth/logout", {
    method: "POST",
    headers: { "X-CSRF-TOKEN": token },
  });
  if (!response.ok) {
    throw new Error("We couldn't sign you out. Please try again.");
  }
}
