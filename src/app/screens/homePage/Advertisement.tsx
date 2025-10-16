import React, { useEffect, useRef } from "react";

export default function Advertisement() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Try to play the video programmatically
    if (videoRef.current) {
      videoRef.current.play().catch((error: Error) => {
        console.log("Autoplay prevented:", error);
      });
    }

    // Add intersection observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      { threshold: 0.1 }
    );

    const adFrame = document.querySelector(".ads-restaurant-frame");
    if (adFrame) observer.observe(adFrame);

    return () => {
      if (adFrame) observer.unobserve(adFrame);
    };
  }, []);

  return (
    <div className="ads-restaurant-frame">
      <div className="ads-content-wrapper">
        <video
          ref={videoRef}
          className="ads-video"
          autoPlay={true}
          loop
          muted
          playsInline
          data-video-media=""
        >
          <source type="video/mp4" src="video/library-ads.mp4" />
        </video>

        <div className="ads-overlay">
          <h2 className="ads-title">Discover Our Exclusive Collection</h2>
          <p className="ads-subtitle">
            Immerse yourself in knowledge and beauty
          </p>
          <a href="/products">
            <button className="ads-cta-button">Explore Now</button>
          </a>
        </div>

        <div className="ads-sparkles">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="sparkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
