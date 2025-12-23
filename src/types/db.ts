export interface Shop {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  address_full: string;
  address_detail?: string | null;
  phone?: string | null;
  homepage?: string[] | null;
  categories: string[] | null;
  business_hours?: string | null;
  description?: string | null;
  is_verified: boolean;
  last_updated: string;
  ratings?: number;
  images?: string[] | null;
}
