import { motion } from "framer-motion";
function NotFound() {
    return (
        <div style={{ textAlign: "center", padding: "100px" }}>
            <h1>404</h1>
            <h2>Page Not Found</h2>
            <p>Sorry, the page you are looking for does not exist.</p>
            <motion.a
                href="/"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                style={{
                    display: "inline-block",
                    padding: "12px 20px",
                    borderRadius: "8px",
                    textDecoration: "none",
                    background: "#065084",
                    color: "#fff",
                    fontWeight: 500,
                }}
            >
                Go Back to Home
            </motion.a>
        </div>
    );
}

export default NotFound;
