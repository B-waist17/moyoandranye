import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import Flower from '../src/assets/flower.png';
import Venue from '../src/assets/venue.png';
import Stay from '../src/assets/accomodation.png';
import Dress from '../src/assets/dresscode.png';
<assetss />

const wedding = {
  couple: 'Moyo & Ranye',
  bride: 'Moyosore Agbebakun',
  groom: 'Ovakporanye Udi-Eghere',
  date: 'November 21, 2026',
  venue: 'One Event Center, Ibadan',
  dressCode: 'Traditional attire of your choice',
  colours: 'Mint green & burnt orange'
};

function useCountdown(target) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  const diff = Math.max(0, target.getTime() - now.getTime());
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}


function PhotoCard({ src, alt, className = '' }) {
  return <div className={`photo ${className}`} style={{ backgroundImage: `url(${src})` }} role="img" aria-label={alt} />;
}

function App() {
  const target = useMemo(() => new Date('2026-11-21T15:00:00+01:00'), []);
  const countdown = useCountdown(target);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', food: '', attendance: '', ceremony: '', message: '' });

  const update = (key, value) => setForm(prev => ({ ...prev, [key]: value }));
  const submit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main>
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-copy">
            <h1>{wedding.couple}</h1>
            <p className="hero-sub">are getting married, and they want you there.</p>
            <div className="hero-meta">
              <div><strong>November 21</strong><span>2026</span></div>
              <div><strong>Garden Point Event Center</strong><span>Ibadan</span></div>
            </div>
          </div>
          <img className='flower' src={Flower} alt="" />
        </div>
      </section>

      <section className="story section-shell">
        <div className="section-title-block">
          <h2>Our Journey</h2>
          <span>Together</span>
          <p>From two families, two cultures, and two stories, we found our way to one home. <br />
            Our journey began in the place of service, in the house of God, and grew into something far beyond where it started. What began as a shared commitment to serve God has grown into a love rooted in choosing, supporting, and serving one another. <br />
            Now, we stand at the beginning of a new chapter, grateful for the journey so far and excited for all that lies ahead. <br />
            We would love to celebrate this special moment with the people who have been part of our story and whose presence has helped make it what it is today.</p>
        </div>
        <div className="story-grid">
          <PhotoCard src="/images/story-1.svg" alt="A warm placeholder for a couple photograph" />
          <PhotoCard src="/images/story-2.svg" alt="A warm placeholder for a couple photograph" />
          <PhotoCard src="/images/story-3.svg" alt="A warm placeholder for a family photograph" />
        </div>
      </section>

      <section className="details">
        <div className="section-shell">
          <h2 className="script-heading">The Wedding</h2>
          <div className="details-grid">
            <article><PhotoCard src={Venue} alt="Venue placeholder" /><h3>The Venue</h3><p>We are celebrating at <strong>Garden Point Event Center</strong> behind Christ High School, Oleyo-Ayegun road, off Akala expressway, tipper garage in Ibadan.</p></article>
            <article><PhotoCard src={Stay} alt="Accommodation placeholder" /><h3>Accommodation</h3><p>We can secure reservations with some choice hotels and apartments close to the venue. RSVP so we can send you the details.</p></article>
            <article><PhotoCard src={Dress} alt="Traditional dress placeholder" /><h3>Dress Code</h3><p>Please come looking beautiful in your traditional attire of choice. Our colour guide: <strong>{wedding.colours}</strong>.</p></article>
          </div>
          <div className="countdown-wrap">
            <p>Event Starts In</p>
            <div className="countdown">
              {Object.entries(countdown).map(([label, value]) => <div className="time" key={label}><strong>{String(value).padStart(2, '0')}</strong><span>{label}</span></div>)}
            </div>
          </div>
        </div>
      </section>

      <section className="giving section-shell">
        <div className="giving-copy">
          <h2>We Appreciate<br />Your Goodwill</h2>
          <span>Thank You</span>
          <p>We are so grateful for your generous gift. Your kindness is deeply appreciated, whether you join us in person or celebrate with us from afar.</p>
        </div>
        <div className="gift-list">
          <div className="gift"><span>Naira Account</span><strong>0051773062</strong><small>{wedding.bride} • Stanbic IBTC</small></div>
          <div className="gift"><span>Naira Account</span><strong>0097353420</strong><small>{wedding.groom} • Sterling Bank</small></div>
          <div className="gift"><span>Dollar Account</span><strong>1520660934</strong><small>{wedding.groom} • Access Bank</small></div>
          
        </div>
      </section>

      <section className="rsvp">
        <div className="section-shell narrow">
          <h2>Confirm your Attendance</h2>
          <span>RSVP</span>
          {submitted ? (
            <div className="success"><h3>Thank you, {form.name || 'friend'}.</h3><p>Your response has been recorded in this demo. Connect the form to Google Sheets, Formspree, Supabase, or your preferred backend when you are ready to go live.</p><button onClick={() => setSubmitted(false)}>Edit Response</button></div>
          ) : (
            <form onSubmit={submit}>
              <label>Full Name *<input required value={form.name} onChange={e => update('name', e.target.value)} placeholder="Your name" /></label>
              <label>Email <input type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="you@email.com" /></label>
              <label>Food Allergies or Dietary Restrictions<input value={form.food} onChange={e => update('food', e.target.value)} placeholder="Eg. gluten-free, vegetarian..." /></label>
              <fieldset><legend>Will you attend?</legend><label className="radio"><input required type="radio" name="attendance" value="yes" onChange={e => update('attendance', e.target.value)} /> Yes, I will be there</label><label className="radio"><input type="radio" name="attendance" value="no" onChange={e => update('attendance', e.target.value)} /> No, I cannot make it</label></fieldset>
              <fieldset><legend>Will you need accommodation?</legend><label className="radio"><input type="radio" name="ceremony" value="yes" onChange={e => update('ceremony', e.target.value)} /> Yes, I will be there</label><label className="radio"><input type="radio" name="ceremony" value="no" onChange={e => update('ceremony', e.target.value)} /> No, I cannot make it</label></fieldset>
              <label>Message for the couple <textarea value={form.message} onChange={e => update('message', e.target.value)} placeholder="Write us a few words..." /></label>
              <button type="submit">Confirm</button>
            </form>
          )}
        </div>
      </section>

      <footer><h2>Thank You for Loving Us</h2><p>{wedding.bride} &amp; {wedding.groom}</p></footer>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
