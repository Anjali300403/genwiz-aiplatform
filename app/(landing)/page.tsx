import { LandingContent } from "@/components/Lnding-content";
import { LandingHero } from "@/components/landing-hero";
import { LandingNavbar } from "@/components/landing-navbar";
import { Button } from "@/components/ui/button";
import Link from 'next/link'


const LandingPage=()=>{
    return(
        <div className="h-full">
            <LandingNavbar/>
            <LandingHero/>
            <LandingContent/>

        </div>
    )
}

export default LandingPage;