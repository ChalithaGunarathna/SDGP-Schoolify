import { useState, useEffect } from "react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { supabase } from "@/app/lib/supabaseClient";
import {useRouter} from "next/navigation"; // Import Supabase client

export default function Subjects() {
    // State variables
    const [studentId, setStudentId] = useState(null);
    const [subjectScheme, setSubjectScheme] = useState(null);
    const [selectedSubject, setSelectedSubject] = useState("");
    const [resources, setResources] = useState([]);
    const router = useRouter(); // ✅ Initialize it here

    // Fetch student ID from local storage
    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedStudentId = localStorage.getItem("student_id");
            setStudentId(storedStudentId);
        }
    }, []);

    // Fetch student grade & subject scheme from Supabase
    useEffect(() => {
        const fetchStudentDetails = async () => {
            if (studentId) {
                const { data, error } = await supabase
                    .from("student")
                    .select("subject_scheme")
                    .eq("student_id", studentId)
                    .single();

                if (error) {
                    console.error("Error fetching student data:", error.message);
                } else {
                    setSubjectScheme(data.subject_scheme);
                }
            }
        };

        fetchStudentDetails();
    }, [studentId]);

    // Fetch resources for the selected subject
    const fetchResources = async (subject) => {
        if (!subjectScheme) return;

        const { data, error } = await supabase
            .from("resources")
            .select("*")
            .eq("subject", subject);

        if (error) {
            console.error("Error fetching resources:", error.message);
        } else {
            setResources(data);
        }
    };

    // Handle subject card click
    const handleOpen = () => {
        router.push(`/main/student/resources?role=student`);
    };

    // Define subjects based on `subject_scheme`
    const subjectsByScheme = {
        "1": ["Mathematics", "Science", "English", "History", "ICT", "Sinhala", "Commerce", "Music"], // Grade 6-10
        "2": ["Mathematics", "Science", "English", "History", "ICT", "Sinhala"], // Grade 10-11
        "3": ["Mathematics", "Physics", "Chemistry"], // Grade 12-13 (Mathematical Stream)
        "4": ["Biology", "Chemistry", "Physics"], // Grade 12-13 (Biology Stream)
        "5": ["Commerce", "Accounting", "Business Studies"], // Grade 12-13 (Commerce Stream)
        "6": ["Arts", "Political Science", "History"], // Grade 12-13 (Arts Stream)
    };

    // Map subjects to their image paths
    const subjectImages = {
        "Mathematics": "/img/Subjects/mathematics.jpg",
        "Science": "/img/Subjects/science.jpg",
        "English": "/img/Subjects/english.jpg",
        "History": "/img/Subjects/history.jpg",
        "ICT": "/img/Subjects/ict.jpg",
        "Sinhala": "/img/Subjects/sinhala.jpg",
        "Commerce": "/img/Subjects/commerce.jpg",
        "Music": "/img/Subjects/arts.jpg",
        "Physics": "/img/Subjects/physics.jpg",
        "Chemistry": "/img/Subjects/chemistry.jpg",
        "Biology": "/img/Subjects/biology.jpg",
        "Accounting": "/img/Subjects/accounting.jpg",
        "Business Studies": "/img/Subjects/business.jpg",
        "Political Science": "/img/Subjects/political_science.jpg",
        "Arts": "/img/Subjects/arts.jpg",
    };

    // Get subjects based on subject scheme
    const availableSubjects = subjectScheme ? subjectsByScheme[subjectScheme] || [] : [];

    return (
        <div className="mt-1">
            <div>
                <h1 className="text-4xl text-black font-sans font-bold relative inline-block">
                    Subjects
                    <span
                        className="absolute bottom-[-4px] left-0 w-1/2 h-[3px] bg-gradient-to-r from-blue-500 to-blue-200"
                        style={{ width: "30%" }}
                    ></span>
                </h1>
            </div>
            <div className="gap-2 grid grid-cols-2 sm:grid-cols-4 gap-x-2 gap-y-14 mt-8">
                {availableSubjects.length > 0 ? (
                    availableSubjects.map((subject, index) => (
                        <Card
                            className="bg-white bg-opacity-40"
                            key={index}
                            isPressable
                            shadow="sm"
                            onClick={() => handleOpen()} // Corrected onPress
                        >
                            <CardBody className="overflow-visible p-0">
                                <Image
                                    alt={subject}
                                    className="w-full object-cover h-[140px]"
                                    radius="lg"
                                    shadow="sm"
                                    src={subjectImages[subject] || "/img/Subjects/default.jpg"} // Corrected subject image
                                    width="100%"
                                />
                            </CardBody>
                            <CardFooter className="text-small text-black justify-between">
                                <b>{subject}</b> {/* Corrected to show subject name */}
                            </CardFooter>
                        </Card>
                    ))
                ) : (
                    <p>No subjects available for your scheme.</p>
                )}
            </div>
        </div>
    );
}