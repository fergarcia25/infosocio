export default function ServiceCard({ icon, title, description }) {
  return (
    <div className="card service-card h-100 border-0 shadow-sm">
      <div className="card-body text-center p-4">
        <div className="mb-3">
          <img src={icon} alt={title} style={{ width: 64, height: 64 }} />
        </div>
        <h5 className="card-title fw-bold">{title}</h5>
        <p className="card-text text-muted">{description}</p>
      </div>
    </div>
  )
}
