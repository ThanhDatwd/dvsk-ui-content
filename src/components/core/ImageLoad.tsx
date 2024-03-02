import Image from "next/image";
import { FC, useState } from "react";

type IProps = {
  url: string;
  width: number;
  height: number;
  alt: string;
};
export const ImageLoad: FC<IProps> = ({ url, width, height, alt }) => {
  const [loading, setLoading] = useState(true);

  const handleLoad = () => {
    setLoading(false);
  };
  return (
    <Image
      width={width}
      height={height}
      src={url}
      alt={alt}
      onLoad={handleLoad}
      className={loading ? "animate-pulse" : ""}
    />
  );
};
