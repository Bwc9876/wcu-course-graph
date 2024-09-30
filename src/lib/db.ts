import { useEffect, useState } from "react";

export interface CourseCode {
    prefix: string;
    number: number;
}

export interface Course {
    title: string;
    code: CourseCode;
    description: string;
    credits: number;
    pre_requirements: string[];
    gen_ed_fulfillments: string[];
    distance_available: boolean;
    offered_terms: string[];
}

export interface Database {
    prefixes: string[];
    courses: Course[];
}

const DB_URL = "https://bwc9876.github.io/wcu_course_db/courses.json";

export const fetchDatabase = (): Promise<Database> =>
    new Promise((resolve, reject) => {
        const xmlReq = new XMLHttpRequest();
        xmlReq.onload = () => {
            resolve(JSON.parse(xmlReq.responseText));
        };
        xmlReq.onerror = (e) => {
            reject(e);
        };
        const url = DB_URL + (/\?/.test(DB_URL) ? "&" : "?") + new Date().getTime();
        xmlReq.open("GET", url, true);
        xmlReq.send();
    });

export type DatabaseHookResult =
    | {
          p: "loading";
      }
    | {
          p: "done";
          d: Database;
      }
    | {
          p: "error";
          e: string;
      };

export const useDatabase = () => {
    const [database, setDatabase] = useState<DatabaseHookResult>({ p: "loading" });
    useEffect(() => {
        setDatabase({ p: "loading" });
        let cancelled = false;

        fetchDatabase()
            .then((db: Database) => {
                if (cancelled) return;
                setDatabase({ p: "done", d: db });
            })
            .catch((err) => {
                console.error("Error", err);
                if (cancelled) return;
                setDatabase({ p: "error", e: err.toString() });
            });

        return () => {
            cancelled = true;
        };
    }, [setDatabase]);

    return database;
};
