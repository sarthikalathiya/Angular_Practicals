export interface Note {
  id: number;
  name: string;
  content: string;
  createdDate: Date;
  status: 'new' | 'updated' | 'default' | 'deleted';
} 