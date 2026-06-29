/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Property {
  id: string;
  name: string;
  location: string;
  price: string;
  priceNum: number;
  image: string;
  description: string;
  amenities: string[];
  features: string[];
  rating: number;
}

export interface Experience {
  id: string;
  title: string;
  description: string;
  image: string;
  actionText: string;
  actionUrl: string;
  align: 'left' | 'right';
}

export interface Review {
  id: string;
  author: string;
  avatarChar: string;
  avatarBg: string;
  stay: string;
  content: string;
  rating: number;
}

export interface GalleryItem {
  id: string;
  image: string;
  title: string;
  category: string;
}

export const PROPERTIES: Property[] = [
  {
    id: "misty-peaks",
    name: "The Misty Peaks",
    location: "Coorg, Karnataka",
    price: "₹25,000",
    priceNum: 25000,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB2bjTJ9QpO3zkHd2IDFGl0v70rlL4uS05CDPxs6LNW9oW-0KfrTSGmp7SCGg6RyGsZqeKbR09F3UqE0VGZpDbZOCZYyLHT8AfeYhFztBVho70a5a5Wepf-MYvEJNNPpFpqDnbCQzfQrcJWSGBkwyyUCcks9ekNJz0x84o_BCKoAlNEeogN2cwRLYDqMeRJYgHXTUQ4_EsBXpLMaOim7lhpO0O5FKzDyj9CIFVwtUdbGGLfQ43WwowujfFlkWiGP1vA0rVUIN1KNKcP",
    description: "Wake up to the serene views of mist-covered forest canopies. Nestled on a secluded mountain ridge in Coorg, this luxurious eco-resort features soaring ceilings, custom wood craftsmanship, a private outdoor deck, and panoramic forest-facing windows.",
    amenities: ["Luxury Spa", "Infinity Pool", "Fine Dining"],
    features: [
      "Glass-walled master bedroom looking over Coorg forest",
      "Private cantilevered deck with recessed fire pit",
      "Outdoor heated plunge pool with nature views",
      "24/7 dedicated private butler service",
      "Complimentary forest trail tours and coffee tasting session"
    ],
    rating: 5.0
  },
  {
    id: "heritage-haveli",
    name: "Heritage Haveli",
    location: "Rajasthan",
    price: "₹18,500",
    priceNum: 18500,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAUHIjjwmu2GNEeR558DrBq9fucPvWLVyPCCVzR4DWIRrRFlQgUPKD5eMJPx2NPvA_jZGXEKSpUQP2C63taV0ZVWv5bDAzeJTacpsobTfg-6uPRNWcfs8q8zINcP3aK5AfHufUb-KBsL68vSlray2rVTFwXouWNvUHTNRvNP2PhCZaMP2ny5_xJ64LdSC3hCMPmnbLxWBLiYwoc-RwI2qoa1588vgAIQpBW5Ujqk-5dx4FgUxzzjLoETGkRCMNdVYthm9s-4grqSH3J",
    description: "Transport yourself back in time to an era of royalty. Lovingly restored by master craftspeople, the Heritage Haveli showcases spectacular sandstone arches, detailed hand-carved jali screens, authentic antique brass fixtures, and plush regal lounges.",
    amenities: ["Royal Banquet", "Heritage Courtyard", "Ancient Wellness Spa"],
    features: [
      "Spectacular hand-painted frescoes and regional artwork",
      "Traditional central courtyard with a cooling marble fountain",
      "Opulent gold-leaf detailing and luxury block-print linens",
      "Private sitar performance and traditional dinner on request",
      "Therapeutic copper bathing tub with Ayurvedic botanicals"
    ],
    rating: 4.9
  },
  {
    id: "urban-oasis",
    name: "Urban Oasis",
    location: "Bangalore",
    price: "₹12,000",
    priceNum: 12000,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBlg2WKPrmvR8ks7py8UC4PSoIevfl7D4LQTyQg9UKDFXLoIqzoMtBGqW_SfvgRkLcav-HtiWlZGNzjTnSOpw24x3oPT280ZWcF-PdFfT0qpRPQF7U6bBJA2QKbKw2Ii1i60wtXADv16h5vCoseO6ax2YN9U3To2yC6_-PooFAca39VTJXYzelimJZFyH3RN6iJqKGTNKUJFhLYiHxL3xbpMOnPfCuRpu0as_WjE5U9wJnVt6vdTQRAkBvKE502CZ23rJvFMupR5brU",
    description: "An elegant city sanctuary hovering high above the skyline. The Urban Oasis is the epitome of minimalist luxury, featuring custom Italian leather furniture, warm linear accent lighting, floor-to-ceiling glass, and state-of-the-art smart room controls.",
    amenities: ["Sky Lounge", "Heated Pool", "Smart Automation"],
    features: [
      "Breathtaking 180-degree skyline views of the city",
      "Fully integrated multi-room professional sound system",
      "Ultra-modern kitchen with designer appliances",
      "Wellness corner with premium massage lounge chair",
      "Express priority check-in and private executive lounge access"
    ],
    rating: 4.8
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: "forest-dining",
    title: "Enchanting Forest Dining",
    description: "Experience culinary excellence under the stars. Our private forest dining setup offers an intimate atmosphere with soft candlelight, stunning custom centerpieces, and a five-course gourmet menu prepared live by our master chefs.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDi9uRBPpm7n1tvFH9-4Z4t_ES0OIx8MZoc0zGq0wDFAOe3Lw9IPs4CZSTYXHqxlCH5pCYYWKzRFkh7KytTYinRJtDVFVY9QRZnJ_b57lqoNVknw4Uj3hKmDre77KFPebvyBuk_gcG8os9EvfpCobBxjtZlXRRR6FLxgvPzbUJk1w7fz9924qtuVwFj9OLA8VdoFBWfXuVCUEEGwzwvOJ02UxpwU7pQQ94cIoyirIh5qVcvzDwptnNlCqQJ84AZGfbH82IPqZu2v7qG",
    actionText: "Discover Dining",
    actionUrl: "#dining",
    align: "left"
  },
  {
    id: "infinity-pools",
    title: "Sunset Infinity Pools",
    description: "Unwind as the golden sun slowly dips below the horizon. Our signature cliff-edge infinity pools offer breathtaking panoramic views of the surrounding mist-shrouded valleys, creating a seamless, floating blend between water, mountain, and sky.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC_f7Yrm6pZWydgT3h1kfkx63qlJrtbId5zQPcMXnCJ7zUXzpOZ5cW9RqmkNTz_7RT9bEojGBbKtk3ag7hqGl1_X1kvC8cVdzx2b3LlR4RoxkaKoe3qEH7nSmEP7EaIKgQC7POMJGmSwsO3HGRfoCYD_PAleWPyQZ5dWUTSjK4f6OiPsTEj5_m0Luavq_mrchAT2l28WIpFYA6nkEhe4v7HcUfMaWuoKXHn-eYZbNBr6ToxnXBr7X7fr-VZ47rnFDrKNGRaikgCDtaN",
    actionText: "View Pools",
    actionUrl: "#pools",
    align: "right"
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-1",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB2bjTJ9QpO3zkHd2IDFGl0v70rlL4uS05CDPxs6LNW9oW-0KfrTSGmp7SCGg6RyGsZqeKbR09F3UqE0VGZpDbZOCZYyLHT8AfeYhFztBVho70a5a5Wepf-MYvEJNNPpFpqDnbCQzfQrcJWSGBkwyyUCcks9ekNJz0x84o_BCKoAlNEeogN2cwRLYDqMeRJYgHXTUQ4_EsBXpLMaOim7lhpO0O5FKzDyj9CIFVwtUdbGGLfQ43WwowujfFlkWiGP1vA0rVUIN1KNKcP",
    title: "Misty Peaks Suite",
    category: "Suites"
  },
  {
    id: "gal-2",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBxmmnKgQZ60vcRVdjEpi7rNJKT3rfJcqxqWnDSvZtEbU66FSkkvUAIvbf4Oo6VWE15w1k5SqIW-d7yOa6x3siNkm2YJXIeur1-nfsaipdxLuma3ya05C58AVLfTcqrV3pDQtlz4hTSW7CiOAesFPF1EmCWqLSbv1Dm_BuzBEb7-7CZrFQnXPrD2r1f9AFdaPkBSVIe94JTWA1NN7TnVucBxcuRnC5ckU1uK_YsuI9fWFP4K-jl5p_QjKwttxLMN1omJMCwmd29TF67",
    title: "Ancient Stone Hydrotherapy Spa",
    category: "Wellness"
  },
  {
    id: "gal-3",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAUHIjjwmu2GNEeR558DrBq9fucPvWLVyPCCVzR4DWIRrRFlQgUPKD5eMJPx2NPvA_jZGXEKSpUQP2C63taV0ZVWv5bDAzeJTacpsobTfg-6uPRNWcfs8q8zINcP3aK5AfHufUb-KBsL68vSlray2rVTFwXouWNvUHTNRvNP2PhCZaMP2ny5_xJ64LdSC3hCMPmnbLxWBLiYwoc-RwI2qoa1588vgAIQpBW5Ujqk-5dx4FgUxzzjLoETGkRCMNdVYthm9s-4grqSH3J",
    title: "Heritage Haveli Grand Lounge",
    category: "Heritage"
  },
  {
    id: "gal-4",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC_f7Yrm6pZWydgT3h1kfkx63qlJrtbId5zQPcMXnCJ7zUXzpOZ5cW9RqmkNTz_7RT9bEojGBbKtk3ag7hqGl1_X1kvC8cVdzx2b3LlR4RoxkaKoe3qEH7nSmEP7EaIKgQC7POMJGmSwsO3HGRfoCYD_PAleWPyQZ5dWUTSjK4f6OiPsTEj5_m0Luavq_mrchAT2l28WIpFYA6nkEhe4v7HcUfMaWuoKXHn-eYZbNBr6ToxnXBr7X7fr-VZ47rnFDrKNGRaikgCDtaN",
    title: "Sunset Over Cliff Infinity Pool",
    category: "Nature"
  },
  {
    id: "gal-5",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBlg2WKPrmvR8ks7py8UC4PSoIevfl7D4LQTyQg9UKDFXLoIqzoMtBGqW_SfvgRkLcav-HtiWlZGNzjTnSOpw24x3oPT280ZWcF-PdFfT0qpRPQF7U6bBJA2QKbKw2Ii1i60wtXADv16h5vCoseO6ax2YN9U3To2yC6_-PooFAca39VTJXYzelimJZFyH3RN6iJqKGTNKUJFhLYiHxL3xbpMOnPfCuRpu0as_WjE5U9wJnVt6vdTQRAkBvKE502CZ23rJvFMupR5brU",
    title: "Urban Oasis Minimalist Suite",
    category: "Suites"
  },
  {
    id: "gal-6",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDi9uRBPpm7n1tvFH9-4Z4t_ES0OIx8MZoc0zGq0wDFAOe3Lw9IPs4CZSTYXHqxlCH5pCYYWKzRFkh7KytTYinRJtDVFVY9QRZnJ_b57lqoNVknw4Uj3hKmDre77KFPebvyBuk_gcG8os9EvfpCobBxjtZlXRRR6FLxgvPzbUJk1w7fz9924qtuVwFj9OLA8VdoFBWfXuVCUEEGwzwvOJ02UxpwU7pQQ94cIoyirIh5qVcvzDwptnNlCqQJ84AZGfbH82IPqZu2v7qG",
    title: "Candlelit Deep Forest Banquet",
    category: "Dining"
  }
];

export const REVIEWS: Review[] = [
  {
    id: "rev-1",
    author: "Sarah Mitchell",
    avatarChar: "S",
    avatarBg: "bg-primary-fixed text-on-primary-fixed",
    stay: "Stayed at Misty Peaks",
    content: "An absolutely magical experience. The forest views from the bedroom were breathtaking, and the spa treatment was world-class. Truly a 5-star experience.",
    rating: 5
  },
  {
    id: "rev-2",
    author: "Rahul Sharma",
    avatarChar: "R",
    avatarBg: "bg-tertiary-fixed text-on-tertiary-fixed",
    stay: "Stayed at Heritage Haveli",
    content: "The architecture and attention to detail at the Haveli transported us back in time. The hospitality was exceptional, making us feel like royalty throughout our stay.",
    rating: 5
  },
  {
    id: "rev-3",
    author: "Emma Davis",
    avatarChar: "E",
    avatarBg: "bg-secondary-fixed text-on-secondary-fixed",
    stay: "Stayed at Urban Oasis",
    content: "The perfect city getaway. Minimalist luxury at its finest with a stunning view of the skyline. The service was impeccable from check-in to check-out.",
    rating: 5
  }
];
