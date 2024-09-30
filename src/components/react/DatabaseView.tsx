import { type Course, type CourseCode, type Database } from "@/lib/db";
import CourseCard from "./CourseCard";
import { useEffect, useMemo, useState } from "react";
import { Virtuoso } from "react-virtuoso";

const normalize = (val: string) => val.toLocaleLowerCase().replaceAll(" ", "");

const courseMatchesSearch = (search: string, course: Course) => {
    const searchNormal = search.toLowerCase().replaceAll(" ", "");
    return normalize(`${course.code.prefix}${course.code.number}`).includes(searchNormal);
};

export function useDebounce<TValue>(value: TValue, delayMs: number): TValue {
    const [debouncedValue, setDebouncedValue] = useState<TValue>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delayMs);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delayMs]);

    return debouncedValue;
}

const DatabaseView = ({
    db,
    onFocusChanged
}: {
    db: Database;
    onFocusChanged?: (a: CourseCode) => void;
}) => {
    const [searchRaw, setSearch] = useState<string | null>(null);

    const search = useDebounce(searchRaw, 100);

    const data = useMemo(
        () =>
            db.courses.filter(
                (c) => search === null || search.length === 0 || courseMatchesSearch(search, c)
            ),
        [search, db.courses]
    );

    return (
        <div className="my-4 flex h-full w-[30%] flex-col gap-6 overflow-hidden">
            <h2 className="text-center text-2xl font-bold">List View</h2>
            <label className="flex flex-row gap-2 text-center text-xl">
                Search By Code
                <input
                    className="rounded bg-slate-900 text-text"
                    type="text"
                    name="search"
                    value={searchRaw ?? ""}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </label>
            {/* <div>
                <PrefixList
                    selected={selected}
                    onSelectedChange={setSelected}
                    prefixes={db.prefixes}
                />
            </div> */}
            <Virtuoso
                increaseViewportBy={200}
                className="mb-4 overflow-y-auto"
                computeItemKey={(i) => `${i}-${data[i].title}`}
                data={data}
                itemContent={(i, course) => (
                    <CourseCard
                        onClick={() => onFocusChanged?.(course.code)}
                        className={i === data.length - 1 ? "" : "mb-4"}
                        course={course}
                    />
                )}
            />
        </div>
    );
};

export default DatabaseView;
