import { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import "../config/dotenvConfig";
import { findDriverByEmail } from "../models/transportModel";

const client = new OAuth2Client( process.env.GOOGLE_CLIENT_ID as string );

// Dummy user roles
const userRoles: Record<string, string> = {
  "vani.it21@bitsathy.ac.in": "admin",
  "kaviya.it21@bitsathy.ac.in": "user",
};
//mobile app sigin verification
export const verifyDriversEmail = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body; 
    console.log(email);

    if (!email) {
       res.status(400).json({ error: "Email is required" });
       return;
    }

    const isDriverExist = await findDriverByEmail(email);

    if (isDriverExist) {
      res.status(200).json({ message: "Valid driver", valid: true });
    } else {
      res.status(401).json({ error: "Not a valid driver", valid: false });
    }
  } catch (error) {
    console.error("Error verifying driver email:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//Web google signin
export const googleAuth = async (req: Request, res: Response): Promise<void> => {
  try {
    const { token } = req.body;
    if (!token) {
      res.status(400).json({ message: "Token is required" });
      return;
    }

    // Verify Google Token for both Web & Mobile
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: [
        process.env.GOOGLE_CLIENT_ID as string, 
      ],
    });

    const payload = ticket.getPayload();
    if (!payload || !payload.email || !payload.name) {
      res.status(400).json({ message: "Invalid Google token" });
      return;
    }

    const { email, name } = payload;
    const role = userRoles[email] || "guest";

    res.json({ name, email, role });
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(401).json({ message: "Invalid Token" });
  }
};
