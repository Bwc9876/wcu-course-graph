import { useCallback } from "react";

const PrefixList = ({
    prefixes,
    selected,
    onSelectedChange
}: {
    prefixes: string[];
    selected: string[];
    onSelectedChange: (s: string[]) => void;
}) => {
    const onBadgeClick = useCallback(
        (pre: string) => {
            if (selected.includes(pre)) {
                onSelectedChange(selected.filter((p) => p !== pre));
            } else {
                onSelectedChange([...selected, pre]);
            }
        },
        [onSelectedChange, selected]
    );

    const isSelected = (p: string) => selected.includes(p);

    const baseClass = "rounded-full cursor-pointer select-none px-3 py-1";

    return (
        <div className="flex min-h-0 w-full flex-row gap-2 overflow-scroll pb-4">
            <li
                onClick={() => onSelectedChange([])}
                className={`${baseClass} bg-red-800 ${selected.length === 0 ? "hidden" : "inline"}`}
            >
                Clear
            </li>
            {prefixes.map((pre, i) => (
                <span
                    onClick={() => onBadgeClick(pre)}
                    className={`${baseClass} ${isSelected(pre) ? "bg-purple-800" : "bg-slate-800"}`}
                    key={i}
                >
                    {pre.toUpperCase()}
                </span>
            ))}
        </div>
    );
};

export default PrefixList;
