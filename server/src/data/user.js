export const demoUsers = [
  {
    id: 1,
    name: "Aarav Admin",
    email: "admin@auth.com",
    password: "password123",
    role: "Admin"
  },
  {
    id: 2,
    name: "Mira Moderator",
    email: "moderator@auth.com",
    password: "password123",
    role: "Moderator"
  },
  {
    id: 3,
    name: "Nikhil User",
    email: "user@auth.com",
    password: "password123",
    role: "User"
  }
];

export function findDemoUser(email, password) {
  return demoUsers.find(
    (user) => user.email === email && user.password === password
  );
}
