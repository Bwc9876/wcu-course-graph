import type { Course } from "@/lib/db";

const CourseCard = ({
    course,
    className,
    onClick
}: {
    course: Course;
    className?: string;
    onClick?: () => void;
}) => {
    return (
        <div
            onClick={onClick}
            id={`${course.code.prefix} ${course.code.number}`}
            className={`flex flex-col gap-2 rounded bg-slate-800 px-4 py-2 ${className ?? ""}`}
        >
            <h2 className="flex flex-row gap-2 text-xl">
                <span className="font-bold">
                    {course.code.prefix.toUpperCase()} {course.code.number}
                </span>
                <span>{course.title}</span>
            </h2>
            {/* From the course db, we're going to trust it */}
            <p dangerouslySetInnerHTML={{ __html: course.description }} />
            {course.pre_requirements.length !== 0 && (
                <>
                    <h3 className="text-lg">Prerequiremens</h3>
                    <ul className="ms-4 list-disc">
                        {course.pre_requirements.map((pr, i) => (
                            <li key={i}>{pr}</li>
                        ))}
                    </ul>
                </>
            )}
            {course.gen_ed_fulfillments.length !== 0 && (
                <>
                    <h3 className="text-lg">Gen-Ed Fulfillments</h3>
                    <ul className="ms-4 list-disc">
                        {course.gen_ed_fulfillments.map((pr, i) => (
                            <li key={i}>{pr}</li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};

export default CourseCard;
