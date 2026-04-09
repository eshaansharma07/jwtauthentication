import { useAuth } from "../context/AuthContext";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <section className="page-section">
      <p className="eyebrow">Profile</p>
      <h2>Authenticated session details</h2>
      <div className="detail-list">
        <article className="detail-item">
          <span>Name</span>
          <strong>{user?.name}</strong>
        </article>
        <article className="detail-item">
          <span>Email</span>
          <strong>{user?.email}</strong>
        </article>
        <article className="detail-item">
          <span>Role</span>
          <strong>{user?.role}</strong>
        </article>
      </div>
    </section>
  );
}
