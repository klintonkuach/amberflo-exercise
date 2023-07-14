import { IMeter } from './IMeter';

// keyof IMeter is equivalent to 'id' | 'api_name' | 'display_name' | 'active' | 'used_for_billing' | 'type'.
export type SortConfig = {
  key: keyof IMeter;
  direction: 'ascending' | 'descending';
} | null;
