import React from "react";
import "./products.css"; // Assuming you have a CSS file for styling

const Product = ({ image, details }) => {
  return (
    <div className="product">
      <img src={image} alt="Product" />
      <div className="popup" dangerouslySetInnerHTML={{ __html: details }} />
    </div>
  );
};

const Products = () => {
  const products = [
    {
      image: "/products/fast-single.png", // Ensure the correct path to the image
      details: `
        <b>Fast Charger - Single Port</b><br />
        CHAdeMO or CCS
        30 kW to 75 kW scalable
        IT & Technical Support
        Remote Monitoring & Updates
        Weather and dust protection
        FREE Installation Service
        Revenue Generating Screen
        1 Year Hardware Warranty
        5 Years Software Warranty
      `,
    },
    {
      image: "/products/fast-dual.png",
      details: `
        <b>Fast Charger - Dual Port</b><br />
        CHAdeMO or CCS
        3 Phase 60A Supply (60kW)
        IT & Technical Support
        Remote Monitoring & Updates
        Weather and Dust Protection
        FREE Installation Service
        Revenue Generating Screen
        1 Year Hardware Warranty
        5 Years Software Warranty
      `,
    },
    {
      image: "/products/l2-home.png",
      details: `
        <b>L2 Charger - Home / Commercial</b><br />
        J1772 – Type 1 & Type 2
        6.6kW and 3.3kW Compatibility
        IT & Technical Support (Commercial)
        Remote Monitoring & Updates
        Weather and dust protection
        FREE Installation Service
        3 Year Hardware Warranty for Wall Unit
        5 Years Software Warranty
      `,
    },
    {
      image: "/products/l2-3phase.png",
      details: `
        <b>Level 2 Charger - 3 Phase</b><br />
        Type 2 standard
        Cloud connected
        Weather and dust protection suitable for tropical & desert climates.
        Back-office reporting system
        Remote Diagnosis capability
        Remote software update capability
        Hardware access: RFID
        Mounting: Single outlet wall mounted/ pedestal
        Commercial and Home charging
        Dynamic load balancing
        OCPP 1.6 & 2.0.1 supported
        Smart APP Control
        Plug and start to charge automatic
        RFID card (commercial charger only)
        3 phase up to 22kW
      `,
    },
  ];

  return (
    <div className="product-container" id="products-section">
      {products.map((product, index) => (
        <Product key={index} image={product.image} details={product.details} />
      ))}
    </div>
  );
};

export default Products;
