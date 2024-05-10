export interface ISetting {
  title: string;
  fields: {
    name: string;
    isAvatar?: boolean;
    isPassword?: boolean;
    value?: string;
    editable: boolean;
    deletable: boolean;
    deleteControl?: 'small' | 'big';
    description?: string;
    values?: { value: 'en' | 'ru'; label: string }[];
  }[];
}
