import Image from "next/image";

const IMAGE_WRAPPER_CLASSES =
  "w-full max-w-[220px] sm:max-w-[300px] md:max-w-[400px] lg:max-w-[300px] mx-16 float-matin";
const IMAGE_CLASSES = "rounded-lg object-contain w-full h-auto";

export default function AboutMeImage() {
  return (
    <div className={IMAGE_WRAPPER_CLASSES}>
      <Image
        src="/images/mt-standing.png"
        alt="Matin Taherzadeh Image"
        width={433}
        height={577}
        priority
        className={IMAGE_CLASSES}
      />
    </div>
  );
}
