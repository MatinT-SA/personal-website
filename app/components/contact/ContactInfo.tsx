import type { IconType } from "react-icons";
import ContactCard from "./ContactCard";

type ContactInfoItem = {
  icon: IconType;
  title: string;
  value: string;
  href?: string;
};

type ContactInfoProps = {
  contactInfo: ContactInfoItem[];
};

export default function ContactInfo({ contactInfo }: ContactInfoProps) {
  return (
    <div className="flex justify-center flex-wrap lg:gap-y-12 gap-x-12">
      {contactInfo.map((item, index) => (
        <div
          key={index}
          className="w-full lg:w-[calc(33.333%-32px)] lg:max-w-xs flex justify-center"
        >
          <ContactCard {...item} />
        </div>
      ))}
    </div>
  );
}
