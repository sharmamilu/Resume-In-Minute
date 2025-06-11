import { createContext, useState, useContext, useEffect, useRef } from "react";

const AuthContext = createContext();
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 mins

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);  // NEW: loading state
  const logoutTimerRef = useRef(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    const loginTimestamp = parseInt(localStorage.getItem("loginTimestamp"), 10);

    if (storedUser && loginTimestamp) {
      const now = Date.now();
      const elapsed = now - loginTimestamp;

      if (elapsed < SESSION_TIMEOUT) {
        setCurrentUser(storedUser);
        const remainingTime = SESSION_TIMEOUT - elapsed;
        startAutoLogoutTimer(remainingTime);
      } else {
        logout();
      }
    }
    setLoading(false);  // Finished loading user info
  }, []);

  const startAutoLogoutTimer = (duration) => {
    if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);

    logoutTimerRef.current = setTimeout(() => {
      logout();
      alert("Session expired. Please log in again.");
    }, duration);
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("registeredUsers")) || [];

    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      setCurrentUser(user);
      localStorage.setItem("currentUser", JSON.stringify(user));
      localStorage.setItem("loginTimestamp", Date.now().toString());
      startAutoLogoutTimer(SESSION_TIMEOUT);
      return true;
    }

    return false;
  };

  const registerUser = (email, password, name, contact, address) => {
    const users = JSON.parse(localStorage.getItem("registeredUsers")) || [];

    const userExists = users.some((user) => user.email === email);
    if (userExists) {
      alert("Email already exists");
      return false;
    }

    const newUser = {
      email,
      password,
      name,
      contact,
      address,
      role: "candidate",
    };

    const updatedUsers = [...users, newUser];
    localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    localStorage.setItem("loginTimestamp", Date.now().toString());
    setCurrentUser(newUser);
    startAutoLogoutTimer(SESSION_TIMEOUT);

    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
    localStorage.removeItem("loginTimestamp");
    if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, registerUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
