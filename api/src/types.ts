export interface Env {
  DATABASE_URL: string;
  JWT_SECRET: string;
  JWT_EXPIRY_DAYS: string;
}

// DB row types matching ddl.sql
export interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  passwordhash: string;
  passwordsalt: string;
  createdat: string;
  updatedat: string | null;
  deletedat: string | null;
  isactive: boolean;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface Item {
  id: number;
  ownerid: number;
  categoryid: number;
  title: string;
  description: string | null;
  dailyrate: number;
  isavailable: boolean;
  createdat: string;
  // PostGIS geography — returned as WKT or parsed depending on query
  location?: string;
  latitude?: number;
  longitude?: number;
}

export type RentalStatus =
  | "Requested"
  | "Approved"
  | "Rejected"
  | "Out for Rent"
  | "Overdue"
  | "Returned"
  | "Completed";

export interface Rental {
  id: number;
  itemid: number;
  borrowerid: number;
  startdate: string;
  enddate: string;
  status: RentalStatus;
  totalprice: number;
  createdat: string;
}

export interface Review {
  id: number;
  rentalid: number;
  reviewerid: number;
  rating: number;
  comment: string | null;
  createdat: string;
}
