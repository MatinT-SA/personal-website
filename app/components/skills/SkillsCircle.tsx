"use client";

import { useCallback, useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import type { SkillCircleData } from "@/app/src/constants/skillsData";
import LoadingSpinner from "../ui/icons/LoadingSpinner";

interface SkillsCircleProps {
    data: SkillCircleData[];
    onSliceClick?: (categoryName: string) => void;
}

export default function SkillsCircle({ data, onSliceClick }: SkillsCircleProps) {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    const handleSliceClick = useCallback(
        (sliceData: SkillCircleData) => {
            onSliceClick?.(sliceData.name);
        },
        [onSliceClick],
    );

    if (!hasMounted) {
        return (
            <div className="h-[300px] w-[300px] flex items-center justify-center">
                <LoadingSpinner size="h-10 w-10" color="text-cyan-400" />
            </div>
        );
    }

    return (
        <div className="h-[300px] w-[300px]">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={110}
                        paddingAngle={5}
                        startAngle={90}
                        endAngle={450}
                        onClick={handleSliceClick}
                    >
                        {data.map((entry, index) => (
                            <Cell
                                key={index}
                                fill={entry.color}
                                stroke="#fff"
                                strokeWidth={1.5}
                                className="cursor-pointer"
                            />
                        ))}
                    </Pie>
                    <Tooltip
                        formatter={(value, _name, item) => {
                            const categoryName = item.payload.name;
                            const skillCount = item.payload.value;
                            return [`${categoryName}: ${skillCount}`];
                        }}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
