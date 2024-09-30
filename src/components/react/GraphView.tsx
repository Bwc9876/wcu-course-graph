import type { Course, CourseCode } from "@/lib/db";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { Network } from "vis-network";
import "vis-network/styles/vis-network.min.css";

const getId = (courseCode: CourseCode) => `${courseCode.prefix.toUpperCase()} ${courseCode.number}`;

const GraphView = forwardRef(function A({ courses }: { courses: Course[] }, ref) {
    const containerRef = useRef<HTMLDivElement>(null);
    const netRef = useRef<Network | null>(null);

    useImperativeHandle(
        ref,
        () => ({
            focusCourse: (courseCode: CourseCode) => {
                if (netRef.current) {
                    const net = netRef.current;
                    const id = getId(courseCode);
                    net.focus(id, { animation: true, scale: 1 });
                    net.selectNodes([id]);
                }
            }
        }),
        []
    );

    const getKey = (course: Course) => getId(course.code);

    useEffect(() => {
        if (containerRef.current === null) return;

        const nodes = courses.map((c) => ({
            id: getId(c.code),
            label: getId(c.code)
        }));

        const edges = courses.flatMap((c) =>
            c.pre_requirements.map((p) => ({
                from: p,
                to: getKey(c)
            }))
        );

        // nodes = nodes.filter(n => edges.some(e => n.id == e.from || n.id == e.to));

        netRef.current = new Network(
            containerRef.current,
            { nodes, edges },
            {
                autoResize: false,
                interaction: { navigationButtons: true },
                edges: { smooth: true, arrows: { to: true } },
                physics: { stabilization: false },
                layout: { improvedLayout: false }
            }
        );
    }, [courses]);

    return <div className="h-full w-full grow" ref={containerRef} />;
});

export default GraphView;
