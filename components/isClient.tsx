"use client";

import { useState, useEffect } from "react";

const useClientOnly = () => {
    const [isClient, setIsClient] = useState(false);
  
    useEffect(() => {
      setIsClient(true);
    }, []);
  
    return isClient;
  };