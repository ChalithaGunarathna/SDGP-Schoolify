"use client";
import  React from 'react';
import NavbarComponent from "@/app/schoolifylanding/components/NavbarComponent";
// import {Hero} from "@/app/schoolifylanding/components/Hero";
import Features from "@/app/schoolifylanding/components/Features";
import Aboutus from "@/app/schoolifylanding/components/Aboutus";
import Team from "@/app/schoolifylanding/components/Team";
import {FooterSection} from "@/app/components/FooterSection";
import dynamic from "next/dynamic";
const Hero = dynamic(() => import("./components/Hero.jsx").then((mod) => mod.default), { ssr: false });

export default function LoginPage() {
    return (
        <div>
            <NavbarComponent />
            <Hero />
            <Features />
            <Aboutus/>
            {/* <Team/> */}
            <FooterSection/>
        </div>
    );
}