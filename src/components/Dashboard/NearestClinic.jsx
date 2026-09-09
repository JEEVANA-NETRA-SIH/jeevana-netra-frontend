import { MapPin, Phone, Clock, Star, Navigation } from 'lucide-react'

const clinics = [
  {
    id: 1,
    name: 'Apollo Eye Care Centre',
    address: '45 MG Road, Bangalore, Karnataka 560001',
    distance: '1.2 km',
    rating: 4.8,
    phone: '+91 80 2558 1234',
    hours: '8:00 AM - 8:00 PM',
    specialties: ['Retinal Screening', 'Glaucoma', 'Cataract'],
  },
  {
    id: 2,
    name: 'Narayana Nethralaya',
    address: '121 ECC Road, Bangalore, Karnataka 560100',
    distance: '3.5 km',
    rating: 4.7,
    phone: '+91 80 2854 5678',
    hours: '9:00 AM - 7:00 PM',
    specialties: ['Retinal Screening', 'Pediatric Ophthalmology'],
  },
  {
    id: 3,
    name: 'Sankara Eye Hospital',
    address: '78 HSR Layout, Bangalore, Karnataka 560102',
    distance: '5.1 km',
    rating: 4.6,
    phone: '+91 80 2572 9012',
    hours: '7:30 AM - 6:00 PM',
    specialties: ['Retinal Screening', 'Cornea', 'LASIK'],
  },
  {
    id: 4,
    name: 'Vasan Eye Care',
    address: '90 Indiranagar, Bangalore, Karnataka 560038',
    distance: '6.8 km',
    rating: 4.5,
    phone: '+91 80 2528 3456',
    hours: '8:30 AM - 7:30 PM',
    specialties: ['Retinal Screening', 'Diabetic Retinopathy'],
  },
]

export default function NearestClinic() {
  return (
    <div className="d-page">
      <div className="d-pagehead">
        <h2 className="d-pagehead__title">Nearest Clinic</h2>
        <p className="d-pagehead__subtitle">
          Find the closest partner clinics for retinal screening referrals.
        </p>
      </div>

      <div className="d-clinic__search">
        <div className="d-clinic__search-inner">
          <MapPin size={18} className="d-clinic__search-icon" />
          <input
            type="text"
            className="d-clinic__search-input"
            placeholder="Search by location or clinic name..."
            defaultValue="Bangalore, Karnataka"
          />
          <button className="d-clinic__search-btn">
            <Navigation size={16} />
            <span>Find Near Me</span>
          </button>
        </div>
      </div>

      <div className="d-clinic__grid">
        {clinics.map((clinic) => (
          <div key={clinic.id} className="d-clinic">
            <div className="d-clinic__header">
              <div className="d-clinic__icon">
                <MapPin size={20} />
              </div>
              <div className="d-clinic__header-text">
                <h3 className="d-clinic__name">{clinic.name}</h3>
                <p className="d-clinic__distance">{clinic.distance} away</p>
              </div>
              <div className="d-clinic__rating">
                <Star size={14} className="d-clinic__rating-icon" />
                <span>{clinic.rating}</span>
              </div>
            </div>

            <p className="d-clinic__address">{clinic.address}</p>

            <div className="d-clinic__details">
              <div className="d-clinic__detail">
                <Phone size={14} />
                <span>{clinic.phone}</span>
              </div>
              <div className="d-clinic__detail">
                <Clock size={14} />
                <span>{clinic.hours}</span>
              </div>
            </div>

            <div className="d-clinic__tags">
              {clinic.specialties.map((s) => (
                <span key={s} className="d-clinic__tag">{s}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
