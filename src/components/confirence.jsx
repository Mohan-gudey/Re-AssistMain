// import React, { useEffect, useState } from "react";

// function App() {
//   const [conferences, setConferences] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetch("http://www.conferenceranks.com/data/era2010.min.js")
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Failed to fetch data");
//         }
//         return response.text(); // Get the response as plain text
//       })
//       .then((data) => {
//         console.log("Raw data:", data); // Debugging

//         // Remove comments (optional)
//         const cleanedData = data.replace(/\/\*[\s\S]*?\*\//g, '').trim();

//         // Extract the array using regex
//         const match = cleanedData.match(/setDataERA2010\s*\((\[.*\])\)/s);
//         if (!match || !match[1]) {
//           throw new Error("Invalid data format");
//         }

//         console.log("Extracted array:", match[1]); // Debugging

//         // Parse the extracted JSON string
//         try {
//           const parsedData = JSON.parse(match[1]);
//           setConferences(parsedData);
//         } catch (parseError) {
//           throw new Error("Failed to parse JSON: " + parseError.message);
//         }

//         setLoading(false);
//       })
//       .catch((err) => {
//         setError(err.message);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return <div className="p-8 text-center">Loading...</div>;
//   }

//   if (error) {
//     return <div className="p-8 text-red-500 text-center">Error: {error}</div>;
//   }

//   return (
//     <div className="p-8 bg-gray-100 min-h-screen">
//       <h1 className="text-2xl font-bold mb-6 text-center">Conference Rankings</h1>
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-300">
//           <thead className="bg-gray-200">
//             <tr>
//               <th className="py-2 px-4 border-b">Name</th>
//               <th className="py-2 px-4 border-b">Abbreviation</th>
//               <th className="py-2 px-4 border-b">Rank</th>
//             </tr>
//           </thead>
//           <tbody>
//             {conferences.map((conference, index) => (
//               <tr key={index} className="hover:bg-gray-50">
//                 <td className="py-2 px-4 border-b">{conference.name}</td>
//                 <td className="py-2 px-4 border-b">{conference.abbrv || "N/A"}</td>
//                 <td className="py-2 px-4 border-b">{conference.rank}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default App;


import React, { useEffect, useState } from "react";

function App() {
  const [conferences, setConferences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for filtering and sorting
  const [filterQuery, setFilterQuery] = useState("");
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  useEffect(() => {
    fetch("http://www.conferenceranks.com/data/era2010.min.js")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.text(); // Get the response as plain text
      })
      .then((data) => {
        console.log("Raw data:", data); // Log the raw response

        // Step 1: Clean the data (remove comments, extra whitespace)
        const cleanedData = data.replace(/\/\*[\s\S]*?\*\//g, '').trim();
        console.log("Cleaned data:", cleanedData);

        // Step 2: Extract the array using regex
        const match = cleanedData.match(/setDataERA2010\s*\((\[.*\])\)/s);
        if (!match || !match[1]) {
          throw new Error("Invalid data format");
        }

        console.log("Extracted array:", match[1]); // Log the extracted array

        // Step 3: Parse the JSON
        try {
          const parsedData = JSON.parse(match[1]);
          setConferences(parsedData);
        } catch (parseError) {
          throw new Error("Failed to parse JSON: " + parseError.message);
        }

        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-500 text-center">Error: {error}</div>;
  }

  // Filter the data
  const filteredConferences = conferences.filter((conference) => {
    const query = filterQuery.toLowerCase();
    return (
      conference.name.toLowerCase().includes(query) ||
      (conference.abbrv && conference.abbrv.toLowerCase().includes(query)) ||
      conference.rank.toLowerCase().includes(query)
    );
  });

  // Sort the data
  const sortedConferences = [...filteredConferences].sort((a, b) => {
    if (!sortColumn) return 0;

    let valueA = a[sortColumn]?.toLowerCase() || "";
    let valueB = b[sortColumn]?.toLowerCase() || "";

    if (valueA < valueB) return sortDirection === "asc" ? -1 : 1;
    if (valueA > valueB) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  // Handle sorting
  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center">Conference Rankings</h1>

      {/* Search Bar */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search by name, abbreviation, or rank..."
          value={filterQuery}
          onChange={(e) => setFilterQuery(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th
                className="py-2 px-4 border-b cursor-pointer"
                onClick={() => handleSort("name")}
              >
                Name {sortColumn === "name" && (sortDirection === "asc" ? "▲" : "▼")}
              </th>
              <th
                className="py-2 px-4 border-b cursor-pointer"
                onClick={() => handleSort("abbrv")}
              >
                Abbreviation{" "}
                {sortColumn === "abbrv" && (sortDirection === "asc" ? "▲" : "▼")}
              </th>
              <th
                className="py-2 px-4 border-b cursor-pointer"
                onClick={() => handleSort("rank")}
              >
                Rank {sortColumn === "rank" && (sortDirection === "asc" ? "▲" : "▼")}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedConferences.map((conference, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{conference.name}</td>
                <td className="py-2 px-4 border-b">{conference.abbrv || "N/A"}</td>
                <td className="py-2 px-4 border-b">{conference.rank}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;