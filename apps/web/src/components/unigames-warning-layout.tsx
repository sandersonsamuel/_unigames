import { IMAGES } from "@/constants/images";
import Image from "next/image";

type Props = {
  children: React.ReactNode;
};

export const WarningText = ({ children }: Props) => (
  <h1 className="md:w-[400px] w-full text-center">{children}</h1>
);

export const UnigamesWarningLayout = ({ children }: Props) => {
  const unigamesLogo = IMAGES.get("logo-unigames");

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center gap-3">
      {unigamesLogo && (
        <Image
          className="md:max-w-[600px] w-[400px] mx-3"
          src={unigamesLogo?.src}
          alt={unigamesLogo.alt}
          width={600}
          height={70}
        />
      )}
      {children}
    </div>
  );
};
