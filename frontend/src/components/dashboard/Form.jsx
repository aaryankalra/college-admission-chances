import { useState } from "react";
import Select from "react-select";
import UniversityData from "../../data/university_data.json";
import { getRating } from "../../utils/getRating.js";
import Result from "./Result.jsx";
import axiosInstance from "../../utils/axios.js";

const Form = () => {
  const [form, setForm] = useState({
    gre: "",
    toefl: "",
    university_rating: "",
    sop: "3",
    lor: "3",
    cgpa: "",
    research: 0,
  });

  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState("");
  const [prediction, setPrediction] = useState(null);

  const options = UniversityData.map((u) => ({
    value: u.score,
    label: u.name,
  }));

  const [uni, setUni] = useState("");

  const handleUniversityChange = (o) => {
    setUni(o.label);
    setRating(getRating(o.value));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const greScore = parseInt(form.gre);
    const toeflScore = parseInt(form.toefl);
    const cgpaScore = parseFloat(form.cgpa);

    const isGREWeird = greScore < 260;
    const isTOEFLWeird = toeflScore < 40;

    if (isGREWeird || isTOEFLWeird) {
      const proceed = window.confirm(
        "The GRE or TOEFL scores you entered seem unusually low. Are you sure they are correct?"
      );
      if (!proceed) return;
    }

    const payload = {
      gre: greScore,
      toefl: toeflScore,
      sop: parseFloat(form.sop),
      lor: parseFloat(form.lor),
      cgpa: cgpaScore,
      research: parseInt(form.research),
      university_rating: rating,
    };

    try {
      setLoading(true);
      const res = await axiosInstance.post(
        "http://localhost:5000/predict",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setPrediction(res.data.chance);
    } catch (error) {
      alert("Unable to fetch results.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const customStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: "#1d232a", // Tailwind bg-gray-800
      color: "white",
      borderColor: state.isFocused ? "#4b5563" : "#374151", // gray-600/700
      boxShadow: "none",
      "&:hover": {
        borderColor: "#6b7280", // gray-500
      },
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "#1d232a", // bg-gray-800
      color: "white",
      zIndex: 50,
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? "#374151" : "#1f2937", // gray-700 : gray-800
      color: "white",
      cursor: "pointer",
    }),
    singleValue: (base) => ({
      ...base,
      color: "white",
    }),
    input: (base) => ({
      ...base,
      color: "white",
    }),
    placeholder: (base) => ({
      ...base,
      color: "#9ca3af", // gray-400
    }),
  };

  if (prediction) {
    return (
      <>
        <div>
          <Result prediction={prediction} university={uni} />
        </div>
      </>
    );
  }

  return (
    <>
      <div>
        <h1 className="text-4xl font-bold text-center">
          We Need Some Details To Get Your Chances
        </h1>
      </div>
      <div className="shadow-md px-12 py-8 rounded-lg">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <Select
              options={options}
              placeholder="Search and select university..."
              onChange={handleUniversityChange}
              isSearchable
              styles={customStyles}
              className="w-full"
              classNamePrefix="uni"
            />
          </div>

          <div className="flex gap-6">
            <div>
              <label className="floating-label">
                <span>CGPA (out of 10)</span>
                <input
                  type="number"
                  step="any"
                  placeholder="CGPA (out of 10)"
                  onChange={handleChange}
                  name="cgpa"
                  className="input input-md"
                />
              </label>
            </div>
            <div>
              <label className="floating-label">
                <span>GRE (out of 340)</span>
                <input
                  type="number"
                  placeholder="GRE (out of 340)"
                  onChange={handleChange}
                  name="gre"
                  className="input input-md"
                />
              </label>
            </div>
            <div>
              <label className="floating-label">
                <span>TOEFL (out of 120)</span>
                <input
                  type="number"
                  placeholder="TOEFL (out of 120)"
                  onChange={handleChange}
                  name="toefl"
                  className="input input-md"
                />
              </label>
            </div>
          </div>

          <div className="flex justify-between">
            <div className="w-full max-w-xs">
              <span className="text-md">Choose your LOR score</span>
              <input
                type="range"
                step={1}
                min={1}
                max={5}
                name="lor"
                value={form.lor}
                onChange={handleChange}
                className="range range-accent range-xs"
              />
              <div className="flex gap-17 px-2.5 mt-2 text-xs">
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
              </div>
            </div>
            <div className="w-full max-w-xs">
              <span className="text-md">Choose your SOP score</span>
              <input
                type="range"
                step={1}
                min={1}
                max={5}
                name="sop"
                value={form.sop}
                onChange={handleChange}
                className="range range-accent range-xs"
              />
              <div className="flex gap-17 px-2.5 mt-2 text-xs">
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
              </div>
            </div>
          </div>

          <div className="text-center">
            <label className="label">
              <input
                type="checkbox"
                className="checkbox"
                name="research"
                checked={form.research === 1}
                onChange={(e) =>
                  setForm({ ...form, research: e.target.checked ? 1 : 0 })
                }
              />
              Do you have Research Experience?
            </label>
          </div>

          <button className="btn btn-primary" disabled={loading} type="submit">
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Form;
