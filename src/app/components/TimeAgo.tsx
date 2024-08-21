import React from "react";  // Add the correct import statement for React
import ReactTimeAgo from "react-time-ago";

export default function TimeAgo({ createdAt }: { createdAt: string }) {
    return (
        <>
            <ReactTimeAgo date={new Date(createdAt)} />  {/* Convert 'createdAt' to a Date object */}
        </>
    );
}
