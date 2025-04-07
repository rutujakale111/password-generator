import React, { useState } from "react";
import { motion } from "framer-motion";

const PasswordGenerator = () => {
  const [length, setLength] = useState(12);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumber, setIncludeNumber] = useState(true);
  const [includeSymbol, setIncludeSymbol] = useState(true);
  const [password, setPassword] = useState("");

  const generatePassword = () => {
    let charset = "";
    if (includeUpper) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLower) charset += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumber) charset += "0123456789";
    if (includeSymbol) charset += "!@#$%^&*()_+{}[]<>?";

    if (charset.length === 0) {
      alert("Please select at least one character type.");
      return;
    }

    let newPassword = "";
    for (let i = 0; i < length; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(newPassword);
  };

  const copyToClipboard = () => {
    if (password) {
      navigator.clipboard.writeText(password);
      alert("Password copied!");
    }
  };

  return (
    <motion.div 
      className="generator-box"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <h1 className="heading">Password Generator</h1>
      
      <motion.div 
        className="password-display"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        {password || "Your password will appear here"}
      </motion.div>

      <div className="controls">
        <label>
          Length: <strong>{length}</strong>
          <input 
            type="range" 
            min="4" 
            max="32" 
            value={length} 
            onChange={(e) => setLength(Number(e.target.value))} 
          />
        </label>
        <label>
          <input 
            type="checkbox" 
            checked={includeUpper} 
            onChange={() => setIncludeUpper(!includeUpper)} 
          />
          Uppercase
        </label>
        <label>
          <input 
            type="checkbox" 
            checked={includeLower} 
            onChange={() => setIncludeLower(!includeLower)} 
          />
          Lowercase
        </label>
        <label>
          <input 
            type="checkbox" 
            checked={includeNumber} 
            onChange={() => setIncludeNumber(!includeNumber)} 
          />
          Numbers
        </label>
        <label>
          <input 
            type="checkbox" 
            checked={includeSymbol} 
            onChange={() => setIncludeSymbol(!includeSymbol)} 
          />
          Symbols
        </label>
      </div>

      <motion.button 
        onClick={generatePassword} 
        className="generate-btn"
        whileTap={{ scale: 0.9 }}
      >
        Generate Password
      </motion.button>

      <motion.button 
        onClick={copyToClipboard} 
        className="copy-btn"
        whileTap={{ scale: 0.9 }}
      >
        Copy to Clipboard
      </motion.button>
    </motion.div>
  );
};

export default PasswordGenerator;
