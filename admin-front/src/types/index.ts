export interface FileUpload {
  id: string;
  file: File;
  status: 'pending' | 'uploading' | 'success' | 'error';
  progress: number;
  error?: string;
}

export interface ImportResult {
  success: number;
  total: number;
  files: FileUpload[];
}

export interface UploadConfig {
  title: string;
  description: string;
  acceptedTypes: string[];
  endpoint: string;
}

export interface Product {
  id: string;
  name: string;
  prices: {
    retail: number;
    wholesale: number;
    currency: string;
    discount?: number;
  };
  images: string[];
  brand: {
    id: number;
    name: string;
    logo: string;
  };
  categories: Array<{
    id: number;
    name: string;
  }>;
  metadata: {
    isTopSales: boolean;
    isRecommended: boolean;
    rating: number;
    reviewsCount: number;
  };
  stock: {
    available: number;
    inWarehouses: Array<{
      id: number;
      location: string;
      quantity: number;
    }>;
  };
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  meta?: {
    total: number;
    page: number;
    limit: number;
  };
}

export interface LoginInput {
  email: string,
  password: string;
}

export interface RegistrationInput extends Partial<LoginInput> {
  name: string;
  phone: string;
}

export interface User {
  id: string;
  email: string;
  phone: string;
  name: string;
  isActivated: boolean;
  role: string;
  // password и activationLink не включаем - они не должны попадать на фронтенд
}

// Полная версия (если нужна для админки)
export interface UserWithSensitiveData extends User {
  password: string;
  activationLink: string;
}