import { useState } from "react";
import { Combobox } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import cityTimezones from "city-timezones";
import { SunIcon, CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

export default function TimezoneChecker() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [timeDifference, setTimeDifference] = useState(null);
  const [isEligible, setIsEligible] = useState(false);
  const [query, setQuery] = useState("");
  const Navigate = useNavigate();
  // Extract unique countries and their timezones from city-timezones
  const countryTimezones = {};
  cityTimezones.cityMapping.forEach((city) => {
    if (!countryTimezones[city.country]) {
      countryTimezones[city.country] = new Set();
    }
    countryTimezones[city.country].add(city.timezone);
  });

  // Convert the countryTimezones object into an array for rendering
  const countries = Object.keys(countryTimezones).sort();

  // Filter countries based on search query
  const filteredCountries =
    query === ""
      ? countries
      : countries.filter((country) =>
          country.toLowerCase().includes(query.toLowerCase())
        );

  // Function to calculate time difference
  const calculateTimeDifference = (country) => {
    const rigaTimezone = "Europe/Riga";
    const countryTimezonesList = Array.from(countryTimezones[country]);

    // Use the first timezone if multiple exist
    const countryTimezone = countryTimezonesList[0]?.replace(" ", "_");

    if (!countryTimezone) {
      alert("Timezone not found for the selected country.");
      return;
    }

    const rigaTime = new Date().toLocaleString("en-US", { timeZone: rigaTimezone });
    const countryTime = new Date().toLocaleString("en-US", { timeZone: countryTimezone });

    const rigaDate = new Date(rigaTime);
    const countryDate = new Date(countryTime);

    const diffInHours = Math.abs(
      (rigaDate.getTime() - countryDate.getTime()) / (1000 * 60 * 60)
    );

    setTimeDifference(diffInHours.toFixed(2));
    setIsEligible(diffInHours < 6);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-400 via-blue-300 to-sky-100 flex items-center justify-center p-4">
      {/* Header with Scandiweb Logo and Button */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-4 right-4 flex items-center gap-4 backdrop-blur-sm bg-white/30 rounded-xl p-3 shadow-lg"
      >
        <div className="cursor-pointer flex items-center gap-2">
          <motion.div whileHover={{ rotate: 20 }}>
            <SunIcon className="cursor-pointer w-8 h-8 text-sky-700" />
          </motion.div>
          <h1  className="cursor-pointer text-xl font-bold text-sky-900">Scandiweb Ready</h1>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={()=>Navigate('/')}
          className="cursor-pointer px-6 py-2 bg-gradient-to-r from-sky-600 to-blue-500 text-white rounded-xl hover:shadow-lg transition-all font-semibold"
        >
          Ready for Scandiweb
        </motion.button>
      </motion.header>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/40 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-lg border border-white/20 relative"
      >
        {/* Decorative Elements */}
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-sky-300/30 rounded-full blur-xl" />
        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-300/30 rounded-full blur-xl" />

        {/* Content */}
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-sky-900 mb-2">Timezone Checker</h1>
            <p className="text-sky-800/90 leading-relaxed">
              We can proceed with recruitment if your timezone is within 6 hours of Riga, Latvia.
              Junior, mid, and senior positions require full-time availability.
            </p>
          </div>

          {/* Searchable Dropdown */}
          <Combobox value={selectedCountry} onChange={setSelectedCountry}>
            <div className="relative">
              <Combobox.Input
                className="w-full px-6 py-3 bg-white/80 border-2 border-sky-100 rounded-xl focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-200 placeholder-sky-600/80 transition-all"
                placeholder="Search country..."
                onChange={(e) => setQuery(e.target.value)}
              />
              <Combobox.Options className="absolute z-10 mt-2 w-full max-h-60 overflow-auto rounded-xl bg-white/90 backdrop-blur-sm shadow-lg ring-1 ring-black/5 focus:outline-none">
                <AnimatePresence>
                  {filteredCountries.map((country) => (
                    <motion.div
                      key={country}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      <Combobox.Option
                        value={country}
                        className={({ active }) =>
                          `px-6 py-3 cursor-pointer transition-colors ${
                            active ? 'bg-sky-50 text-sky-900' : 'text-sky-800'
                          }`
                        }
                      >
                        {country}
                      </Combobox.Option>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </Combobox.Options>
            </div>
          </Combobox>

          {/* Results Section */}
          {selectedCountry && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="bg-white/80 p-6 rounded-xl border border-sky-100">
                <h2 className="text-xl font-semibold text-sky-900 mb-4">
                  Selected Country: <span className="font-normal">{selectedCountry}</span>
                </h2>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => calculateTimeDifference(selectedCountry)}
                  className="w-full py-3 bg-gradient-to-r from-sky-500 to-blue-400 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
                >
                  Calculate Time Difference
                </motion.button>

                {timeDifference !== null && (
                  <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className="mt-6 space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sky-800">Time Difference:</span>
                      <span className="font-semibold text-sky-900">
                        {timeDifference} hours
                      </span>
                    </div>
                    <div className={`flex items-center gap-2 p-4 rounded-lg ${
                      isEligible ? 'bg-green-100/80' : 'bg-red-100/80'
                    }`}>
                      {isEligible ? (
                        <CheckCircleIcon className="w-6 h-6 text-green-600" />
                      ) : (
                        <XCircleIcon className="w-6 h-6 text-red-600" />
                      )}
                      <span className={`font-bold ${isEligible ? 'text-green-700' : 'text-red-700'}`}>
                        {isEligible ? 'Eligible for Recruitment' : 'Not Eligible'}
                      </span>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}