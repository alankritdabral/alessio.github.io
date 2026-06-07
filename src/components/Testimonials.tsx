'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import styles from './Testimonials.module.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

interface Review {
  name: string;
  photo: string;
  rating: number;
  text: string;
  link: string;
}

const reviews: Review[] = [
  {
    name: "Aryan la",
    photo: "https://lh3.googleusercontent.com/a-/ALV-UjU4b7CrjWPMYVzekXyxVcMRSNd1Bz5oNQIWwv46kEDGNo703UcQpQ=w36-h36-p-rp-mo-ba5-br100",
    rating: 5,
    text: "This place is amazing. However not much known by people. But it's worth trying. Helpful Staff. Amazing food. Good Music. The taste is great and worth the price that we pay for. It's not usually crowded but it would be crowded in coming time. Great Ambience. Sitting spaces are really awesome. You get great views from the window of the outside road. This place has also some good decorations and lighting. They have an outdoor seating also. At last, my experience was really good by coming here. Loved it!!",
    link: "https://share.google/SwpLNrurdEHbXJVA3"
  },
  {
    name: "Badal Sharma",
    photo: "https://lh3.googleusercontent.com/a-/ALV-UjV8ZYLV8irWBMyjYh1Ncb0VlG3TEGDol1XOay3y-nbhutZYgKRp=w36-h36-p-rp-mo-ba4-br100",
    rating: 5,
    text: "You can actually feel a good vibe the moment you enter the cafe. The interiors are just amazing. A perfect road side destination on the way to Maldevta, Dehradun Uttarakhand. Food is jaw dropping. Speciality includes chicken cheeze burger and strawberry shake.",
    link: "https://share.google/Mkwdgn7yCiAe725aZ"
  },
  {
    name: "Arunesh Singh",
    photo: "https://lh3.googleusercontent.com/a-/ALV-UjWLojXTGmHhp9MspuDhdD-fA8C9B7skkKay5Jx1LJ39yOVRHBuWdg=w36-h36-p-rp-mo-ba4-br100",
    rating: 5,
    text: "worth 5 stars..menu is perfect with delicious meals and pizzas are just worth if u are having a doubt you can definitely go for a Margareta...perfect place for couples as well. Both indoor and outdoor sitting are quite good.",
    link: "https://share.google/Ms1s2NobMz15uuDPm"
  },
  {
    name: "Akshay Shah",
    photo: "https://lh3.googleusercontent.com/a-/ALV-UjVAVAyrdCymzJdkGU4pFB1oUY-G27z0Pdj3KnOTSLdf2iEgzGT3=w36-h36-p-rp-mo-ba6-br100",
    rating: 5,
    text: "One fine place to visit with friends. This place is very economical, with very good taste. They have a beautiful garden as well. One must visit this cafe.",
    link: "https://share.google/LgzQBelVo7xGlHRSH"
  },
  {
    name: "Priya Bangwal",
    photo: "https://lh3.googleusercontent.com/a-/ALV-UjXk8y-M09NBcXF3FkKIWxhcQgXJuG9d7svvDW3zCRLD4PscL6sZ=w36-h36-p-rp-mo-ba3-br100",
    rating: 5,
    text: "Meets with the expectations 🥰🥰🥰\nEverything is delicious and it's not even expensive, the taste is worth for the price.\nHighly recommend 👍\nLoved the place ❤️",
    link: "https://share.google/XEtRVyQC5SoDNSRB9"
  },
  {
    name: "Megha Mittal",
    photo: "https://lh3.googleusercontent.com/a-/ALV-UjUWuh5tRFRst5OYQ7tdJDSEWq4Agkh7-8QqMvRQUJBEgiWvO1Nd=w36-h36-p-rp-mo-ba12-br100",
    rating: 5,
    text: "One of my favorite cafe. Their double cheese burger is amazing. And their own baked bread is a must thing to try for burgers. Totally recommended. Totally worthy combo offer.",
    link: "https://share.google/pg7Pjh8mVNoaEtHmA"
  },
  {
    name: "Subhasis Chatterjee",
    photo: "https://lh3.googleusercontent.com/a-/ALV-UjUZ2GpIJsXOByjc1HANqhBcI47-I0UfmDkQtpmTWFCmB03e4oK1mA=w36-h36-p-rp-mo-ba12-br100",
    rating: 5,
    text: "Good place on the airport road with great food and courteous staff.\nThe pizza , pasta and breads were cooked to perfection. The taste was amazing and we all liked it very much.\nNice place altogether and is highly recommend.",
    link: "https://share.google/H4xAxEnHSIfZeJP7N"
  },
  {
    name: "Shivam Godiyal",
    photo: "https://lh3.googleusercontent.com/a-/ALV-UjUq-xH--wcAyJ_Wcntv3PVS3RaWFpgDAg-9nmotyz_-c2Ds4qNf=w36-h36-p-rp-mo-ba12-br100",
    rating: 5,
    text: "Had calzone both veg and chicken and i can bet nobody is in Dehradun knows what is calzone but I had it when i was in abroad this is the best calzone you can get in whole Dehradun. Keep it up mate one of the best pizza’s in regard of quality. And if you open in other places of dun as well I guarantee that your pizza can beat most of the pizzerias.",
    link: "https://share.google/npMsshE0dRVH7ktKU"
  },
  {
    name: "Vikas Joshi",
    photo: "https://lh3.googleusercontent.com/a-/ALV-UjUqgXJB7W2dFPMxOcwA0OabKXrpFUDne7iff_HXjIusAmscDDtl=w36-h36-p-rp-mo-ba12-br100",
    rating: 5,
    text: "Nice place to have a cup of ginger tea. Pizza is also freshly baked and having a unique taste. They are having open space for kids at back. The real masti lies at their backyard. By the eve you can enjoy very tasty momos. For small gathering this place is one of the good choice.",
    link: "https://share.google/twQtF6lPieCjo2iYh"
  },
  {
    name: "Sachin Gusain",
    photo: "https://lh3.googleusercontent.com/a/ACg8ocIOTFCEwi72tuLcTEurs-Z2gf_JETRyugxMbZXtvcsrvQ5nRHrT=w36-h36-p-rp-mo-ba12-br100",
    rating: 5,
    text: "Awesome view and tasty food I recommend it to everyone. I love it.",
    link: "https://share.google/8cVp3YaF3G900Kl5h"
  },
  {
    name: "Tasmiya Ansari",
    photo: "https://lh3.googleusercontent.com/a-/ALV-UjVuJpBRt3HSG5X2Ibm-xNbKn6uMaD_T2Wa3vWq2EQNgGhjxGembbw=w36-h36-p-rp-mo-ba12-br100",
    rating: 5,
    text: "It's a good decent place to chill with friends.\nThere food is amazing both quality and quantity wise and also worth the prices.",
    link: "https://share.google/s225fCftFGVWkVoye"
  }
];

