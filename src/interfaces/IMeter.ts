export interface IMeter {
  id?: string;
  api_name: string;
  display_name: string;
  active: boolean;
  used_for_billing: boolean;
  type: 'sum' | 'max' | 'unique_count';
  updated_time?: string;
  created_time?: string;
}