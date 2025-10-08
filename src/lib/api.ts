const BREEDS_API = 'https://functions.poehali.dev/9cc3e961-d4d4-4516-a479-b5a33d73190d';
const REVIEWS_API = 'https://functions.poehali.dev/f9ce2219-957e-44da-85be-168f6de02039';

export interface Breed {
  id: number;
  name: string;
  description: string;
  origin: string;
  size: string;
  temperament: string;
  care_level: string;
  activity_level: string;
  lifespan: string;
  weight: string;
  height: string;
  avg_rating: number;
  review_count: number;
  primary_photo?: {
    photo_url: string;
    caption: string;
  };
  photos?: Array<{
    id: number;
    photo_url: string;
    caption: string;
    is_primary: boolean;
  }>;
  characteristics?: Array<{
    id: number;
    characteristic_name: string;
    rating: number;
  }>;
  reviews?: Array<{
    id: number;
    user_name: string;
    rating: number;
    review_text: string;
    created_at: string;
  }>;
}

export interface BreedsResponse {
  breeds: Breed[];
}

export async function fetchBreeds(filters?: {
  size?: string;
  activity?: string;
  care?: string;
}): Promise<BreedsResponse> {
  const params = new URLSearchParams();
  if (filters?.size && filters.size !== 'all') params.append('size', filters.size);
  if (filters?.activity && filters.activity !== 'all') params.append('activity', filters.activity);
  if (filters?.care && filters.care !== 'all') params.append('care', filters.care);

  const response = await fetch(`${BREEDS_API}?${params}`);
  if (!response.ok) throw new Error('Failed to fetch breeds');
  return response.json();
}

export async function fetchBreedById(id: number): Promise<Breed> {
  const response = await fetch(`${BREEDS_API}?id=${id}`);
  if (!response.ok) throw new Error('Failed to fetch breed details');
  return response.json();
}

export async function submitReview(data: {
  breed_id: number;
  user_name: string;
  rating: number;
  review_text: string;
}): Promise<{ success: boolean; review_id: number }> {
  const response = await fetch(REVIEWS_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to submit review');
  return response.json();
}
