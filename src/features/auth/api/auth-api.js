export async function registerUser(details) {
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
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
