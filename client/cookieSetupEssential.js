// Setting cookie -should be like this
res.cookie("token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", // true in production
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 10 * 60 * 1000, // 10 minutes in milliseconds
});

res.status(200).json({
  msg: "Token set inside cookie",
  result: token,
});

// Additional Checks You Need to Make
// Frontend Configuration

// If using axios
axios.post("/api/login", data, {
  withCredentials: true,
});

// CORS Configuration (Backend)
// javascript
app.use(
  cors({
    origin: "http://localhost:3000", // Your frontend URL
    credentials: true, // REQUIRED for cookies
  })
);
