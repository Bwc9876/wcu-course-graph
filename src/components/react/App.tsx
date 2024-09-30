import React, { useRef } from "react";
import GraphView from "./GraphView";
import { useDatabase, type CourseCode, type Database } from "@/lib/db";
import DatabaseView from "./DatabaseView";

const DbLoaded = ({ db }: { db: Database }) => {
    const leRef = useRef<{ focusCourse: (c: CourseCode) => void }>();

    return (
        <React.StrictMode>
            <div className="flex h-full flex-row justify-evenly gap-6">
                <DatabaseView
                    onFocusChanged={(code) => leRef.current?.focusCourse?.(code)}
                    db={db}
                />
                <GraphView ref={leRef} courses={db.courses} />
            </div>
        </React.StrictMode>
    );
};

const App = () => {
    const db = useDatabase();

    if (db.p === "done") {
        return <DbLoaded db={db.d} />;
    } else if (db.p === "error") {
        return <h3 style={{ color: "red" }}>{db.e}</h3>;
    } else {
        return <p>Loading...</p>;
    }
};

export default App;
