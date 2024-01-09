
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"
import { FormatToIDR } from "@/lib/utils";
import DisplayCard from "./displayCard";

// const data = [
//     {
//       name: "Jan",
//       total: Math.floor(Math.random() * 5000) + 1000,
//     },
//     {
//       name: "Feb",
//       total: Math.floor(Math.random() * 5000) + 1000,
//     },
//     {
//       name: "Mar",
//       total: Math.floor(Math.random() * 5000) + 1000,
//     },
//     {
//       name: "Apr",
//       total: Math.floor(Math.random() * 5000) + 1000,
//     },
//     {
//       name: "May",
//       total: Math.floor(Math.random() * 5000) + 1000,
//     },
//     {
//       name: "Jun",
//       total: Math.floor(Math.random() * 5000) + 1000,
//     },
//     {
//       name: "Jul",
//       total: Math.floor(Math.random() * 5000) + 1000,
//     },
//     {
//       name: "Aug",
//       total: Math.floor(Math.random() * 5000) + 1000,
//     },
//     {
//       name: "Sep",
//       total: Math.floor(Math.random() * 5000) + 1000,
//     },
//     {
//       name: "Oct",
//       total: Math.floor(Math.random() * 5000) + 1000,
//     },
//     {
//       name: "Nov",
//       total: Math.floor(Math.random() * 5000) + 1000,
//     },
//     {
//       name: "Dec",
//       total: Math.floor(Math.random() * 5000) + 1000,
//     },
//   ]

interface ChartProps {
    order: {
        month: string;
        total: number,
        // Add other properties as needed
    };
}


const SalesChart: React.FC<ChartProps> = (data: any) => {


    const [year, setYear] = useState("2023");
    const [filteredData, setFilteredData] = useState([]);
    const [revenueData, setRevenueData] = useState(0);
    const [allOrderData, setAllOrderData] = useState(0);

    const handleSelect = (selectedYear: string) => {
        setYear(selectedYear);
        setFilteredData(data.data[selectedYear].months || []);
        setRevenueData(data.data[selectedYear].totalRevenue || 0);
        setAllOrderData(data.data[selectedYear].totalOrders || 0);
    };

    useEffect(() => {
        // Update filteredData when the selected year changes
        setFilteredData(data.data[year].months || []);
        setRevenueData(data.data[year].totalRevenue || 0);
        setAllOrderData(data.data[year].totalOrders || 0);
    }, [year, data.data]);
    console.log(data.data[2023].totalRevenue);
    return (

        <>
       
            <Select onValueChange={(selectedYear) => handleSelect(selectedYear)} value={year}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select year" />
                </SelectTrigger>

                <SelectContent>
                    {Object.keys(data.data).map((year) => (
                        <SelectItem key={year} value={year}>
                            {year}
                        </SelectItem>
                    ))}</SelectContent>
            </Select>
            <div className="grid gap-2 p-3 md:w-[400px] lg:w-screen lg:grid-cols-[.75fr_1fr]">
            <ResponsiveContainer width="100%" className="m-4" height={350}>


                <BarChart data={filteredData} margin={{
                    top: 5,
                    right: 30,
                    left: 40,
                    bottom: 5,
                }}>
                    <XAxis
                        dataKey="month"
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis
                        stroke="#888888"
                        fontSize={12}
                        tickLine={true}
                        axisLine={true}
                        tickFormatter={(value) => `${FormatToIDR(value)}`}
                    />
                    <Bar dataKey="total" fill="#FC5185" radius={[1, 10, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>

          <div className="space-y-4 mt-4 text-lg font-medium"><DisplayCard title="Total Sales" content={FormatToIDR(revenueData)} description={year} />  
           <DisplayCard title="Total Order" content={`${allOrderData}`} description={year} /></div>
</div>
        </>
    )
}

export default SalesChart