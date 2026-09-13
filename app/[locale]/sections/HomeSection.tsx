import { forwardRef } from "react";
import ProfileCard from "@app/components/profile/profile-card/ProfileCard";
import Navigation from "../Navigation";

const HomeSection = forwardRef<HTMLElement>(function HomeSection(_props, ref) {
    return (
        <section ref={ref} className="w-full">
            <Navigation />
            <ProfileCard />
        </section>
    );
});

export default HomeSection;
