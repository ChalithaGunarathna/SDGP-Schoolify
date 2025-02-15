import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import {Providers} from "@/app/providers";
import MainNavbar from "@/app/components/MainNavbar";
import {FooterSection} from "@/app/components/FooterSection";
import {ProfileAndNotificationStudent} from "@/app/main/student/profileAndNotificationStudent";
import NotificationBell from "@/app/main/student/NotificationBellStudent";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({ children }) {
    return (
        <>

            <Providers>
                <MainNavbar/>
                <div id="root">{children}</div>
                <div className="
                  text-white rounded-full fixed
                  bottom-4 right-6 shadow-lg dark:bg-white dark:text-black
                  flex gap-4 items-center sm:flex-row flex-col z-50">
                    <NotificationBell/>
                    <ProfileAndNotificationStudent/>
                </div>
                    <FooterSection/>
            </Providers>

        </>
);
}
