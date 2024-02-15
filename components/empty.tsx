import Image from "next/image";
import { useState, useEffect } from "react";

interface EmptyProps {
  label: string;
}
export const Empty = ({ label }: EmptyProps) => {
    const [showImage, setShowImage] = useState(false);
  
    useEffect(() => {
      const timeout = setTimeout(() => {
        setShowImage(true);
      }, 25);
  
      return () => clearTimeout(timeout);
    }, []);


  return (
    <div className="h-full p-20 flex flex-col items-center justify-center relative">
      <div className="shimmering-container relative h-72 w-72">
        {showImage && (
          <Image
            alt="Empty"
            src="/empty1.png"
            fill
            objectFit="contain"
          />
        )}
        <div className="shimmer" />
      </div>
      <p className="text-muted-foreground text-sm text-center">{label}</p>

      <style jsx>{`
        .shimmering-container {
          position: relative;
        }

        .shimmer {
          position: absolute;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.3) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          animation: shimmerAnimation 2s infinite linear;
          transform: translateX(-100%);
        }

        @keyframes shimmerAnimation {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
    };