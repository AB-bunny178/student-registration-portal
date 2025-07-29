import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

const getData = (key, fallback) => JSON.parse(localStorage.getItem(key)) || fallback;
const setData = (key, value) => localStorage.setItem(key, JSON.stringify(value));

export const AppProvider = ({ children }) => {
  const [courseTypes, setCourseTypes] = useState(getData("courseTypes", []));
  const [courses, setCourses] = useState(getData("courses", []));
  const [offerings, setOfferings] = useState(getData("offerings", []));
  const [registrations, setRegistrations] = useState(getData("registrations", []));

  useEffect(() => {
    setData("courseTypes", courseTypes);
    setData("courses", courses);
    setData("offerings", offerings);
    setData("registrations", registrations);
  }, [courseTypes, courses, offerings, registrations]);

  return (
    <AppContext.Provider
      value={{
        courseTypes,
        setCourseTypes,
        courses,
        setCourses,
        offerings,
        setOfferings,
        registrations,
        setRegistrations,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};