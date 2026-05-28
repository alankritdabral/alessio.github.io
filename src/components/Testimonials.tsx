import styles from './Testimonials.module.css';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'John Doe',
    role: 'Food Blogger',
    content: 'The best pizza I have ever had! The crust is perfect and the ingredients are so fresh.',
    avatar: '/images/unnamed (6).jpg'
  },
  {
    id: 2,
    name: 'Sarah Smith',
    role: 'Local Resident',
    content: 'Our favorite place for family dinners. The atmosphere is warm and the service is top-notch.',
    avatar: '/images/unnamed (7).jpg'
  },
  {
    id: 3,
    name: 'Michael Brown',
    role: 'Chef',
    content: 'Incredible attention to detail in every dish. A true culinary gem in the heart of the city.',
    avatar: '/images/unnamed (6).jpg'
  }
];

const Testimonials = () => {
  return (
    <section className="section bg-light" id="testimonials">
      <div className="container">
        <div className="text-center mb-4">
          <span className={styles.subtitle}>Reviews</span>
          <h2 className={styles.title}>What Our Customers Say</h2>
        </div>
        <div className={styles.grid}>
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className={styles.card}>
              <p className={styles.content}>"{t.content}"</p>
              <div className={styles.author}>
                <img src={t.avatar} alt={t.name} className={styles.avatar} />
                <div>
                  <h4>{t.name}</h4>
                  <span>{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
