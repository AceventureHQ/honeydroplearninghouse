'use client';

import { useState } from 'react';
import Image, { ImageProps } from 'next/image';

interface ProductImageProps extends Omit<ImageProps, 'src'> {
  src: string;
  fallbackSrc?: string;
}

export default function ProductImage({
  src,
  fallbackSrc = '/images/default-course-image.jpg',
  alt,
  ...props
}: ProductImageProps) {
  const [imgSrc, setImgSrc] = useState<string>(src);

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      loading="lazy"
      onError={() => {
        // Automatically switch to the default image if the file is missing
        setImgSrc(fallbackSrc);
      }}
    />
  );
}