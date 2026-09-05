import { useTranslations } from "next-intl";

type ProfileInfoProps = {
    isMobile: boolean;
};

export default function ProfileInfo({ isMobile }: ProfileInfoProps) {
    const t = useTranslations("profile");

    return (
        <>
            <div
                className={`text-2xl font-bold text-white ${
                    isMobile ? "mt-2" : "-mt-10 -ml-28"
                }`}
            >
                {t("info_name")}
            </div>
            <div className={`text-white text-base ${isMobile ? "mt-1" : "mt-10"}`}>
                {t("info_role")}
            </div>
        </>
    );
}
