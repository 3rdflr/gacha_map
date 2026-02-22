export interface GachaPost {
  id: string;
  title: string;
  description: string;
  release_date: string;
  brand: string;
  country: string;
  price: number | null;
  image_url: string;
  thumbnail_url?: string;
  images: string[] | null;
  captions: string[] | null;
  series: string;
  tags: string[];
  view_count: number;
  created_at: string;
  updated_at?: string;
  created_by?: string;
}

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
