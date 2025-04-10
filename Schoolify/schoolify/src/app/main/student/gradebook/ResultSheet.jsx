import React, { useEffect, useState } from 'react';
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell
} from "@heroui/react";

import { supabase } from "@/app/lib/supabaseClient";

const ResultSheet = () => {
    const [schoolId, setSchoolId] = useState(null);
    const [studentId, setStudentId] = useState(null);
    const [grades, setGrades] = useState([]);
    const [teacherName, setTeacherName] = useState(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedSchoolId = localStorage.getItem("school_id");
            const storedStudentId = localStorage.getItem("student_id");

            setSchoolId(storedSchoolId);
            setStudentId(storedStudentId);
        }
    }, []);

    useEffect(() => {
        const fetchStudentGrades = async () => {
            if (!studentId) return;

            const { data, error } = await supabase
                .from("gradebook")
                .select("subject, grade, remarks, created_at, term, teacher_id")
                .eq("student_id", studentId)
                .order("term", { ascending: true }); // Order by term

            if (error) {
                console.error("Error fetching student grades:", error);
                return;
            }
            setGrades(data);

            if (data.length > 0 && data[0].teacher_id) {
                const teacherId = data[0].teacher_id;
                const { data: teacherData, error: teacherError } = await supabase
                    .from("teacher")
                    .select("teacher_name")
                    .eq("teacher_id", teacherId)
                    .single();

                if (teacherError) {
                    console.error("Error fetching teacher name:", teacherError);
                    return;
                }
                setTeacherName(teacherData?.teacher_name || 'N/A');
            }
        };

        fetchStudentGrades();
    }, [studentId]);

    // Group grades by term
    const termGrades = {
        1: grades.filter(grade => grade.term === 1),
        2: grades.filter(grade => grade.term === 2),
        3: grades.filter(grade => grade.term === 3),
    };

    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-4xl text-black font-bold">Result Sheet</h2>
            {teacherName && <p className="text-black text-2xl mb-2"><strong>Teacher:</strong> {teacherName}</p>}

            {[1, 2, 3].map(term => (
                <div key={term}>
                    <h3 className="text-2xl text-black font-semibold mb-2">Term {term} Results</h3>
                    {termGrades[term].length > 0 ? (
                        // <Table
                        //     aria-label={`Term ${term} Grade Table`}
                        //     color="default"
                        //     // selectionMode="single"
                        // >
                        <Table
                            aria-label={`Term ${term} Grade Table`}
                            color="default"
                            selectionMode="single"
                            isKeyboardNavigationDisabled={true}
                            classNames={{
                                table: "bg-white rounded-lg",                    // ✅ inner table background
                                th: "text-white font-semibold text-sm",
                                tr: "bg-white !outline-none !ring-0 focus:!ring-0",
                                td: "text-sm text-black",
                            }}
                        >
                            <TableHeader>
                                <TableColumn >Subject</TableColumn>
                                <TableColumn>Grade</TableColumn>
                                <TableColumn>Remarks</TableColumn>
                                <TableColumn>Date</TableColumn>
                            </TableHeader>
                            <TableBody>
                                {termGrades[term].map((grade, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{grade.subject}</TableCell>
                                        <TableCell>{grade.grade}</TableCell>
                                        <TableCell>{grade.remarks}</TableCell>
                                        <TableCell>{new Date(grade.created_at).toLocaleDateString()}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <p className="text-danger font-bold">No grades available for Term {term}.</p>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ResultSheet;