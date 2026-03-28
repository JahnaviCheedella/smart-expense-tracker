import { Typography } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import httpCommon from "../httpCommon";

const Summary = ({ refresh }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const res = await httpCommon.get("/summary");
                setData(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchSummary();
    }, [refresh])

    return (
        <>
            <Typography variant="h6" fontWeight="bold">Summary</Typography>
            {
                data.map((item) => {
                    return <Typography key={item.category}>{item.category} - {item.total}</Typography>
                })
            }
        </>
    )
}

export default Summary;