const Testimonials = () => {
  return (
    <section className="section" id="testimonials">
      <div className="container">
        <div className="text-center mb-4">
          <span className="section-subtitle">Testimonials</span>
          <h2 className="section-title">What Our Guests Say</h2>
        </div>

        <div className={styles.sliderWrapper}>
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              bulletActiveClass: styles.paginationBulletActive,
              bulletClass: styles.paginationBullet,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className={styles.reviewsSwiper}
          >
            {reviews.map((review, index) => (
              <SwiperSlide key={index} className={styles.swiperSlide}>
                <div className={styles.reviewCard}>
                  <div className={styles.authorContainer}>
                    <img className={styles.authorPhoto} src={review.photo} alt={review.name} />
                    <div className={styles.authorInfo}>
                      <div className={styles.authorNameRow}>
                        {review.name}
                        <svg className={styles.verifiedTick} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-2 15l-5-5 1.4-1.4 3.6 3.6 7.6-7.6L19 8l-9 9z"/>
                        </svg>
                      </div>
                      <div className={styles.rating}>
                        {'★'.repeat(review.rating)}
                      </div>
                    </div>
                  </div>
                  <div className={styles.reviewText}>&quot;{review.text}&quot;</div>
                  <a href={review.link} className={styles.googleLink} target="_blank" rel="noopener noreferrer">
                    <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg> View on Google Maps
                  </a>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
