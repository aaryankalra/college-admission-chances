// import React, { useEffect, useState } from "react";
// import { CircularProgressbar } from "react-circular-progressbar";
// import "react-circular-progressbar/dist/styles.css";
// import { CircleAlert } from "lucide-react";
// import { Link } from "react-router";

// const Result = ({ prediction, university }) => {
//   const [text, setText] = useState("");

//   useEffect(() => {
//     const percentage = Math.max(0, prediction);
//     if (percentage >= 0.7) {
//       setText("Your score is good. Keep it up!");
//     } else if (percentage >= 0.5) {
//       setText("Your score is alright, but it can be improved.");
//     } else if (percentage >= 0.3) {
//       setText("Your score is quite low, some work is needed.");
//     } else if (percentage >= 0) {
//       setText(
//         "Your score is very low, you need to work a lot to improve this."
//       );
//     } else {
//       setText("The info you entered seems incorrect.");
//     }
//   }, [prediction]);

//   return (
//     <>
//       <div className="min-h-screen flex flex-col gap-8 items-center justify-center">
//         <div className="flex flex-col gap-2 text-center">
//           <h3 className="text-xl">Your chances of admission at</h3>
//           <div>
//             <h1 className="text-2xl font-bold">{university}</h1>
//             <h3>(according to your given data)</h3>
//           </div>
//         </div>
//         <div className="w-1/3 flex flex-col gap-4 items-center">
//           <CircularProgressbar
//             maxValue={100}
//             minValue={0}
//             strokeWidth={12}
//             value={prediction * 100}
//           />
//           <div className="flex items-center gap-2">
//             <h2 className="text-3xl font-bold">{prediction * 100}%</h2>
//             <div className="tooltip" data-tip={text}>
//               <CircleAlert />
//             </div>
//           </div>
//         </div>
//         <div>
//           <button
//             className="btn btn-warning"
//             onClick={() => window.location.reload()}
//           >
//             Predict Again
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Result;

import React, { useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { CircleAlert } from "lucide-react";

const Result = ({ prediction, university }) => {
  const [text, setText] = useState("");
  const [progress, setProgress] = useState(0);

  const safePrediction = Math.max(0, prediction);

  useEffect(() => {
    let current = 0;
    const target = safePrediction * 100;

    const interval = setInterval(() => {
      if (current < target) {
        current += 1;
        setProgress(current);
      } else {
        clearInterval(interval);
      }
    }, 10);

    return () => clearInterval(interval);
  }, [safePrediction]);

  useEffect(() => {
    const percentage = safePrediction;

    if (percentage >= 0.7) {
      setText("Your score is good. Keep it up!");
    } else if (percentage >= 0.5) {
      setText("Your score is alright, but it can be improved.");
    } else if (percentage >= 0.3) {
      setText("Your score is quite low, some work is needed.");
    } else if (percentage > 0) {
      setText(
        "Your score is very low, you need to work a lot to improve this."
      );
    } else {
      setText(
        "The score shouldn't be this low, please check if the info you entered is correct."
      );
    }
  }, [safePrediction]);

  return (
    <div className="min-h-screen flex flex-col gap-8 items-center justify-center">
      <div className="flex flex-col gap-2 text-center">
        <h3 className="text-xl">Your chances of admission at</h3>
        <div>
          <h1 className="text-2xl font-bold">{university}</h1>
          <h3>(according to your given data)</h3>
        </div>
      </div>

      <div className="w-1/3 flex flex-col gap-4 items-center">
        <CircularProgressbar
          maxValue={100}
          minValue={0}
          strokeWidth={12}
          value={progress}
          text={`${progress.toFixed(0)}%`}
        />
        <div className="flex items-center gap-2">
          <h2 className="text-3xl font-bold">{progress.toFixed(0)}%</h2>
          <div className="tooltip" data-tip={text}>
            <CircleAlert />
          </div>
        </div>
      </div>

      <div>
        <button
          className="btn btn-warning"
          onClick={() => window.location.reload()}
        >
          Predict Again
        </button>
      </div>
    </div>
  );
};

export default Result;
