
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { useState, useEffect } from "react";
import { FormatToIDR } from "@/lib/utils";
import DisplayCard from "./displayCard";

interface MonthData {
    month: string;
    total: number;
  }
  
  interface YearData {
    months: MonthData[];
    totalRevenue: number;
    totalOrders: number;
  }
  
  interface SalesChartData {
    [year: string]: YearData;
  }
  
  interface ChartProps {
    data: SalesChartData;
  }


const SalesChart: React.FC<ChartProps> = ({data}:any) => {


    const [year, setYear] = useState("2023");
    const [filteredData, setFilteredData] = useState<MonthData[]>([]);
    const [revenueData, setRevenueData] = useState(0);
    const [allOrderData, setAllOrderData] = useState(0);
    console.log(data);
    const handleSelect = (selectedYear: string) => {
        setYear(selectedYear);
        // setFilteredData(data.data[selectedYear].months || []);
        // setRevenueData(data.data[selectedYear].totalRevenue || 0);
        // setAllOrderData(data.data[selectedYear].totalOrders || 0);

            // Check if data[selectedYear] is defined before accessing its properties
    if (data[selectedYear]) {
        setFilteredData(data[selectedYear].months || []);
        setRevenueData(data[selectedYear].totalRevenue || 0);
        setAllOrderData(data[selectedYear].totalOrders || 0);
      } else {
        // Handle the case when data[selectedYear] is undefined
        console.error(`Data for year ${selectedYear} is undefined.`);
      }
    };

    useEffect(() => {
        // Update filteredData when the selected year changes
        setFilteredData(data[year]?.months || []);
        setRevenueData(data[year]?.totalRevenue || 0);
        setAllOrderData(data[year]?.totalOrders || 0);
    }, [year, data]);
   
    return (
        <>
            <Select onValueChange={(selectedYear) => handleSelect(selectedYear)} value={year}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                    {Object.keys(data).map((year) => (
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