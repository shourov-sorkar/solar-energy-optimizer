import axios from "axios";
import { motion } from "framer-motion";
import { useState, type FC } from "react";
import { CgSpinner } from "react-icons/cg";
import {
  FaRocket,
  FaBatteryThreeQuarters,
  FaBolt,
  FaArrowLeft,
} from "react-icons/fa";
import { IoTimeOutline } from "react-icons/io5";

interface CalculationModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export const CalculationModal: FC<CalculationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<unknown | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [inputValues, setInputValues] = useState({
    battery_capacity: "",
    hourly_consumption: "",
    current_charge: "",
  });
  
  const getData = async () => {
    const battery_capacity = parseFloat(inputValues.battery_capacity);
    const hourly_consumption = parseFloat(inputValues.hourly_consumption);
    const current_charge = parseFloat(inputValues.current_charge);
    
    if (
      isNaN(battery_capacity) || battery_capacity === 0 ||
      isNaN(hourly_consumption) || hourly_consumption === 0 ||
      isNaN(current_charge) || current_charge === 0
    ) {
      setError("Please enter all the values");
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await axios.post("https://energeneous.xyz:8000/predict", {
        battery_capacity,
        hourly_consumption,
        current_charge,
      });
      setData(response.data);
      return response.data;
    } catch (error) {
      console.log(error, "error");
    } finally {
      setIsLoading(false);
      setError(null);
      setInputValues({
        battery_capacity: "",
        hourly_consumption: "",
        current_charge: "",
      });
    }
  };

  const handleBack = () => {
    setData(null);
  };

  const handleNumericInput = (name: string, value: string) => {
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setInputValues({
        ...inputValues,
        [name]: value
      });
    }
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60 backdrop-blur-sm w-full">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-purple-100"
      >
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-5 text-white">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <FaRocket className="text-2xl" />
              <h2 className="text-xl font-bold">Energy Optimizer</h2>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-purple-200 transition-colors p-1 rounded-full hover:bg-white/10"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {data ? (
          <div className="p-8">
            <div className="mb-8">
              <div className="flex flex-col items-center">
                <div
                  className={`flex items-center justify-center w-20 h-20 rounded-full mb-5 shadow-lg transform transition-transform hover:scale-105 ${
                    (data as { decision: string }).decision === "Charge"
                      ? "bg-gradient-to-br from-green-400 to-green-600 text-white"
                      : "bg-gradient-to-br from-amber-400 to-amber-600 text-white"
                  }`}
                >
                  {(data as { decision: string }).decision === "Charge" ? (
                    <FaBolt className="text-4xl" />
                  ) : (
                    <FaBatteryThreeQuarters className="text-4xl" />
                  )}
                </div>
                
                <div className="text-center">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                    (data as { decision: string }).decision === "Charge"
                      ? "bg-green-100 text-green-800"
                      : "bg-amber-100 text-amber-800"
                  }`}>
                    RECOMMENDATION
                  </span>
                  
                  <h3 className="text-3xl font-bold text-gray-800 mt-3 mb-4">
                    {(data as { decision: string }).decision}
                  </h3>
                  
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 text-gray-700 shadow-sm">
                    <p className="leading-relaxed">
                      {(data as { message: string }).message}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleBack}
              className="flex items-center justify-center gap-2 w-full px-5 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
            >
              <FaArrowLeft className="text-sm" /> Back to Calculator
            </button>
          </div>
        ) : (
          <div className="p-8">
            <p className="text-gray-600 mb-6">
              Enter your device parameters below to receive optimization
              recommendations.
            </p>
            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            <div className="space-y-5">
              <div className="input-group">
                <label
                  htmlFor="parameter1"
                  className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"
                >
                  <FaBatteryThreeQuarters className="text-purple-500" />
                  Battery Capacity (Wh)
                </label>
                <input
                  type="text"
                  id="parameter1"
                  placeholder="e.g. 310.0"
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  onChange={(e) => handleNumericInput("battery_capacity", e.target.value)}
                  value={inputValues.battery_capacity}
                />
              </div>

              <div className="input-group">
                <label
                  htmlFor="parameter2"
                  className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"
                >
                  <FaBolt className="text-purple-500" />
                  Hourly Consumption (W)
                </label>
                <input
                  type="text"
                  id="parameter2"
                  placeholder="e.g. 2.5"
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  onChange={(e) => handleNumericInput("hourly_consumption", e.target.value)}
                  value={inputValues.hourly_consumption}
                />
              </div>

              <div className="input-group">
                <label
                  htmlFor="parameter3"
                  className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"
                >
                  <IoTimeOutline className="text-purple-500" />
                  Current Charge (%)
                </label>
                <input
                  type="text"
                  id="parameter3"
                  placeholder="e.g. 14.0"
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  onChange={(e) => handleNumericInput("current_charge", e.target.value)}
                  value={inputValues.current_charge}
                />
              </div>
            </div>

            <div className="mt-8">
              <button
                className="w-full px-4 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 border border-transparent rounded-lg text-white font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                onClick={getData}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <CgSpinner className="text-xl animate-spin" />
                    Optimizing...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <FaRocket /> Calculate Optimal Strategy
                  </div>
                )}
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
