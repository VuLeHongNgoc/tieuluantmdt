// Layout Components Types
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  slug?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  label: string;
}

export interface NavigationLink {
  href: string;
  label: string;
  isActive?: boolean;
}

export interface HeaderProps {
  cartItems?: CartItem[];
  cartTotal?: number;
  isAuthenticated?: boolean;
  user?: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
}

export interface FooterProps {
  socialLinks?: SocialLink[];
  showBackToTop?: boolean;
  navigationLinks?: NavigationLink[];
  companyInfo?: {
    name: string;
    description: string;
    email: string;
    phone: string;
    address: string;
  };
}

export interface LayoutProps {
  children: React.ReactNode;
  headerProps?: HeaderProps;
  footerProps?: FooterProps;
  className?: string;
}

// UI Component Types
export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export interface SearchBoxProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (query: string) => void;
  placeholder?: string;
}

export interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  navigationLinks: NavigationLink[];
  isAuthenticated?: boolean;
}
