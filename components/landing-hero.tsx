"use client";

import { useAuth } from "@clerk/nextjs"
import Link from "next/link";
import TypeWriterComponent from "typewriter-effect"
import { Button } from "./ui/button";

export const LandingHero = ()=>{
    const {isSignedIn}=useAuth();
    return(
        <div className="text-white font-bold py-36 text-center">
            <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold">
                <h1>Your one-stop AI tool</h1>
                <div className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-pink-700 to-blue-500">
                    <TypeWriterComponent options={{
                          strings:[
                            "Chatbot",
                            "Image Generation",
                            "Video Generation",
                            "Music Generation",
                            "Code Generation"
                          ],
                          autoStart: true,
                          loop: true
                    }}
/>
                </div>
                <div className="text-sm md:text-xl font-light text-zinc-400">
                Share your prompts, and let our AI wizard work its magic for you.
                </div>
                <div>
                    <Link href={isSignedIn?"/dashboard":"/sign-up"}>
                        <Button variant="premium" className="md:lext-lg p-4 md:p-6 rounded-full font-semibold">
                            Start generating for free
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
