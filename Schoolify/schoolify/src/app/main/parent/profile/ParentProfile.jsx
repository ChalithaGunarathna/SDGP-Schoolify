// import { Avatar, Card, CardBody, CardHeader } from "@heroui/react";
//
// export default function TeacherProfile() {
//     return (
//         <Card className="w-full bg-gray-100 text-black flex flex-col py-8 px-4 rounded-none">
//             <div className="flex flex-col items-center pb-8">
//                 <Avatar
//                     isBordered
//                     color="primary"
//                     className="w-32 h-32"
//                     src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
//                 />
//                 <h2 className="text-4xl font-bold mt-4">John Doe</h2>
//             </div>
//             <CardBody className="grid grid-cols-2 gap-12 ">
//                 {/* Student Basic Information */}
//                 <div className=" text-lg leading-relaxed ">
//                     <h3 className="text-2xl font-semibold mb-6">Basic Information</h3>
//                     <div className="border-none py-4 bg-white shadow-sm">
//                         <div className="grid grid-cols-[200px_1fr] px-4 ">
//                             <p className="font-semibold py-4 border-b">Full Name:</p> <p className="py-4 border-b">John Doe</p>
//                             <p className="font-semibold py-4 border-b">Email:</p> <p className="py-4 border-b">johndoe@example.com</p>
//                             <p className="font-semibold py-4 border-b">Gender:</p> <p className="py-4 border-b">Male</p>
//                             <p className="font-semibold py-4 border-b">Date of Birth:</p> <p className="py-4 border-b">15th
//                             June 2010</p>
//                             <p className="font-semibold py-4">Education Level:</p> <p className="py-4 ">Grade
//                             10</p>
//                         </div>
//                     </div>
//                 </div>
//
//                 {/* Guardian Information */}
//                 <div className=" text-lg leading-relaxed ">
//                     <h3 className="text-2xl font-semibold mb-6">Guardian Information</h3>
//                     <div className="border-none p-4 bg-white shadow-sm">
//                         <div className="grid grid-cols-[200px_1fr]">
//                             <p className="font-semibold py-4 border-b">Guardian Name:</p> <p className="py-4 border-b">Jane Doe</p>
//                             <p className="font-semibold py-4 border-b">Relationship:</p> <p className="py-4 border-b">Mother</p>
//                             <p className="font-semibold py-4 border-b">Contact:</p> <p className="py-4 border-b">+1234567890</p>
//                             <p className="font-semibold py-4 border-b">Email:</p> <p className="py-4 border-b">janedoe@example.com</p>
//                             <p className="font-semibold py-4">Address:</p> <p className="py-4">123 Main Street, Cityville</p>
//                         </div>
//                     </div>
//                 </div>
//             </CardBody>
//         </Card>
// );
// }
"use client";  // Ensure this is the first line

import {Avatar, Button, Card, CardBody} from "@heroui/react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";  // Correct import for App Router
import {supabase} from "@/app/lib/supabaseClient";
import {useEffect, useState} from "react";


