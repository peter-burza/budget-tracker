'use client'

import React, { useState } from "react";

interface SummaryProps {
    latestMonthRecord: string;
    latestYearRecord: string
    selectedMonth: string
    setSelectedMonth: React.Dispatch<React.SetStateAction<string>>
    selectedYear: string
    setSelectedYear: React.Dispatch<React.SetStateAction<string>>
}

const Summary: React.FC<SummaryProps> = ({ latestMonthRecord, latestYearRecord }) => {
    const [selectedMonth, setSelectedMonth] = useState<string>(latestMonthRecord.toLowerCase()); // 'january' | 'overall'
    const [selectedYear, setSelectedYear] = useState<string>(latestYearRecord); // '2025' | 'overall'

    return (
        <div id="summary" className="flex flex-col items-center gap-4">
            <h3>Summary</h3>
        </div>
    )
}

export default Summary