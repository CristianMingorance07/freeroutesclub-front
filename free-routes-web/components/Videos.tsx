"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci";

interface VideoProps {
  src: string;
}

const Videos: React.FC = () => {
  const [videos, setVideos] = useState<VideoProps[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(true);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const videoRefs = useRef<HTMLVideoElement[]>([]);

  const handleScroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const videoWidth = carouselRef.current.clientWidth;
      const scrollAmount =
        direction === "left" ? -videoWidth - 16 : videoWidth + 16;

      carouselRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });

      if (
        direction === "right" &&
        carouselRef.current.scrollLeft + carouselRef.current.clientWidth >=
          carouselRef.current.scrollWidth - 1
      ) {
        carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else if (direction === "left" && carouselRef.current.scrollLeft <= 0) {
        carouselRef.current.scrollTo({
          left:
            carouselRef.current.scrollWidth - carouselRef.current.clientWidth,
          behavior: "smooth",
        });
      }
    }
  };

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const videoFiles = [
          { src: "/videos/01.MP4" },
          { src: "/videos/02.MP4" },
          { src: "/videos/03.mp4" },
          { src: "/videos/04.mp4" },
        ];
        const shuffleArray = (array: VideoProps[]) => {
          for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
          }
          return array;
        };

        const shuffledVideos = shuffleArray(videoFiles);
        setVideos(shuffledVideos);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            video.play();
          } else {
            video.pause();
          }
        });
      },
      {
        threshold: 0.6,
      },
    );

    videoRefs.current.forEach((video) => {
      if (video) {
        observer.observe(video);
      }
    });

    return () => {
      videoRefs.current.forEach((video) => {
        if (video) {
          observer.unobserve(video);
        }
      });
    };
  }, [videos]);

  return (
    <div className="relative">
      <div className="flex items-center justify-center">
        <button
          className={`mr-4 ${!canScrollLeft && "cursor-default"}`}
          onClick={() => handleScroll("left")}
          disabled={!canScrollLeft}
        >
          <CiCircleChevLeft
            className={`size-10 rounded-full transition-colors ${
              canScrollLeft ? "text-white" : "text-gray-600"
            }`}
          />
        </button>

        <div
          id="carrousel"
          ref={carouselRef}
          className="no-scrollbar flex max-w-96 gap-4 overflow-x-scroll sm:max-w-screen-sm lg:max-w-screen-lg"
        >
          {loading ? (
            <div>Loading videos...</div>
          ) : (
            videos.map((video, index) => (
              <video
                key={index}
                ref={(el) => {
                  if (el) {
                    videoRefs.current[index] = el;
                  }
                }}
                src={video.src}
                muted
                loop
                className="aspect-[9/16] w-96 rounded-lg object-cover shadow-lg"
              />
            ))
          )}
        </div>
        <button
          className={`ml-4 ${!canScrollRight && "cursor-default"}`}
          onClick={() => handleScroll("right")}
          disabled={!canScrollRight}
        >
          <CiCircleChevRight
            className={`size-10 rounded-full transition-colors ${
              canScrollRight ? "text-white" : "text-gray-600"
            }`}
          />
        </button>
      </div>
    </div>
  );
};

export default Videos;