export default function ParentProfile() {
    const [parentId, setParentId] = useState(null); // Store school_id in state
    const [studentId, setStudentId] = useState(null);
    const [student, setStudent] = useState(null);
    const [parent, setParent] = useState(null);
    const [school, setSchool] = useState(null);
    const [schoolId, setSchoolId] = useState(null);
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedParentId = localStorage.getItem("parent_id");
            const storedSchoolId = localStorage.getItem("school_id");
            setParentId(storedParentId);
            setSchoolId(storedSchoolId);
            console.log(school, "sadasdasdasdasd");
        }
    }, []);

    useEffect(() => {
        const fetchParents = async () => {
            if (!parentId) return; // Prevent fetching if school_id is not available

            const { data, error } = await supabase
                .from("parent")
                .select("parent_id, parent_name, parent_email, photo, contact, address, student_id, guardian")
                .eq("parent_id", parentId);


            if (error) {
                console.error("Error fetching parents:", error);
            } else if (data && data.length > 0) {
                setParent(data[0]); // ✅ Extract first object from array
                setStudentId(data[0].student_id);
                console.log("Updated parents object:", data[0]); // ✅ Debugging log
            } else {
                console.warn("No parent data found.");
            }

        };

        fetchParents();
    }, [parentId]); // Runs only when schoolId is available


    useEffect(() => {
        const fetchStudents = async () => {
            if (!studentId) return; // Prevent fetching if school_id is not available

            const { data, error } = await supabase
                .from("student")
                .select("student_id, student_name, student_email, student_grade, photo, school_id, gender")
                .eq("student_id", studentId);


            if (error) {
                console.error("Error fetching students:", error);
            } else if (data && data.length > 0) {
                setStudent(data[0]); // ✅ Extract first object from array
                console.log("Updated student object:", data[0]); // ✅ Debugging log
            } else {
                console.warn("No student data found.");
            }
        };

        fetchStudents();
    }, [studentId]); // Runs only when schoolId is available

    useEffect(() => {
        const fetchSchool = async () => {
            if (!schoolId) return; // Prevent fetching if school_id is not available

            const { data, error } = await supabase
                .from("school")
                .select("name")
                .eq("school_id", schoolId);


            if (error) {
                console.error("Error fetching school:", error);
            } else if (data && data.length > 0) {
                setSchool(data[0]); // ✅ Extract first object from array
                console.log("Updated school object:", data[0]); // ✅ Debugging log
            } else {
                console.warn("No school data found.");
            }
        };

        fetchSchool();
    }, [schoolId]); // Runs only when schoolId is available

    const handleSignOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (!error) {
            localStorage.clear(); // Clear any stored IDs
            router.push("/login"); // Redirect to login page
        } else {
            console.error("Error signing out:", error.message);
        }
    };

    return (
        <Card
            className="w-full bg-customBackGround rounded-xl text-black flex flex-col py-8 px-4  relative">
            {/* Go Back Icon */}
            {/*<button*/}
            {/*    onClick={() => router.back()}*/}
            {/*    className="absolute top-4 left-4 flex items-center text-gray-600 hover:text-black"*/}
            {/*>*/}
            {/*    <ArrowLeft className="w-6 h-6 text-black"/>*/}
            {/*    <span className="ml-2 text-lg text-black">Go Back</span>*/}
            {/*</button>*/}

            <div className="flex flex-col items-center pb-8 sm:mt-0 mt-10">
                <Avatar
                    isBordered
                    color="primary"
                    className="w-32 h-32"
                    src={parent?.photo || "https://images.unsplash.com/photo-1564156280315-1d42b4651629?q=80&w=2584&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                />
                <h2 className="text-4xl font-bold mt-4">{parent?.parent_name || "asda"}</h2>
            </div>
            <CardBody className="grid sm:grid-cols-2 gap-12">
                {/* Guardian Information */}
                <div className="text-lg leading-relaxed">
                    <h3 className="text-2xl font-semibold mb-6">Basic Information</h3>
                    <div className="border-none p-4 bg-customDarkBackGround bg-opacity-50 shadow-sm rounded-xl">
                        <div className="grid sm:grid-cols-[200px_1fr]">
                            <p className="font-semibold py-4 border-b">Guardian Name:</p> <p
                            className="py-4 border-b">{parent?.parent_name || "asda"}</p>
                            <p className="font-semibold py-4 border-b">Relationship:</p> <p
                            className="py-4 border-b">{parent?.guardian || "Guardian"}</p>
                            <p className="font-semibold py-4 border-b">Contact:</p> <p
                            className="py-4 border-b">{parent?.contact || "1234567890"}</p>
                            <p className="font-semibold py-4 border-b">Email:</p> <p
                            className="py-4 border-b">{parent?.parent_email || "asda"}</p>
                            <p className="font-semibold py-4">Address:</p> <p
                            className="py-4">{parent?.address || "123 Main Street, Cityville"}</p>
                        </div>
                    </div>
                </div>

                {/* Student Basic Information */}
                <div className="text-lg leading-relaxed">
                    <h3 className="text-2xl font-semibold mb-6">Child's Information</h3>
                    <div className="border-none py-4 bg-customDarkBackGround bg-opacity-50 shadow-sm rounded-xl">
                        <div className="grid sm:grid-cols-[200px_1fr] px-4">
                            <p className="font-semibold py-4 border-b">Full Name:</p> <p
                            className="py-4 border-b">{student?.student_name || "asda"}</p>
                            <p className="font-semibold py-4 border-b">Email:</p> <p
                            className="py-4 border-b">{student?.student_email || "asda"}</p>
                            <p className="font-semibold py-4 border-b">Gender:</p> <p
                            className="py-4 border-b">{student?.gender || "asda"}</p>
                            {/*<p className="font-semibold py-4 border-b">Date of Birth:</p> <p className="py-4 border-b">{student?.date_of_birth || "asda"}</p>*/}
                            <p className="font-semibold py-4 border-b">School:</p> <p
                            className="py-4 border-b">{school?.name || "asda"}</p>
                            <p className="font-semibold py-4">Education Level:</p> <p
                            className="py-4">Grade {student?.student_grade || "asda"}</p>
                        </div>
                    </div>
                </div>


            </CardBody>
            <div className="text-center mt-5">
                <Button
                    onClick={handleSignOut}
                    color="danger"
                    variant="ghost"
                >
                    Sign Out
                </Button>
            </div>
        </Card>
    );
}